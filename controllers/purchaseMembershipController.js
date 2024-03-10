const Razorpay = require("razorpay");
const Order = require("../models/orderModel");
const userController = require("../controllers/userControllers");
require("dotenv").config();

exports.purchasePremium = async (req, res) => {
    try {
      var rzp = new Razorpay({
        key_id: process.env.key_id,
        key_secret: process.env.key_secret,
      });
      const amount = 5000;
      console.log("Entered in Controller");
      rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
        if (err) {
        console.log("Razorpay Order Creation Error:", err);
        throw new Error(JSON.stringify(err));
        }
        req.user.createOrder({ orderid: order.id, status: "PENDING" })
          .then(() => {
            return res.status(201).json({ order, key_id: rzp.key_id });
          })
          .catch((err) => {
            throw new Error(err);
          });
      });
    } catch (err) {
      console.log(err);
      res.status(403).json({ message: "Something went wrong", error: err });
    }
  };

exports.updateTransactionStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const email = req.user.email;
    console.log("User email is : ",email);
    // console.log("req object in updateTransactionStatus function :",req);
    //console.log("res object in updateTransactionStatus function :",res.data.payment_id);
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ where: { orderid: order_id } });

    if (payment_id==undefined) {
      const failedOrder = await order.update({
        status: "FAILED",
      });
      console.log("Inside the if statement transaction failed");
      return res.status(400).json({
        success: false,
        message: "Transaction Failed",
      });
    }

    const promise1 = order.update({
      paymentid: payment_id,
      status: "SUCCESSFUL",
    });
    const promise2 = req.user.update({ isPremiumUser: true });

    Promise.all([promise1, promise2])
      .then(() => {
        return res.status(202).json({
          sucess: true,
          message: "Transaction Successful",
          token: userController.generateAccessToken(userId, email, true),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
    res.status(403).json({ error: err, message: "Something went wrong" });
  }
};