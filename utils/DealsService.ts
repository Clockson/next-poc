import { ICacheService } from "./interfaces";
import { RedisCacheService } from "./RedisCacheService";
import { LoadJSONFromFile } from "./dataloader";
import { Deal } from "@/models/deal.model";

export class DealsService {
    //cacheService: ICacheService;
    cacheConnected = false;

    constructor(cacheService:ICacheService) {
        //this.cacheService = cacheService;
    }

    GetDealList = (maxDeals: number): Deal[] => {
        let deals = null;

        // if (this.cacheService) {
        //     console.log('Cache Service exists');
        //         const list = this.cacheService.GetDataForKey('deals');
        //         console.log('list');
        //         console.log(list);
        //         deals = JSON.parse(list);
        // }

        if (deals == null) {
            deals = this.PretendDealsAPI(maxDeals);

            //this.cacheService.SetDataForKey('deals', JSON.stringify(deals));
        }

        return deals;
    }

    PretendDealsAPI = (maxDeals: number) => {
        // load the list of deals and list of products
        const deals = LoadJSONFromFile('dailydeals.json');
        const products = LoadJSONFromFile('products.json');

        const dealList = [];

        for (let i = 0; i < maxDeals; i++) {
            if (deals.deals[i] != null) {
                let product = products.products.find((p: any) => p.id == deals.deals[i].id);
                if (product != null) {
                    let deal = { ...deals.deals[i], ...product };
                    dealList.push(deal);
                }
            }
        }

        return dealList;
    }
}