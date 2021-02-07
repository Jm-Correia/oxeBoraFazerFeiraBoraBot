import { IShop } from '../../model/ShoppingModel';
import ShoppingSchema from '../../schema/ShoppingSchema';
import IShoppingRepo from './interface/IShoppingRepo';

export default class ShoppingRepo implements IShoppingRepo {

    async create(data: IShop): Promise<void> {
        const { chat_id, date, items } = data;

        const listaAntiga = await ShoppingSchema.findOneAndDelete({
            chat_id: chat_id
        })

        const retorno = await ShoppingSchema.create({ chat_id, date, items });
        console.log(retorno);
    }


    async findLastShopList({ chat_id }: IShop): Promise<IShop> {

        const shop = await ShoppingSchema.findOne({
            chat_id
        })

        if (shop) {
            return shop;
        }

        throw new Error('chat_id não encontrado');

    }


}