import express from "express";
import {
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
  resendOtp,
  forgetPassword,
  postResetPassword,
  getResetPassword,
  getUserProfileAndUpdate
  
} from "../controllers/user.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/registration", registrationUser);

userRouter.post("/activate-user", activateUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", isAutheticated, logoutUser);
userRouter.get('/get-info-update/:userId',isAutheticated,getUserProfileAndUpdate)
userRouter.put('/get-info-update/:userId',isAutheticated,getUserProfileAndUpdate)


//Resend OTP for activate Account
userRouter.post('/resend-otp',resendOtp)

userRouter.get('/refreshtoken',updateAccessToken)

userRouter.get("/me", isAutheticated, getUserInfo);

userRouter.post("/social-auth", socialAuth);

userRouter.put("/update-user-info",isAutheticated, updateUserInfo);

userRouter.put("/update-user-password", isAutheticated, updatePassword);

userRouter.put("/update-user-avatar", isAutheticated, updateProfilePicture);


userRouter.get('/reset-password/:id/:token', getResetPassword);
userRouter.post('/reset-password/:id/:token', postResetPassword);
userRouter.post('/forget-password', forgetPassword);

userRouter.get(
  "/get-users",
  isAutheticated,
  authorizeRoles("admin"),
  getAllUsers
);

userRouter.put(
  "/update-user",
  isAutheticated,
  authorizeRoles("admin"),
  updateUserRole
);


userRouter.delete(
  "/delete-user/:id",
  isAutheticated,
  authorizeRoles("admin"),
  deleteUser
);

export default userRouter;
