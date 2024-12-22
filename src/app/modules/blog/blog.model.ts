import mongoose, { Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required"], 
    },
    content: {
      type: String,
      required: [true, "Content is required"], 
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"], 
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

export const Blog = mongoose.model<TBlog>("Blog", blogSchema);
