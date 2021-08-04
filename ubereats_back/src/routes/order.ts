import { Router } from 'express';
const router = Router();

import passport from 'passport';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from '../controllers/order.controller.js';

router.route('/order')
    .post(passport.authenticate('jwt', { session: false }),addOrderItems)
    .get(passport.authenticate('jwt', { session: false }),getOrders)

router.route('/order/:id')
    .get(passport.authenticate('jwt', { session: false }),getOrderById)

router.route('/order/:id/pay')
    .put(passport.authenticate('jwt', { session: false }),updateOrderToPaid)

router.route('/order/:id/deliver')
    .put(passport.authenticate('jwt', { session: false }),updateOrderToDelivered)

export default router;
