import { Document, Model } from "mongoose";
export interface IClientAddress {
  address: any;
  location: any;
  coordinates:[Number],
  formattedAddress: string,
  createdAt: Date
}
export interface IClientAddressDocument extends IClientAddress, Document {}
export interface IClientAddressModel extends Model<IClientAddressDocument> {}