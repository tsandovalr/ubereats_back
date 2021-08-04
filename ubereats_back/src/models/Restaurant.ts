import { Schema, model } from 'mongoose';
import geocoder from '../utils/geocoder';
import {IRestaurantDocument} from '../interfaces/IRestaurant';
import Meal from './Meal';

const restaurantSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String,
         required: true
         },
    description: { 
        type: String,
         required: true 
        },
        address: {
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
          meals:[],

        photo: {
        type:String, 
        required : true 
    }
});

// Geocode & create location
restaurantSchema.pre('save', async function(this:IRestaurantDocument,next)  {

    const loc = await geocoder.geocode(this.address);
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress
    };
  
    // Do not save address
    next();
   
  });

export default model('Restaurant', restaurantSchema);





