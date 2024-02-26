
const Razorpay = require("razorpay");
const Order = require("../models/orderModel");
const userController = require("../controllers/userControllers");

exports.purchasePremium = async (req, res) => {
    try {
      var rzp = new Razorpay({
        key_id: "rzp_test_DQmEqUi9B1m2FU",
        key_secret: "piy6oQQkXmBNFlNmH5gH8LgR",
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
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ where: { orderid: order_id } });
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
    res.status(403).json({ error: err, message: "Sometghing went wrong" });
  }
};
