import { Request, Response } from 'express';
import Order from '../models/Order';
import {IOrderDocument} from '../interfaces/IOrder'


export const addOrderItems = async (req:any, res:Response) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body
try {
    
    const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
  
      const createdOrder = await order.save()
  
      return res.status(201).json(createdOrder)
} catch (error) {
    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ error: 'No order items' });
}

};};


export const getOrderById = async (req:any, res:Response) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
};


export const updateOrderToPaid = async (req:any, res:Response) => {
    const { _id } = req.user;
    const {id}=req.params;
 
try{
    const order = await Order.findByIdAndUpdate(id,{
        $set:{
        isPaid : true,
        paidAt : Date.now(),
        paymentResult : {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
    }}}, {new: true});

    return res.status(200).json({ status: 200, message: 'Order successfully updated', order }); 
  
  } catch(e) {
    console.error(e);
      return res.status(500).json({ status: 404, message: 'Order not found', error: e });
  
  }
};


export const updateOrderToDelivered = async (req:any, res:Response) => {
    const {id}=req.params;
try{
    const order = await Order.findByIdAndUpdate(id,{$set:{
        isDelivered : true,
        deliveredAt : Date.now()
        
    }}, {new: true});


    return res.status(200).json({ status: 200, message: 'Order successfully updated to delivered', order });
  
  } catch(e) {console.error(e);
    return res.status(500).json({ status: 404, message: 'Order not found', error: e });

  }
};

export const deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Order.findByIdAndDelete(id);
        return res.status(200).json({ status: 200, message: 'Order successfully deleted' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    };
};
export const getMyOrders = async (req:any, res:Response) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
};


export const getOrders = async (req:any, res:Response) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
};

