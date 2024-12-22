import { z } from "zod";

const blogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: "Title is required" })  
      .min(1, "Title must be at least 1 character long"), 
    content: z
      .string({ required_error: "Content is required" })  
      .min(1, "Content must be at least 1 character long"), 
  }),
});

export const blogValidations = {
  blogValidationSchema,
};
