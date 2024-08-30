// import mongoose, { Document, Schema } from "mongoose";
// import { IUser } from "./user.model";

// export interface IAdminNotification extends Document {
//     _id: mongoose.Types.ObjectId;
//     user: mongoose.Types.ObjectId | IUser;
//     textNotification: string;
//     imageNotification: string;
//     linkNotification: string;
// }

// const AdminNotificationSchema = new Schema<IAdminNotification>({
//     _id: {
//         type: Schema.Types.ObjectId,
//         auto: true
//     },
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     textNotification: {
//         type: String
//     },
//     imageNotification: {
//         type: String
//     },
//     linkNotification: {
//         type: String
//     }
// }, { timestamps: true });

// export const AdminNotification = mongoose.model<IAdminNotification>('AdminNotification', AdminNotificationSchema);

import mongoose, { Document, Schema } from "mongoose";

export interface IAdminNotification extends Document {
  user: mongoose.Types.ObjectId;
  textNotification: string;
  imageNotification?: string;
  linkNotification?: string;
  read: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const adminUserNotificationSchema = new Schema<IAdminNotification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    textNotification: {
      type: String,
      required: true,
    },
    imageNotification: {
      type: String,
    },
    linkNotification: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const AdminNotification = mongoose.model<IAdminNotification>(
  "AdminNotification",
  adminUserNotificationSchema
);