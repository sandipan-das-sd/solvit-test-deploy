// // import express from "express";
// // import { authorizeRoles, isAutheticated } from "../middleware/auth";
// // import {
// //   createOrder,
// //   getAllOrders,
// //   newPayment,
// //   sendRazorpayKeyId,
// //   verifyPayment
// // } from "../controllers/order.controller";
// // const orderRouter = express.Router();

// // orderRouter.post("/create-order", isAutheticated, createOrder);

// // orderRouter.get(
// //   "/get-orders",
// //   isAutheticated,
// //   authorizeRoles("admin"),
// //   getAllOrders
// // );

// // orderRouter.get("/payment/razorpaykeyid", sendRazorpayKeyId);

// // orderRouter.post("/payment", isAutheticated, newPayment);
// // orderRouter.post("/verify-payment", isAutheticated, verifyPayment);

// // export default orderRouter;
// import express from "express";
// import { authorizeRoles, isAutheticated } from "../middleware/auth";
// import {
//   createOrder,
//   getAllOrders,
//   newPayment,
//   sendRazorpayKeyId,
//   verifyPayment,
// } from "../controllers/order.controller";
// const orderRouter = express.Router();

// orderRouter.post("/create-order", isAutheticated, createOrder);

// orderRouter.get(
//   "/get-orders",
//   isAutheticated,
//   authorizeRoles("admin"),
//   getAllOrders
// );

// orderRouter.get("/payment/razorpaykeyid", sendRazorpayKeyId);

// orderRouter.post("/payment", isAutheticated, newPayment);
// orderRouter.post("/verify-payment", isAutheticated, verifyPayment);

// export default orderRouter;
import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  createOrder,
  getAllOrders,
  verifyUPIPayment,
} from "../controllers/order.controller";
const orderRouter = express.Router();

orderRouter.post("/create-order", isAutheticated, createOrder);

orderRouter.get(
  "/get-orders",
  isAutheticated,
  authorizeRoles("admin"),
  getAllOrders
);

orderRouter.post("/verify-upi-payment", isAutheticated, verifyUPIPayment);

export default orderRouter;
