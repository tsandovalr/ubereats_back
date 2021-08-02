import { Router } from 'express';
const router = Router();


import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from '../controllers/order.controller.js';

router.route('/order')
    .post(addOrderItems)
    .get(getOrders)

router.route('/order/:id')
    .get(getOrderById)

router.route('/order/:id/pay')
    .put(updateOrderToPaid)

router.route('/order/:id/deliver')
    .put(updateOrderToDelivered)

router.route('/order/:id/deliver')
    .put(updateOrderToDelivered)

export default router;
