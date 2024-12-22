import mongoose, { Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>(
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      isPublished: { type: Boolean, default: true },
    },
    {
      timestamps: true, // Automatically adds createdAt and updatedAt
    }
  );
  
 export const Blog = mongoose.model<TBlog>('Blog', blogSchema)