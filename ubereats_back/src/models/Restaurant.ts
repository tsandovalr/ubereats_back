import { Schema, model } from 'mongoose';
import geocoder from '../utils/geocoder';
import {IRestaurantDocument} from '../interfaces/IRestaurant'

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
    url: {
        type:String, 
        required : true 
    },
    _meals: [{ type: Schema.Types.ObjectId, ref: "Meal" }],
    usersrestaurants: {type: Schema.Types.ObjectId}
});

// Geocode & create location
restaurantSchema.pre('save', async function(this:IRestaurantDocument)  {

    const loc = await geocoder.geocode(this.address);
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress
    };
  
    // Do not save address
    this.address = undefined;
   
  });

export default model('Restaurant', restaurantSchema);





