import express from 'express';
import { BlogControllers } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { blogValidations } from './blog.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(blogValidations.blogValidationSchema),
  BlogControllers.createBlog,
);
router.patch('/:id', auth(USER_ROLE.user), BlogControllers.updateBlog);
router.delete('/:id', auth(USER_ROLE.user), BlogControllers.deleteBlog);
router.get('/', BlogControllers.getAllBlog);

export const BlogRoutes = router;
