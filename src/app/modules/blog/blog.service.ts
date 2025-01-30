import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builders/queryBuilder';
import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlog = async (payload: TBlog) => {
  const blog = await Blog.create(payload);
  const result = await Blog.findById(blog._id).populate('author', 'name email');
  return result;
};

const updateBlog = async (
  id: string,
  payload: Partial<TBlog>,
  userId: string,
) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  if (blog.author.toString() !== userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to update this blog',
    );
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('author', 'name email');
  return result;
};
const deleteBlog = async (id: string, userId: string) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  if (blog.author.toString() !== userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to delete this blog',
    );
  }

  const result = await Blog.findOneAndDelete({
    _id: id,
    author: userId,
  });

  return result;
};

const getAllBlog = async (query: Record<string, unknown>) => {
  // Fallback to defaults if no query parameters provided
  const searchableFields = ['title', 'content'];

  const blogQuery = new QueryBuilder(Blog.find(), query)
    .search(searchableFields)
    .filter()
    .sort();

  const result = await blogQuery.modelQuery;
  // Handle case when no results are found
  if (result.length === 0) {
    if (query.filter) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        'No blogs found for the specified author.',
      );
    }
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'No blogs found matching the search criteria.',
    );
  }
  return result;
};

export const BlogServices = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlog,
};
