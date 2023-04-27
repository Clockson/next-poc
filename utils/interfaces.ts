export interface ICacheService {
    Connect: () => Promise<boolean>;
    GetDataForKey: (key: string) => string;
    SetDataForKey: (key: string, data: string) => boolean;
    DeleteKey: (key: string) => boolean;

}