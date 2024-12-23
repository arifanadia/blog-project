import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from '../user/user.validation';
import { AuthValidations } from './auth.validation';


const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidations.userValidationSchema),
  AuthControllers.register,
);
router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.login,
);

export const AuthRoutes = router;
