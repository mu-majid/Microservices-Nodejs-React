import mongoose from 'mongoose';

// describe creating new user
export interface INewUser {
  email: string;
  password: string;
}

// describes properties on user document (getUser)
export interface IUserDoc extends mongoose.Document {
  email: string;
  password: string;
  // createdAt: string;
  // updatedAt: string;
}

// describes properties on User model
export interface IUserModelProps extends mongoose.Model<IUserDoc> {
  build(user: INewUser): IUserDoc;
}