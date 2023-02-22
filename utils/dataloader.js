import fs from 'fs';
import path from 'path';

const utilsDirectory = path.join(process.cwd(), 'data');

export function LoadJSONFromFile(filename) {
    const fullPath = path.join(utilsDirectory, filename);
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

export const GetDealList = (maxDeals) => {
    // load the list of deals and list of products
    const deals = LoadJSONFromFile('dailydeals.json');
    const products = LoadJSONFromFile('products.json');

    const dealList = [];

    for (let i = 0; i < maxDeals; i++) {
        if (deals.deals[i] != null) {
            let product = products.products.find((p) => p.id == deals.deals[i].id);
            if (product != null) {
                let deal = { ...deals.deals[i], ...product};
                dealList.push(deal);
            }
        }
    }

    return dealList;
}

export const GetProduct = (productId) => {
    // load the list of deals and list of products
    const products = LoadJSONFromFile('products.json');

    return products.products.find((p) => p.id == productId);
}