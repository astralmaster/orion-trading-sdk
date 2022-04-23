import { AxiosInstance } from "axios";
import { NetworkEntity } from '../utils/Models';
export declare class Api {
    readonly orionBlockchain: AxiosInstance;
    readonly orionAggregator: AxiosInstance;
    readonly binance: AxiosInstance;
    private static instance;
    constructor(network: NetworkEntity);
}
