import { IShop } from '../../model/ShoppingModel';
import ShoppingSchema from '../../schema/ShoppingSchema';
import IShoppingRepo from './interface/IShoppingRepo';

export default class ShoppingRepo implements IShoppingRepo {

    async create(data: IShop): Promise<void> {
        const { chat_id, date, items } = data;
        const retorno = await ShoppingSchema.create({ chat_id, date, items });
        console.log(retorno);
    }
    async findLastShopList(): Promise<IShop | null> {
        throw new Error('Method not implemented.');
    }

}