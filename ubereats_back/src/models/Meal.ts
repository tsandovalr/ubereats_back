import { Schema, model } from 'mongoose';
import Restaurant from './Restaurant';

const mealSchema = new Schema({
  name: { type: String, required: true },
  restaurant: {type: String, ref:'Restaurant',required:true},
  price: { type: Number, required: true },
  description: { type: String, required: true },
  photo: {type:String, required : true },
  usersmeals: {type: Schema.Types.ObjectId}
});

export default model('Meal', mealSchema);

