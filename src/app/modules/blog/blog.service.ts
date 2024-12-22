import QueryBuilder from '../../builders/queryBuilder';
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

const getAllBlog = async (query: Record<string, unknown>) => {
    // Fallback to defaults if no query parameters provided
    const searchableFields = ['title', 'content'];
    const blogQuery = new QueryBuilder(Blog.find(), query)
      .search(searchableFields)
      .filter()
      .sort();
  
    // Execute the query and return the result
    try {
      const result = await blogQuery.modelQuery;
      console.log('Executing Query:', blogQuery.modelQuery.getQuery());
      return result;
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error('An error occurred while fetching the blogs.');
    }
    

  };
  
  

export const BlogServices = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlog,
};
