import { Schema, model } from 'mongoose';
import geocoder from '../utils/geocoder';
import {IClientAddressDocument} from '../interfaces/IClientAddress';


const orderSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      orderItems: [
        {
          name: { type: String, required: true },
          qty: { type: Number, required: true },
          image: { type: String, required: true },
          price: { type: Number, required: true },
          meal: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Meal',
          },
        },
      ],
      shippingAddress: {
        type: String,
        required: [true, 'Please add an address']
      },
      location: {
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      paymentMethod: {
        type: String,
        required: true,
      },
      paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
      },
      taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
      },
      shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
      },
      totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
      },
      isPaid: {
        type: Boolean,
        required: true,
        default: false,
      },
      paidAt: {
        type: Date,
      },
      isDelivered: {
        type: Boolean,
        required: true,
        default: false,
      },
      deliveredAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  )
  // Geocode & create location
orderSchema.pre('save', async function(this:IClientAddressDocument,next)  {

  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };

  // Do not save address
  next();
 
});

export default model('Order', orderSchema);

