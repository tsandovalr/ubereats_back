import { Router } from 'express';
const router = Router();

import passport from 'passport';

import { getRestaurants,getMealsOfRestaurant, createRestaurant, getRestaurant, updateRestaurant, deleteRestaurant } from '../controllers/restaurant.controller';


router.route('/restaurant')
    .get(passport.authenticate('jwt', { session: false }),getRestaurants)
    .post(passport.authenticate('jwt', { session: false }),createRestaurant)
    

router.route('/restaurant:id')
    .get(passport.authenticate('jwt', { session: false }),getRestaurant)
    .put(passport.authenticate('jwt', { session: false }),updateRestaurant)
    .patch(passport.authenticate('jwt', { session: false }),updateRestaurant)
    .delete(passport.authenticate('jwt', { session: false }),deleteRestaurant)

    router.route('/restaurant-meals:id')
    .get(passport.authenticate('jwt', { session: false }),getMealsOfRestaurant)
export default router;
getMealsOfRestaurant