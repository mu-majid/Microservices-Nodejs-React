import mongoose from 'mongoose';
import { INewOrder, IOrderDoc, IOrderModelProps } from './interfaces';
import { OrderStatus } from '@mmkgittix/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

const orderSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: Object.values(OrderStatus)
  },
  price: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    versionKey: false,
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.findByEvent = (data: { id: string, version: number}) => {
  return Order.findOne({
    _id: data.id,
    version: data.version - 1
  });
}

orderSchema.statics.build = (order: INewOrder) => {
  // we have to spread attrs and not just call new Order(order), to ensure _id property is the same as order.id from orders service
  return new Order({
    _id: order.id,
    version: order.version,
    status: order.status,
    price: order.price,
    userId: order.userId
  });
};

const Order = mongoose.model<IOrderDoc, IOrderModelProps>('Order', orderSchema);

export { Order };