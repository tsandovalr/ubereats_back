import { Router } from 'express';
const router = Router();

import passport from 'passport';


import { getMeals, createMeal, getMeal, updateMeal, deleteMeal } from '../controllers/meal.controller';


router.route('/meal')
    .get(passport.authenticate('jwt', { session: false }),getMeals)
    .post(passport.authenticate('jwt', { session: false }),createMeal)
    

router.route('/meal:id')
    .get(passport.authenticate('jwt', { session: false }),getMeal)
    .put(passport.authenticate('jwt', { session: false }),updateMeal)
    .patch(passport.authenticate('jwt', { session: false }),updateMeal)
    .delete(passport.authenticate('jwt', { session: false }),deleteMeal)

 
    
export default router;