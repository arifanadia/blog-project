import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: 'Role must be either "admin" or "user".',
      },
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false, // Default value
    },
  },
  {
    timestamps: true,
  },
);


// Pre-save middleware for hashing the password
userSchema.pre('save', async function (next) {
  const user = this;


    // Hash the password
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );
    next();
  } 
);

// set " " after saving password
userSchema.post('save', function (doc, next) {
  doc.password = ' ';
  next();
});
export const User = model<TUser>('User', userSchema);