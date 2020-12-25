import mongoose from 'mongoose';

// describe creating new order
export interface INewOrder {
  status: string;
  expiresAt: Date;
  userId: string;
  ticket: ITicketDoc;
}

// describes properties on order document (getorder)
export interface IOrderDoc extends mongoose.Document {
  status: string;
  expiresAt: Date;
  userId: string;
  ticket: ITicketDoc;
  // createdAt: string;
  // updatedAt: string;
}

// describes properties on Order model to make typescript able to validate our doc to be created
export interface IOrderModelProps extends mongoose.Model<IOrderDoc> {
  build(user: INewOrder): IOrderDoc;
}