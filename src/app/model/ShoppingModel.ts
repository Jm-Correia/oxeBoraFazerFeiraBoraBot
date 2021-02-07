import { Document } from 'mongoose'

export interface IItem {
    name: string;
    amount?: number;
}

export interface IShop extends Document {
    _id?: string;
    chat_id: string;
    date?: Date;
    items?: Array<IItem>;
}


