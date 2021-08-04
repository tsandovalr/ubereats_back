import { Request, Response } from 'express';
import Restaurant from '../models/Restaurant';

import Meal from '../models/Restaurant';
import User from '../models/User';
import {IRestaurantDocument} from '../interfaces/IRestaurant';
const cloudinary = require('cloudinary').v2;
cloudinary.config({cloud_name: "dbn1rcmjm",
api_key: "823982965319885",
api_secret: "s4hVR-HePt6RmVUH2PMQRUyN9qI"});
import validatePhoto from '../utils/validatePhoto';




// Get list of restaurants

export const getRestaurants = async (req: any, res: Response) => {
  
  try {
    const restaurants = await Restaurant.find({});
    return res.status(200).json({ status: 200, restaurants });
} catch (e) {
    console.error(e);
    return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
};
};

// Get list of meals of a specific restaurant

export const getMealsOfRestaurant = async (req: any, res: Response) => {
  const {id}=req.params;
  
  try {
    
    const restaurant = await Restaurant.findOne(id);
    const rest =req.restaurant.name
    const mealsofrest = await Meal.find({name: rest});

    return res.status(200).json({ status: 200, restaurant, mealsofrest });
} catch (e) {
    console.error(e);
    return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
};
};


// Get a single restaurant
export const getRestaurant = async (req: any, res: Response) => {
  const {id}=req.params;
  try {
    const restaurant = await Restaurant.findById(id);
    return res.status(200).json({ status: 200, restaurant });
} catch (e) {
    console.error(e);
    return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
};
};



//create restaurant
export const createRestaurant = async (req: any, res: Response) => {
  const body=req.body;
  const files = req.files;
  try {
    
    if (!files || Object.keys(files).length === 0 || !files.photo ) {
      res.status(400).json({
          done: false,
          msg: 'There is no photo uploaded, please try again.'
        });
    }
    const isVerified = validatePhoto(files, [ "png", "jpg" ])
    if(!isVerified){
        res.status(400).json({
            done: false,
            msg: "Image extension not allowed, try another one like a png or jpg"
        })
    } 
    const { secure_url } = await cloudinary.uploader.upload( isVerified )
    body.photo = secure_url;
    const newRestaurant = new Restaurant(body);

    await newRestaurant.save();
      return res.status(200).json({ status: 200, message: 'Restaurant succesfully created', restaurant: newRestaurant }); 
} catch (e) {
    console.error(e);
    if (e.code === 11000) {
      return res.status(400).json({ error: 'This restaurant already exists' });
    }
    return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
};
};


// Updates an existing restaurant in the DB.

export const updateRestaurant = async (req: any, res: Response) => {
  const body = req.body;
  const { _id } = req.meal;
  const { id } = req.params;
  const files=req.files;

  if (!files || Object.keys(files).length === 0 || !files.photo ) {
    res.status(400).json({
        done: false,
        msg: 'There is no photo upload, try again'
      });
  }
  const isVerified = validatePhoto(files, [ "png", "jpg" ])
  if(!isVerified){
      res.status(400).json({
          done: false,
          msg: "Image extension not allowed, try another one, like a png or jpg"
      })
  } 
  const { secure_url } = await cloudinary.uploader.upload( isVerified )
    body.photo = secure_url
  try {
    
      const restaurant = await Restaurant.findByIdAndUpdate(id, body);
      return res.status(200).json({ status: 200, message: 'Restaurant successfully updated', restaurant }); 
  } catch (e) {
      console.error(e);
      return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
  };
};


// Deletes a restaurant from the DB.

export const deleteRestaurant = async (req: any, res: Response) => {
  const { id } = req.params;
  
  try {
    
      await Meal.findByIdAndDelete(id);
      return res.status(200).json({ status: 200, message: 'Restaurant successfully deleted' });
  } catch (e) {
      console.error(e);
      return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
  };
};
