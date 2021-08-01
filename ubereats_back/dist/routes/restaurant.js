"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const restaurant_controller_1 = require("../controllers/restaurant.controller");
router.route('/restaurant')
    .get(restaurant_controller_1.getRestaurants)
    .post(restaurant_controller_1.createRestaurant);
router.route('/restaurant:id')
    .get(restaurant_controller_1.getRestaurant)
    .put(restaurant_controller_1.updateRestaurant)
    .patch(restaurant_controller_1.updateRestaurant)
    .delete(restaurant_controller_1.deleteRestaurant);
exports.default = router;
