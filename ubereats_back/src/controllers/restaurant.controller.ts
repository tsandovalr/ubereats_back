import { Request, Response } from 'express';
import Restaurant from '../models/Restaurant';

import Meal from '../models/Restaurant';
import User from '../models/User';
const _ = require("lodash");



// Get list of restaurants

export const getRestaurants = async (req: any, res: Response) => {
  const {_id}=req.meal;
  try {
    const restaurants = await Restaurant.find({});
    return res.status(200).json({ status: 200, restaurants });
} catch (e) {
    console.error(e);
    return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
};
};

// Get a single restaurant
export const getRestaurant = async (req: any, res: Response) => {
  const {_id}=req.meal;
  try {
    const restaurant = await Restaurant.find({usermeals: _id});
    return res.status(200).json({ status: 200, restaurant });
} catch (e) {
    console.error(e);
    return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
};
};

//create meal
export const createRestaurant = async (req: any, res: Response) => {
  const {_id}=req.restaurant;
  const {role}=req.user.role;
  try {
    const user = await User.findOne({ _id: req.user.id });
      if (role !== "admin")
        return res
          .status(401)
          .json(
            "Your request was processed but only admins are allowed to add or remove meals!"
          );
          else {
      const restaurant = await Restaurant.create({usermeals: _id});
      return res.status(200).json({ status: 200, restaurant }); };
} catch (e) {
    console.error(e);
    return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
};
};


// Updates an existing restaurant in the DB.

export const updateRestaurant = async (req: any, res: Response) => {
  const { name, type, description, url } = req.body;
  const { _id } = req.meal;
  const { id } = req.params;
  const {role}=req.user.role;
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (role !== "admin")
    return res
      .status(401)
      .json(
        "Your request was processed but only admins are allowed to update restaurants!"
      );
      else {
      const restaurant = await Restaurant.findByIdAndUpdate(id, {
          name,
          type,
          description,
          url,
          usersrestaurants: _id
      }, { new: true });
      return res.status(200).json({ status: 200, message: 'Restaurant successfully updated', restaurant }); };
  } catch (e) {
      console.error(e);
      return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
  };
};


// Deletes a restaurant from the DB.

export const deleteRestaurant = async (req: any, res: Response) => {
  const { id } = req.params;
  const {role}=req.user.role;
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (role !== "admin")
    return res
      .status(401)
      .json(
        "Your request was processed but only admins are allowed to add or remove restaurants!"
      );
      else{
      await Meal.findByIdAndDelete(id);
      return res.status(200).json({ status: 200, message: 'Restaurant successfully deleted' }); };
  } catch (e) {
      console.error(e);
      return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
  };
};
