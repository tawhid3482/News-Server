import { FilterQuery } from 'mongoose'
import AppError from '../../error/AppError'
import { IPaginationOptions, IPostFilterRequest } from '../../interface/enum'
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary'
import { TNews } from './news.interface'
import { News } from './news.model'
import httpStatus from 'http-status'

const createNewsIntoDB = async ( payload: TNews) => {
  const newsData: Partial<TNews> = {
    ...payload,
    author: payload.author,
  }
  const result = await News.create(newsData)
  return result
}

const getNewsFromDb = async (
  filters: IPostFilterRequest = {},
  options: IPaginationOptions = {}
) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = options || {};

  const skip = (page - 1) * limit;

  const { searchTerm, fromDate, toDate, tags, ...filterData } = filters || {};

  const andConditions: FilterQuery<any>[] = [];

  // 🔎 Search
  if (searchTerm) {
    andConditions.push({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { slug: { $regex: searchTerm, $options: "i" } },
        { summary: { $regex: searchTerm, $options: "i" } },
        { "category.slug": { $regex: searchTerm, $options: "i" } },
        { tags: { $in: [searchTerm] } },
      ],
    });
  }

  // 🎯 Filter by fields
  Object.keys(filterData).forEach((key) => {
    const value = (filterData as any)[key];
    if (!value) return;

    if (key === "title" || key === "slug") {
      andConditions.push({ [key]: { $regex: value, $options: "i" } });
    }

    if (key === "category") {
      andConditions.push({ "category.name": value });
    }

    if (key === "isPublished") {
      andConditions.push({ isPublished: value === "true" });
    }

    if (key === "categoryId") {
      andConditions.push({ category: value });
    }

    if (key === "authorId") {
      andConditions.push({ author: value });
    }

    if (key === "status") {
      andConditions.push({ status: value });
    }
  });

  // 📅 Date Range
  if (fromDate || toDate) {
    andConditions.push({
      createdAt: {
        ...(fromDate && { $gte: new Date(fromDate) }),
        ...(toDate && { $lte: new Date(toDate) }),
      },
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  // 🔥 Query + Populate
  const result = await News.find({
    ...whereConditions,
    isDeleted: false,
    isPublished: true,
    status: "PUBLISHED",
  })
    .populate("category")
    .populate("author")
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 });

  const total = await News.countDocuments({
    ...whereConditions,
    isDeleted: false,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};


const getSingleNewsFromDb = async (id: string) => {
  const isNewsExists = await News.findById(id)
  if (!isNewsExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'News not found!')
  }
  if (isNewsExists.isDeleted === true) {
    throw new AppError(httpStatus.BAD_REQUEST, 'News is already deleted!')
  }
  const result = await News.findById(id).populate('author')
  return result
}

const deleteNewsFromDb = async (id: string) => {
  const isNewsExists = await News.findById(id)
  if (!isNewsExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'News not found')
  }
  const result = await News.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

const updateNewsIntoDB = async (
  id: string,
  file: any,
  payload: Partial<TNews>
) => {
  const isNewsExists = await News.findById(id)
  if (!isNewsExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'News not found')
  }

  if (isNewsExists.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'News is already deleted')
  }

  // Prepare the updated data (make sure to merge existing data with payload)
  const updatedData: Partial<TNews> = {
    ...isNewsExists.toObject(), // Convert the document to a plain object
    ...payload,  // Merge the provided payload
  }

  // If an image file is provided, upload it to Cloudinary and get the URL
  if (file) {
    const imageName = `${payload.tags || payload.category}`
    const path = file.path
    const photo = await sendImageToCloudinary(imageName, path)

    updatedData.coverImage = photo // Add image URL to the updated data
  }
  const updatedNews = await News.findByIdAndUpdate(id, updatedData, {
    new: true,  // Return the updated document
    runValidators: true,  // Run validation on update
  })

  if (!updatedNews) {
    throw new Error('News update failed')
  }

  return updatedNews
}

export const newsService = {
  createNewsIntoDB,
  getNewsFromDb,
  getSingleNewsFromDb,
  updateNewsIntoDB,
  deleteNewsFromDb,
}
