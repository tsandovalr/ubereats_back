import { Request, Response } from 'express';

import Meal from '../models/Meal';
import Restaurant from '../models/Restaurant';
import {IRestaurantDocument} from '../interfaces/IRestaurant';
import User from '../models/User';
const cloudinary = require('cloudinary').v2;
cloudinary.config({cloud_name: "dbn1rcmjm",
api_key: "823982965319885",
api_secret: "s4hVR-HePt6RmVUH2PMQRUyN9qI"});
import validatePhoto from '../utils/validatePhoto';




// Get list of meals

export const getMeals = async (req: any, res: Response) => {
  
  try {
    const meals = await Meal.find({});
    return res.status(200).json({ status: 200, meals });
} catch (e) {
    console.error(e);
    return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
};
};

// Get a single meal
export const getMeal = async (req: any, res: Response) => {
  const {id}=req.params;
  try {
    const meal = await Meal.findById(id);
    return res.status(200).json({ status: 200, meal });
} catch (e) {
    console.error(e);
    return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
};
};

//create meal
export const createMeal = async (req: any, res: Response) => {
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
        
      
          const newMeal = new Meal(body);
          await newMeal.save();
          const pushmeal2restaurant = await Restaurant.findOneAndUpdate({name:body.restaurant},{$push:{meals:newMeal}});
      return res.status(200).json({ status: 200,message: 'Meal successfully created', meal: newMeal, pushmeal2restaurant  }); 
} catch (e) {
    console.error(e);
    return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
};
};



// Updates an existing meal in the DB.

export const updateMeal = async (req: any, res: Response) => {
  const body = req.body;
  const { id } = req.params;
  const files=req.files;
  try {
  if (!files || Object.keys(files).length === 0 || !files.photo ) {
    res.status(400).json({
        done: false,
        msg: 'There is no photo uploaded, please try again'
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
      const meal = await Meal.findByIdAndUpdate(id, body);
      return res.status(200).json({ status: 200, message: 'Meal successfully updated', meal }); 
  } catch (e) {
      console.error(e);
      return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
  };
};


// Deletes a meal from the DB.

export const deleteMeal = async (req: any, res: Response) => {
  const { id } = req.params;
  
  try {
    
      await Meal.findByIdAndDelete(id);
      return res.status(200).json({ status: 200, message: 'Meal successfully deleted' });
  } catch (e) {
      console.error(e);
      return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
  };
};
