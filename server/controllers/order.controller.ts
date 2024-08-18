import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { IOrder } from "../models/order.Model";
import userModel from "../models/user.model";
import CourseModel, { ICourse } from "../models/course.model";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.Model";
import { getAllOrdersService, newOrder } from "../services/order.service";
import { redis } from "../utils/redis";
import Razorpay from 'razorpay';
import crypto from "crypto";
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});




// export const createOrder = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       if (!req.body || !req.body.amount) {
//         return res.status(400).send("Bad Request: Missing amount");
//       }

//       const options = {
//         amount: req.body.amount, // Amount in paise
//         currency: 'INR',
//         receipt: 'Receipt no. 1', // Unique receipt number
//         payment_capture: 1 // Automatically capture payment
//       };

//       const order = await razorpay.orders.create(options);

//       if (!order || order.status !== 'created') {
//         console.log('Error creating order:', order);
//         return res.status(400).send("Failed to create order");
//       }

//       res.json(order);

//     } catch (error) {
//       console.log('Error in createOrder:', error);
//       res.status(500).send("Internal Server Error");
//     }
//   }
// );
// Updated createOrder function with better error handling
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body || !req.body.amount) {
        return res.status(400).send("Bad Request: Missing amount");
      }

      const options = {
        amount: req.body.amount, // Amount in paise
        currency: 'INR',
        receipt: 'Receipt no. 1', // Unique receipt number
        payment_capture: 1 // Automatically capture payment
      };

      const order = await razorpay.orders.create(options);

      if (!order || order.status !== 'created') {
        console.log('Error creating order:', order);
        return res.status(400).send("Failed to create order");
      }

      res.json(order);

    } catch (error) {
      console.error('Error in createOrder:', error); // Use console.error for logging errors
      res.status(500).send("Internal Server Error");
    }
  }
);

// get All orders --- only for admin
export const getAllOrders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrdersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// send Razorpay key ID
export const sendRazorpayKeyId = CatchAsyncError(
  async (req: Request, res: Response) => {
    res.status(200).json({
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  }
);



// export const verifyPayment = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     console.log('Received request body:', req.body); 
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

//     const sha = crypto.createHmac("sha256", "4bPxRcU1h3sYMMC7YCvSNapL");
    

//     sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

//     const digest = sha.digest("hex");

//     if (digest !== razorpay_signature) {
//       return res.status(400).json({ msg: " Transaction is not legit!" });
//     }

//     res.json({ msg: " Transaction is legit!", orderId: razorpay_order_id, paymentId: razorpay_payment_id });
//   }
// );

export const verifyPayment = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Received request body:', req.body);

      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      // Use the secret key from environment variables
      const secret = "4bPxRcU1h3sYMMC7YCvSNapL" // Ensure this is the correct secret for the environment (test/live)

      // Generate the HMAC signature
      const sha = crypto.createHmac('sha256', secret);
      sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const digest = sha.digest('hex');

      // Verify the signature
      if (digest !== razorpay_signature) {
        return res.status(400).json({ msg: 'Transaction is not legit!' });
      }

      res.json({ msg: 'Transaction is legit!', orderId: razorpay_order_id, paymentId: razorpay_payment_id });
    } catch (error) {
      next(error);
    }
  }
);


