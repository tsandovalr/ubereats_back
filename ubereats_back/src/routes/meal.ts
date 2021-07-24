import { Router } from 'express';
const router = Router();

import passport from 'passport';


import { getMeals, createMeal, getMeal, updateMeal, deleteMeal } from '../controllers/meal.controller';


router.route('/meal')
    .get(getMeals)
    .post(createMeal)
    

router.route('/meal:id')
    .get(getMeal)
    .put(updateMeal)
    .patch(updateMeal)
    .delete(deleteMeal)


export default router;