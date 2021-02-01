import { IShop } from '../../model/ShoppingModel';

export default interface IShoppingRepo {
    create(data: IShop): Promise<void>;
    findLastShopList(): Promise<IShop | null>;
}