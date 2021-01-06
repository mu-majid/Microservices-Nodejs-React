import mongoose from 'mongoose';
import { OrderStatus } from '@mmkgittix/common';
 
// describe creating new order
export interface INewOrder {
  id: string;
  version: number;
  userId: string;
  price: number;
  status: OrderStatus;
}

// describes properties on order document (getorder)
export interface IOrderDoc extends mongoose.Document {
  version: number;
  userId: string;
  price: number;
  status: OrderStatus;
  // createdAt: string;
  // updatedAt: string;
}

// describes properties on Order model to make typescript able to validate our doc to be created
export interface IOrderModelProps extends mongoose.Model<IOrderDoc> {
  build(order: INewOrder): IOrderDoc;
  findByEvent(event: {id: string, version: number}): Promise<IOrderDoc | null>;
}

export interface PaymentAttrs {
  orderId: string;
  stripeId: string;
}

export interface PaymentDoc extends mongoose.Document {
  orderId: string;
  stripeId: string;
}

export interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc;
}
