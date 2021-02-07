import repo from "@infra/database/ShoppingRepo"
import { IItem, IShop } from "app/model/ShoppingModel"


interface dados {
    chat_id: string,
    lista: Array<string>;
}

export default class SalvarLista {

    async execute({ chat_id, lista }: dados): Promise<void> {
        const date = new Date();

        const items: Array<IItem> = lista.map(i => {
            const item: IItem = {
                name: i
            }
            return item;
        })

        const shop: IShop = {
            chat_id,
            date,
            items
        }
        await new repo().create(shop);

    }

}