import express from 'express';
import { BlogControllers } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/',auth(USER_ROLE.user), BlogControllers.createBlog);
router.patch('/:id',auth(USER_ROLE.user), BlogControllers.updateBlog);
router.delete('/:id',auth(USER_ROLE.user), BlogControllers.deleteBlog);

export const BlogRoutes = router;
