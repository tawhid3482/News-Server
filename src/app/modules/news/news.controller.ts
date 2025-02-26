import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { newsService } from './news.service'
import httpStatus from 'http-status'

const createNews = catchAsync(async (req, res) => {
  console.log(req.file)
  console.log(req.body)
  const result = await newsService.createNewsIntoDB(req.file, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'News Post Successfully',
    data: result,
  })
})

export const newsController = {
  createNews,
}
