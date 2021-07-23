import { Schema, model } from 'mongoose';

const restaurantSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    _meals: [{ type: Schema.ObjectId, ref: "Meal" }]
});

export default model('Restaurant', restaurantSchema);




