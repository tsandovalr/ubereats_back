import { Document, Model } from "mongoose";
export interface IOrder {
  isPaid: Boolean;
  paidAt: Date;
  paymentResult:any,
  isDelivered: Boolean,
  deliveredAt: Date
}
export interface IOrderDocument extends IOrder, Document {}
export interface IOrderModel extends Model<IOrderDocument> {}