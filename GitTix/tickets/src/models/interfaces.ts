import mongoose from 'mongoose';

// describe creating new user
export interface INewTicket {
  title: string;
  price: number;
  userId: string
}

// describes properties on user document (getUser)
export interface ITicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string
  // createdAt: string;
  // updatedAt: string;
}

// describes properties on User model
export interface ITicketModelProps extends mongoose.Model<ITicketDoc> {
  build(user: INewTicket): ITicketDoc;
}