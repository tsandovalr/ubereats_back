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
exports.deleteMeal = exports.updateMeal = exports.createMeal = exports.getMeal = exports.getMeals = void 0;
const Meal_1 = __importDefault(require("../models/Meal"));
const User_1 = __importDefault(require("../models/User"));
const _ = require("lodash");
// Get list of meals
const getMeals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meals = yield Meal_1.default.find({});
        return res.status(200).json({ status: 200, meals });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
    ;
});
exports.getMeals = getMeals;
// Get a single meal
const getMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.meal;
    try {
        const meal = yield Meal_1.default.find({ usermeals: _id });
        return res.status(200).json({ status: 200, meal });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
    ;
});
exports.getMeal = getMeal;
//create meal
const createMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description, url } = req.body;
    try {
        const newMeal = new Meal_1.default({
            name,
            price,
            description,
            url
        });
        yield newMeal.save();
        return res.status(200).json({ status: 200, message: 'Meal successfully created', meal: newMeal });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
    ;
});
exports.createMeal = createMeal;
// Updates an existing meal in the DB.
const updateMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description } = req.body;
    const { _id } = req.meal;
    const { id } = req.params;
    const { role } = req.user.role;
    try {
        const user = yield User_1.default.findOne({ _id: req.user.id });
        if (role !== "admin")
            return res
                .status(401)
                .json("Your request was processed but only admins are allowed to add or remove meals!");
        else {
            const meal = yield Meal_1.default.findByIdAndUpdate(id, {
                name,
                price,
                description,
                usermeals: _id
            }, { new: true });
            return res.status(200).json({ status: 200, message: 'Meal successfully updated', meal });
        }
        ;
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
    ;
});
exports.updateMeal = updateMeal;
// Deletes a meal from the DB.
const deleteMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { role } = req.user.role;
    try {
        const user = yield User_1.default.findOne({ _id: req.user.id });
        if (role !== "admin")
            return res
                .status(401)
                .json("Your request was processed but only admins are allowed to add or remove meals!");
        else {
            yield Meal_1.default.findByIdAndDelete(id);
            return res.status(200).json({ status: 200, message: 'Meal successfully deleted' });
        }
        ;
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
    ;
});
exports.deleteMeal = deleteMeal;
