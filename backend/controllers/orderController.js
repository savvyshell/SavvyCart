import asyncHandler from 'express-async-handler'
import Order from "../models/orderModel.js"

/**
 * @desc    Create new order
 * @route   POST /api/orders/
 * @access  Private
 * */
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    }

    if (!orderItems || !shippingAddress || !paymentMethod) {
        res.status(400)
        throw new Error('Missing fields - bad request')
    }

    let itemsPrice = orderItems.reduce((accum, i) => {
        let qty = i.qty
        //console.log(typeof i.qty, i.qty)
        if (typeof i.qty === 'string') {
            qty = parseInt(i.qty)
        }
        return accum + i.price * qty
    }, 0)
    itemsPrice = Number(itemsPrice.toFixed(2))
    // console.log(itemsPrice)
    const shippingPrice = Number((itemsPrice > 100 ? 0 : 100).toFixed(2))
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2))
    const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2))

    const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
})

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 * */
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

/**
 * @desc    Update order to paid
 * @route   GET /api/orders/:id/pay
 * @access  Private
 * */
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

/**
 * @desc    Update order to delivered
 * @route   GET /api/orders/:id/deliver
 * @access  Private/Admin
 * */
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

/**
 * @desc    Get logged in user orders
 * @route   GET /api/orders/myorders
 * @access  Private
 * */
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    if (orders) {
        res.json(orders)
    } else {
        res.status(404)
        throw new Error('Error receiving orders from user')
    }
})

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private/Admin
 * */
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    if (orders) {
        res.json(orders)
    } else {
        res.status(404)
        throw new Error('Error receiving orders')
    }
})

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
    updateOrderToDelivered
}
