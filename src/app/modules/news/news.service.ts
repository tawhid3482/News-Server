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
 const result = await News.find({isDeleted:false}).populate('author')
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
  payload: Partial<TNews>,
) => {
  const isNewsExists = await News.findById(id)
  if (!isNewsExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'News not found')
  }
  if (isNewsExists.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'News is already deleted')
  }

  // Keep existing image if no new file is uploaded
  let updatedFields: Partial<TNews> = { ...payload }

  if (file) {
    const imageName = `${payload.content || isNewsExists.content}${payload.category || isNewsExists.category}`
    const path = file.path
    const photo = await sendImageToCloudinary(imageName, path)
    console.log(photo)
    updatedFields.image = photo // Update image only if a new file is uploaded
  }

  // Update only provided fields
  const result = await News.findByIdAndUpdate(id, updatedFields, { new: true })
  return result
}



export const newsService = {
  createNewsIntoDB,
  getNewsFromDb,
  getSingleNewsFromDb,
  updateNewsIntoDB,
  deleteNewsFromDb,
}
