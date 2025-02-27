import AppError from '../../error/AppError'
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary'
import { TNews } from './news.interface'
import { News } from './news.model'
import httpStatus from 'http-status'

const createNewsIntoDB = async (file: any, payload: TNews) => {
  const imageName = `${payload.content}${payload.category}`
  const path = file?.path
  const photo = await sendImageToCloudinary(imageName, path)
  const newsData: Partial<TNews> = {
    ...payload,
    author: payload.author,
    image: photo,
  }
  const result = await News.create(newsData)
  return result
}

const getNewsFromDb = async () => {
  const result = await News.find({ isDeleted: false }).populate('author')
  return result
}

const getSingleNewsFromDb = async (id: string) => {
  const isNewsExists = await News.findById(id)
  if (isNewsExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'News is already deleted')
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

    updatedData.image = photo // Add image URL to the updated data
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
