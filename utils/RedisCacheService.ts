import { ICacheService } from "./interfaces";
import * as Redis from 'redis';

export class RedisCacheService implements ICacheService {
    client: any;
    constructor() {
    };

    Connect = async () => {
        // if (this.client == null) {
        //     this.client = Redis.createClient({
        //         socket: {
        //             host: '127.0.0.1',
        //             port: 6379
        //         }
        //     });

        //     this.client.on('error', (err: any) => {
        //         console.log(err);
        //     });

        //     return this.client.connect().then(() => { return true });
        // }

        return false;
    };

    GetDataForKey = (key: string) => {
        return this.client.get(key);
            // .then((value: any) => {
            //     return value;
            // });
    };

    SetDataForKey = (key: string, data: string) => {
        this.client.set(key, data);
        return true;
    };

    DeleteKey = (key: string) => { return true; };
}