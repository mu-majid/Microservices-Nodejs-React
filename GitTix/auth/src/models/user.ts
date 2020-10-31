import mongoose from 'mongoose';

// describe creating new user
interface INewUser {
  email: string;
  password: string;
}

// describes properties on user document (getUser)
interface IUserDoc extends mongoose.Document {
  email: string;
  password: string;
  // createdAt: string;
  // updatedAt: string;
}

// describes properties on User model
interface IUserModelProps extends mongoose.Model<IUserDoc> {
  build(user: INewUser): IUserDoc;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.statics.build = (user: INewUser) => {
  return new User(user);
};

const User = mongoose.model<IUserDoc, IUserModelProps>('User', userSchema);

export { User };