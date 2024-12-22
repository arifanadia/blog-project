import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidations.userValidationSchema),
  UserControllers.registerUser,
);

export const UserRoutes = router;
