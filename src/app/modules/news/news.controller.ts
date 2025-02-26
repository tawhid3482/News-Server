import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { newsService } from './news.service'
import httpStatus from 'http-status'

const createNews = catchAsync(async (req, res) => {
  const result = await newsService.createNewsIntoDB(req.file, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'News Post Successfully',
    data: result,
  })
})

const getNews = catchAsync(async (req, res) => {
  const result = await newsService.getNewsFromDb()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'News retrieved Successfully',
    data: result,
  })
})
const getSingleNews = catchAsync(async (req, res) => {
  const { id } = req.params
  console.log(id)
  const result = await newsService.getSingleNewsFromDb(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'News retrieved Successfully',
    data: result,
  })
})

const updateNews = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await newsService.updateNewsIntoDB(id, req.file, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'News updated Successfully',
    data: result,
  })
})

const deleteNews = catchAsync(async (req, res) => {
  const { id } = req.params
  console.log(id)
  const result = await newsService.deleteNewsFromDb(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'News deleted Successfully',
    data: result,
  })
})

export const newsController = {
  createNews,
  getNews,
  getSingleNews,
  updateNews,
  deleteNews
}


