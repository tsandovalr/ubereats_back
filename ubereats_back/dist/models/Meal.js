"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mealSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    usersmeals: { type: mongoose_1.Schema.Types.ObjectId }
});
exports.default = mongoose_1.model('Meal', mealSchema);
