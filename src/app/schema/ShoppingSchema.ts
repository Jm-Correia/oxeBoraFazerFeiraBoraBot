import mongoose from "mongoose";
import { IShop } from "../model/ShoppingModel";

const ShoppingSchema = new mongoose.Schema<IShop>(
    {
        chat_id: { type: String, required: true },
        date: { type: Date, required: true },
        items: {
            type: Array,
            required: true
        },
    },
    { timestamps: true },
);

export default mongoose.model('Shopping', ShoppingSchema);
