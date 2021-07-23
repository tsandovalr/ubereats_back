import { Request, Response } from 'express';

import Meal from '../models/Meal';
const _ = require("lodash");



// Get list of meals

export const getMeals = async (req: any, res: Response) => {
  const {_id}=req.meal;
  try {
    const meals = await Meal.find({usermeals: _id});
    return res.status(200).json({ status: 200, meals });
} catch (e) {
    console.error(e);
    return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
};
};

// Get a single meal
export const getMeal = async (req: any, res: Response) => {
  const {_id}=req.meal;
  try {
    const meal = await Meal.find({usermeals: _id});
    return res.status(200).json({ status: 200, meal });
} catch (e) {
    console.error(e);
    return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
};
};

//create meal
export const createMeal = async (req: any, res: Response) => {
  const {_id}=req.meal;
  try {
    const meal = await Meal.create({usermeals: _id});
    return res.status(200).json({ status: 200, meal });
} catch (e) {
    console.error(e);
    return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
};
};


// Updates an existing meal in the DB.

export const updateMeal = async (req: any, res: Response) => {
  const { name, price, description} = req.body;
  const { _id } = req.meal;
  const { id } = req.params;
  try {
      const meal = await Meal.findByIdAndUpdate(id, {
          name,
          price,
          description,
          usermeals: _id
      }, { new: true });
      return res.status(200).json({ status: 200, message: 'Meal successfully updated', meal });
  } catch (e) {
      console.error(e);
      return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
  };
};


// Deletes a meal from the DB.

export const deleteMeal = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
      await Meal.findByIdAndDelete(id);
      return res.status(200).json({ status: 200, message: 'Meal successfully deleted' });
  } catch (e) {
      console.error(e);
      return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
  };
};
