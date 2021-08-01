import { Document, Model } from "mongoose";
export interface IRestaurant {
  address: any;
  location: any;
  coordinates:[Number],
  formattedAddress: string,
  createdAt: Date
}
export interface IRestaurantDocument extends IRestaurant, Document {}
export interface IRestaurantModel extends Model<IRestaurantDocument> {}