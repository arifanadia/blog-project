import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlog = async (payload: TBlog) => {
  const result = (await Blog.create(payload)).populate('author', 'name email');
  return result;
};


const updateBlog = async (id: string, payload: Partial<TBlog>) => {
  const result = await Blog.findByIdAndUpdate(id, payload).populate(
    'author',
    'name email',
  );
  return result;
};
const deleteBlog = async (id: string, userId: string) => {
  const result = await Blog.findOneAndDelete({
    _id: id,
    author: userId,
  });

  return result;
};

const getAllBlog = async () => {

}

export const BlogServices = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlog
};
