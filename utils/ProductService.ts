import { ICacheService } from "./interfaces";
import { RedisCacheService } from "./RedisCacheService";
import { LoadJSONFromFile } from "./dataloader";
import { Product } from "@/models/product.model";

export class ProductService {
    cacheService: ICacheService | undefined;
    cacheConnected = false;

    constructor(cacheService?:ICacheService) {
        this.cacheService = cacheService;
    }

    GetProductById = (productId: number): Product => {
        return this.PretendProductsAPI(productId);;
    }

    PretendProductsAPI = (productId: number): Product => {
        const products = LoadJSONFromFile('products.json')?.products;

        return products.find((p: any) => p.id == productId);
    }
}