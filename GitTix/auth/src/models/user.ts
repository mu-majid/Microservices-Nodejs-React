import mongoose from 'mongoose';
import { INewUser, IUserDoc, IUserModelProps } from './interfaces';
import { Password } from '../services/password';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    versionKey: false,
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
    }
  }
});

userSchema.pre('save', async function (done) {
  // only hash the passwrd if it was modified
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done(undefined);
});

userSchema.statics.build = (user: INewUser) => {
  return new User(user);
};

const User = mongoose.model<IUserDoc, IUserModelProps>('User', userSchema);

export { User };