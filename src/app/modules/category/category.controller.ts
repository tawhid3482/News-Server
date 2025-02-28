import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { categoryService } from './category.service'
import sendResponse from '../../utils/sendResponse'


const createCategory = catchAsync(async (req, res) => {
    const result = await categoryService.createCategoryIntoDB(req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category Post Successfully',
      data: result,
    })
  })
  
  const getAllCategory = catchAsync(async (req, res) => {
    const result = await categoryService.getAllCategoryFromDB()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category retrieved Successfully',
      data: result,
    })
  })
  export const categoryController ={
    createCategory,
    getAllCategory
  }