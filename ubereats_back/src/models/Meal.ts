import { Schema, model } from 'mongoose';

const mealSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  url: {type:String, required : true },
  usersmeals: {type: Schema.Types.ObjectId}
});

export default model('Meal', mealSchema);

