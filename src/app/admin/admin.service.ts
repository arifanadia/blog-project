import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppError';
import { User } from '../modules/user/user.model';
import { Blog } from '../modules/blog/blog.model';

const blockedUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true } 
  );

  return updatedUser;
};
const deleteBlogs = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const AdminServices = {
  blockedUser,
  deleteBlogs,
};
