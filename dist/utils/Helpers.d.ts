import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { AxiosResponse, AxiosPromise } from "axios";
import { Dictionary, BlockchainInfo, TradeOrderV2, TradeSubOrderV2, TradeOrder, TradeSubOrder, OrderbookItem, Pair, GetFeeArgs, OrderbookUpdates, TxType } from "./Models";
import { Chain } from '../services/chain';
export declare function getPriceWithDeviation(price: BigNumber, side: string, deviation: BigNumber): BigNumber;
export declare function sumBigNumber(arr: BigNumber[]): BigNumber;
export declare function getFee({ baseAsset, amount, networkAsset, gasPriceWei, assetsPrices, feePercent, feeAsset, needWithdraw, isPool, limits }: GetFeeArgs): BigNumber;
export declare function parseTradeOrder(item: any): TradeOrder;
export declare function parseTradeSubOrder(item: any): TradeSubOrder;
export declare function parseTradeOrderV2(item: any): TradeOrderV2;
export declare function parseTradeSubOrderV2(item: any): TradeSubOrderV2;
export declare function canCancelOrder(order: TradeOrder): boolean;
export declare function isOrderOpen(order: TradeOrder): boolean;
export declare function parseOrderbookItem(arr: any): OrderbookItem;
export declare function parseOrderbookItemsV1(message: {
    asks: Array<[]>;
    bids: Array<[]>;
}): {
    asks: OrderbookItem[];
    bids: OrderbookItem[];
};
export declare function parseOrderbookItemsV2(message: OrderbookUpdates): {
    asks: OrderbookItem[];
    bids: OrderbookItem[];
};
export declare function parsePair(arr: string[]): Pair;
export declare function parsePairs(data: any[]): Record<string, Pair>;
export declare function numberToUnit(currency: string, n: BigNumber, blockchainInfo: BlockchainInfo): string;
export declare function unitToNumber(currency: string, n: BigNumber, blockchainInfo: BlockchainInfo): BigNumber;
export declare function numberTo8(n: BigNumber.Value): number;
export declare function handleResponse(request: AxiosPromise): Promise<AxiosResponse['data']>;
export declare function waitForTx(txResponse: ethers.providers.TransactionResponse, timeoutSec: number, txType: TxType): Promise<string>;
export declare function getTokenContracts(chain: Chain): Dictionary<ethers.Contract>;
