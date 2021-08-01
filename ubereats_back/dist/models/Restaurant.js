"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const restaurantSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    _meals: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Meal" }],
    usersrestaurants: { type: mongoose_1.Schema.Types.ObjectId }
});
exports.default = mongoose_1.model('Restaurant', restaurantSchema);
