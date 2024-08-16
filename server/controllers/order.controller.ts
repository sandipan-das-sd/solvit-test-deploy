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
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// create order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;

      if (payment_info && 'id' in payment_info) {
        const paymentIntentId = payment_info.id;
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== "succeeded") {
          return next(new ErrorHandler("Payment not authorized", 400));
        }
      }

      const user = await userModel.findById(req.user?._id);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      const courseExistInUser = user.courses.some(
        (course: any) => course.courseId.toString() === courseId
      );

      if (courseExistInUser) {
        return next(new ErrorHandler("You have already purchased this course", 400));
      }

      const course: ICourse | null = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const data: any = {
        courseId: course._id.toString(),
        userId: user._id.toString(),
        payment_info,
      };

      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        { order: mailData }
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      user.courses.push({ courseId: course._id.toString() });

      await user.save();

      await redis.set(req.user?.id, JSON.stringify(user));
      const userId = req.user?._id?.toString();
      if (userId) {
        await redis.set(userId, JSON.stringify(user));
      } else {
        return next(new ErrorHandler("User ID is missing", 400));
      }

      await NotificationModel.create({
        user: user._id,
        title: "New Order",
        message: `You have a new order for ${course.name}`,
      });

      course.purchased += 1;
      await course.save();

      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
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

// send stripe publishable key
export const sendStripePublishableKey = CatchAsyncError(
  async (req: Request, res: Response) => {
    res.status(200).json({
      publishablekey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  }
);

// new payment
export const newPayment = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "INR",
        description: "SolviT course services",
        metadata: {
          company: "SolviT",
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });
      res.status(201).json({
        success: true,
        client_secret: myPayment.client_secret,
        myPayment: myPayment,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);


export const razorpayWebhook = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const shasum = crypto.createHmac('sha256', secret as string);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (digest !== req.headers['x-razorpay-signature']) {
      return next(new ErrorHandler('Invalid webhook signature', 400));
    }

    const event = req.body.event;
    const payload = req.body.payload;

    if (event === 'payment.captured') {
      const paymentEntity = payload.payment.entity;
      const paymentId = paymentEntity.id;

      // Fetch the order associated with the payment
      const order = await razorpay.orders.fetch(paymentEntity.order_id);
      if (!order) {
        return next(new ErrorHandler('Order not found', 404));
      }

      const user = await userModel.findOne({ 'payment_info.payment_id': paymentId });
      if (!user) {
        return next(new ErrorHandler('User not found', 404));
      }

      // Mark course as purchased
      const course = await CourseModel.findById(order.notes.courseId);
      if (!course) {
        return next(new ErrorHandler('Course not found', 404));
      }

      user.courses.push({ courseId: course._id.toString() });
      await user.save();

      await NotificationModel.create({
        user: user._id,
        title: 'Payment Success',
        message: `Your payment for ${course.name} was successful.`,
      });

      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, '../mails/order-confirmation.ejs'),
        { order: mailData }
      );

      try {
        await sendMail({
          email: user.email,
          subject: 'Order Confirmation',
          template: 'order-confirmation.ejs',
          data: mailData,
        });
      } catch (error: any) {
        console.error('Error sending email:', error);
        return next(new ErrorHandler(`Failed to send email: ${error.message}`, 500));
      }
    }

    res.status(200).json({ success: true });
  }
);