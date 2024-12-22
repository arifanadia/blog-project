import express from 'express';
import { AdminControllers } from './admin.controller';
import auth from '../middlewares/auth';
import { USER_ROLE } from '../modules/user/user.constant';

const router = express.Router();

// Add the leading slash to the route path
router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  AdminControllers.blockedUser,
);
router.delete(
  '/blogs/:id',
  auth(USER_ROLE.admin),
  AdminControllers.deleteBlogs,
);

export const AdminRoutes = router;
