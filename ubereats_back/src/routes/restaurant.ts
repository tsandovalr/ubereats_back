import { Router } from 'express';
const router = Router();

import passport from 'passport';

import { getRestaurants, createRestaurant, getRestaurant, updateRestaurant, deleteRestaurant } from '../controllers/restaurant.controller';


router.route('/restaurant')
    .get(getRestaurants)
    .post(createRestaurant)
    

router.route('/restaurant:id')
    .get(getRestaurant)
    .put(updateRestaurant)
    .patch(updateRestaurant)
    .delete(deleteRestaurant)


export default router;