// ✅ Opinion.service.ts (Mongoose version)
import { Request } from "express";
import { Types } from "mongoose";
import { Opinion } from "./opinion.model"; // your Mongoose model
import { IPaginationOptions } from "../../interface/enum";
import AppError from "../../error/AppError";
import { IGenericResponse } from "../../interface/common";
import { paginationHelpers } from "../../utils/paginationHelper";

const createOpinionIntoDB = async (req: Request, userId: string) => {
  const { title, slug, content, categoryId, tags = [] } = req.body;

  const parsedTags =
    typeof tags === "string"
      ? tags.split(",").map((tag: string) => tag.trim())
      : Array.isArray(tags)
      ? tags
      : [];

  const opinion = await Opinion.create({
    title,
    slug,
    content,
    author: new Types.ObjectId(userId),
    category: new Types.ObjectId(categoryId),
    tags: parsedTags.map((t) => new Types.ObjectId(t)), // assume tag ids are sent
  });

  return opinion.populate([
    { path: "author", select: "name email profilePhoto" },
    { path: "category" },
    { path: "tags" },
  ]);
};

const getAllOpinionFromDB = async (
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<any[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, fromDate, toDate, tags, ...filterData } = filters;

  const query: any = { isPublished: true };

  // search term
  if (searchTerm) {
    query.$or = [
      { title: { $regex: searchTerm, $options: "i" } },
      { slug: { $regex: searchTerm, $options: "i" } },
      { content: { $regex: searchTerm, $options: "i" } },
    ];
  }

  // other filters
  Object.entries(filterData).forEach(([key, value]) => {
    if (value !== undefined) {
      query[key] = value;
    }
  });

  // date range
  if (fromDate || toDate) {
    query.createdAt = {};
    if (fromDate) query.createdAt.$gte = new Date(fromDate);
    if (toDate) query.createdAt.$lte = new Date(toDate);
  }

  // tags filter
  if (tags && Array.isArray(tags)) {
    query.tags = { $in: tags.map((t) => new Types.ObjectId(t)) };
  }

  const result = await Opinion.find(query)
    .skip(skip)
    .limit(limit)
    .populate("author", "name email profilePhoto")
    .populate("category")
    .populate("tags");

  const total = await Opinion.countDocuments(query);

  return {
    meta: { total, page, limit },
    data: result,
  };
};

const getSingleOpinionFromDB = async (slug: string) => {
  return Opinion.findOne({ slug, isPublished: true }).populate([
    { path: "author", select: "name email profilePhoto" },
    { path: "category" },
    { path: "tags" },
  ]);
};

const getAllOpinionForSuperUserFromDB = async () => {
  return Opinion.find().populate([
    { path: "author", select: "name email profilePhoto" },
    { path: "category" },
    { path: "tags" },
  ]);
};

const getAllMyOpinionsFromDb = async (
  filters: any,
  options: IPaginationOptions,
  userId: string
): Promise<IGenericResponse<any[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, fromDate, toDate, tags, ...filterData } = filters;

  const query: any = { author: new Types.ObjectId(userId) };

  if (searchTerm) {
    query.$or = [
      { title: { $regex: searchTerm, $options: "i" } },
      { slug: { $regex: searchTerm, $options: "i" } },
      { content: { $regex: searchTerm, $options: "i" } },
    ];
  }

  Object.entries(filterData).forEach(([key, value]) => {
    if (value !== undefined) query[key] = value;
  });

  if (fromDate || toDate) {
    query.createdAt = {};
    if (fromDate) query.createdAt.$gte = new Date(fromDate);
    if (toDate) query.createdAt.$lte = new Date(toDate);
  }

  if (tags && Array.isArray(tags)) {
    query.tags = { $in: tags.map((t) => new Types.ObjectId(t)) };
  }

  const result = await Opinion.find(query)
    .skip(skip)
    .limit(limit)
    .populate("author", "name email profilePhoto")
    .populate("category")
    .populate("tags");

  const total = await Opinion.countDocuments(query);

  return {
    meta: { total, page, limit },
    data: result,
  };
};

const getSingleMyOpinionFromDb = async (id: string) => {
  return Opinion.findById(id).populate([
    { path: "author", select: "name email profilePhoto" },
    { path: "category" },
    { path: "tags" },
  ]);
};

const updateOpinionIntoDB = async (req: Request, id: string, userId: string) => {
  const { title, slug, content, categoryId, tags = [] } = req.body;

  const parsedTags =
    typeof tags === "string"
      ? tags.split(",").map((tag: string) => new Types.ObjectId(tag))
      : Array.isArray(tags)
      ? tags.map((t: string) => new Types.ObjectId(t))
      : [];

  const updated = await Opinion.findOneAndUpdate(
    { _id: id, author: userId },
    {
      title,
      slug,
      content,
      category: new Types.ObjectId(categoryId),
      tags: parsedTags,
    },
    { new: true }
  ).populate(["author", "category", "tags"]);

  if (!updated) throw new AppError(404, "Opinion not found or not authorized");

  return updated;
};

const updateOpinionStatusIntoDB = async (req: Request, userId: string, id: string) => {
  const opinion = await Opinion.findById(id);
  if (!opinion) throw new AppError(404, "Opinion not found");

  opinion.isPublished = !opinion.isPublished;
  await opinion.save();
  return opinion;
};

const deleteOpinionFromDB = async (id: string) => {
  const deleted = await Opinion.findByIdAndDelete(id);
  if (!deleted) throw new AppError(404, "Opinion not found");
  return deleted;
};

export const OpinionService = {
  createOpinionIntoDB,
  getAllOpinionFromDB,
  getSingleOpinionFromDB,
  updateOpinionIntoDB,
  updateOpinionStatusIntoDB,
  deleteOpinionFromDB,
  getAllMyOpinionsFromDb,
  getSingleMyOpinionFromDb,
  getAllOpinionForSuperUserFromDB,
};
