const express = require("express");
const router = express.Router();

const Order = require("../models/orders");
const User = require("../models/user");

// API for save order details
router.post("/api/save-order", async (req, res) => {
    try {
        const { order, buyerId, paymentIntentId } = req.body;

        const orderDate = new Date().toUTCString().slice(5, 16);
        const _id = require('mongodb').ObjectId;
        const checkPayment = await Order.find({ paymentIntentId });

        const newOrders = [];

        if (checkPayment.length === 0) {
            // Iterate over each order object in the 'order' array
            for (const singleOrder of order) {
                const newOrder = await Order.create({
                    ...singleOrder,
                    _id: new _id(),
                    paymentIntentId,
                    orderDate,
                    buyerId,
                });
                newOrders.push(newOrder);
            }
        }
        res.status(200).json({ orders: newOrders });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

// API for fetch order details by user ID
router.get('/api/get-orders/:buyerId', async (req, res) => {
    const buyerId = req.params.buyerId;

    try {
        const auth = await User.find({ _id: buyerId });

        if (auth[0].roll === "Customer") {
            // Fetch orders from the database based on the user ID
            const orders = await Order.find({ buyerId });

            res.status(200).json({ orders });
        } else {
            res.status(401).send('Unauthorised User');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('An error occurred while fetching the data');
    }
});

module.exports = router;