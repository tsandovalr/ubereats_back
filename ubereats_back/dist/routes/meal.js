"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const meal_controller_1 = require("../controllers/meal.controller");
router.route('/meal')
    .get(meal_controller_1.getMeals)
    .post(meal_controller_1.createMeal);
router.route('/meal:id')
    .get(meal_controller_1.getMeal)
    .put(meal_controller_1.updateMeal)
    .patch(meal_controller_1.updateMeal)
    .delete(meal_controller_1.deleteMeal);
exports.default = router;
