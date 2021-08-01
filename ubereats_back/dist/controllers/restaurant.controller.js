"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurant = exports.updateRestaurant = exports.createRestaurant = exports.getRestaurant = exports.getRestaurants = void 0;
const Restaurant_1 = __importDefault(require("../models/Restaurant"));
const Restaurant_2 = __importDefault(require("../models/Restaurant"));
const User_1 = __importDefault(require("../models/User"));
const _ = require("lodash");
// Get list of restaurants
const getRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.meal;
    try {
        const restaurants = yield Restaurant_1.default.find({});
        return res.status(200).json({ status: 200, restaurants });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
    ;
});
exports.getRestaurants = getRestaurants;
// Get a single restaurant
const getRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.meal;
    try {
        const restaurant = yield Restaurant_1.default.find({ usermeals: _id });
        return res.status(200).json({ status: 200, restaurant });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
    ;
});
exports.getRestaurant = getRestaurant;
//create meal
const createRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.restaurant;
    const { role } = req.user.role;
    try {
        const user = yield User_1.default.findOne({ _id: req.user.id });
        if (role !== "admin")
            return res
                .status(401)
                .json("Your request was processed but only admins are allowed to add or remove meals!");
        else {
            const restaurant = yield Restaurant_1.default.create({ usermeals: _id });
            return res.status(200).json({ status: 200, restaurant });
        }
        ;
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
    ;
});
exports.createRestaurant = createRestaurant;
// Updates an existing restaurant in the DB.
const updateRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, type, description, url } = req.body;
    const { _id } = req.meal;
    const { id } = req.params;
    const { role } = req.user.role;
    try {
        const user = yield User_1.default.findOne({ _id: req.user.id });
        if (role !== "admin")
            return res
                .status(401)
                .json("Your request was processed but only admins are allowed to update restaurants!");
        else {
            const restaurant = yield Restaurant_1.default.findByIdAndUpdate(id, {
                name,
                type,
                description,
                url,
                usersrestaurants: _id
            }, { new: true });
            return res.status(200).json({ status: 200, message: 'Restaurant successfully updated', restaurant });
        }
        ;
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
    ;
});
exports.updateRestaurant = updateRestaurant;
// Deletes a restaurant from the DB.
const deleteRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { role } = req.user.role;
    try {
        const user = yield User_1.default.findOne({ _id: req.user.id });
        if (role !== "admin")
            return res
                .status(401)
                .json("Your request was processed but only admins are allowed to add or remove restaurants!");
        else {
            yield Restaurant_2.default.findByIdAndDelete(id);
            return res.status(200).json({ status: 200, message: 'Restaurant successfully deleted' });
        }
        ;
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
    ;
});
exports.deleteRestaurant = deleteRestaurant;
