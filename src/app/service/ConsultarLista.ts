import repo from "@infra/database/ShoppingRepo"
import { IItem, IShop } from "app/model/ShoppingModel"

interface dadosResponse {
    chat_id: string;
    itens: Array<string>;
}


export default class ConsultarLista {

    async execute(chat_id: string): Promise<dadosResponse> {

        try {
            const itemBase = await new repo().findLastShopList({ chat_id: chat_id });

            const listaAux: Array<string> = itemBase.items?.map(i => {
                return `${i.name}`;
            });

            return {
                chat_id,
                itens: listaAux
            }


        } catch (error) {
            console.log(error)

            return {
                chat_id,
                itens: []
            }
        }


    }

}