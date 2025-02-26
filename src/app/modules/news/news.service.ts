import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary'
import { TNews } from './news.interface'
import { News } from './news.model'

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

export const newsService = {
  createNewsIntoDB,
}
