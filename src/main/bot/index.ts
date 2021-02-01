import '@infra/config/index';
import ShoppingRepo from '@infra/database/ShoppingRepo';
import { IShop, IItem } from "../../app/model/ShoppingModel";

const chat_id = "12345";
const date = new Date();
const items: Array<IItem> = [{
    name: "Feijao",
}]

const shop: IShop = {
    chat_id,
    date,
    items
};

new ShoppingRepo().create(shop)

/**
 * NOVA LISTA
 *     Vou pedir a data da lista? ou nome?
 * Recuperar Ultima Lista
 *
 * No serviço eu tenho um update lista atual
 *      que será quando o usuário irá adicionado itens na lista. ???
 */