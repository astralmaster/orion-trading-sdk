import { BlockchainOrder, SignOrderModelRaw, PairConfig, TradeOrderV2, HistoryParams } from "../utils/Models";
import { Chain } from './chain';
import { Exchange } from './exchange';
export declare class OrionAggregator {
    readonly chain: Chain;
    readonly exchange: Exchange;
    constructor(chain: Chain);
    init(): Promise<boolean>;
    getPairsInfo(): Promise<Record<string, PairConfig>>;
    private checkBalanceForOrder;
    private formatRawOrder;
    createOrder(orderParams: SignOrderModelRaw): Promise<BlockchainOrder>;
    sendOrder(order: BlockchainOrder, isCreateInternalOrder?: boolean): Promise<{
        orderId: string | number;
    }>;
    cancelOrder(orderId: string | number): Promise<{
        orderId: string | number;
    }>;
    private getCancelationSubject;
    getTradeHistory(options?: HistoryParams): Promise<TradeOrderV2[]>;
    getOrderById(orderId: number | string, owner?: string): Promise<TradeOrderV2>;
    getApiVersion(): Promise<number>;
}
