import mongoose, { Document, Model, Schema } from "mongoose";

// Define the IOrder interface
export interface IOrder extends Document {
    courseId: string;
    userId: string;
    payment_info: {
        payment_id?: string; // Define the type here
        [key: string]: any;  // Allow other properties
    };
}

// Create the order schema
const orderSchema = new Schema<IOrder>(
    {
        courseId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        payment_info: {
            type: Object,
            required: true,
        },
    },
    { timestamps: true }
);

// Create and export the Order model
const OrderModel: Model<IOrder> = mongoose.model<IOrder>('Order', orderSchema);

export default OrderModel;
