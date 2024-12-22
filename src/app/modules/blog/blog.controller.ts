import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
import { Blog } from './blog.model';

const createBlog = catchAsync(async (req, res) => {
  const { title, content } = req.body;
  const blogData = {
    title,
    content,
    author: req.user?.id,
    isPublished: true,
  };
  console.log(blogData);
  const blog = await BlogServices.createBlog(blogData);

  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: StatusCodes.CREATED,
    data: blog,
  });
});
const updateBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const blog = await BlogServices.updateBlog(id, body);

  sendResponse(res, {
    success: true,
    message: 'Blog Updated successfully',
    statusCode: StatusCodes.OK,
    data: blog,
  });
});
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;

  const result = await BlogServices.deleteBlog(id,userId);

  sendResponse(res, {
    success: true,
    message: 'Blog Deleted successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getAllBlog = catchAsync(async(req,res) => {
    const result  =
    sendResponse(res, {
        success: true,
        message: 'Blog Deleted successfully',
        statusCode: StatusCodes.OK,
        data: result,
      });
})

export const BlogControllers = {
  createBlog,
  updateBlog,
  deleteBlog,
};