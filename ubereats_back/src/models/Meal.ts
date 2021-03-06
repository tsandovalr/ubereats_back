import { Schema, model, Mongoose } from 'mongoose';
import Restaurant from './Restaurant';

const mealSchema = new Schema({
  name: { type: String, required: true },
  restaurant: {type: Schema.Types.ObjectId},
  price: { type: Number, required: true },
  description: { type: String, required: true },
  photo: {type:String, required : true },
  usersmeals: {type: Schema.Types.ObjectId}
});

export default model('Meal', mealSchema);

