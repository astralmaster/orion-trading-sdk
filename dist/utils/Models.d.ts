import BigNumber from "bignumber.js";
export interface Dictionary<T> {
    [key: string]: T;
}
export interface BlockchainInfo {
    baseCurrencyName: string;
    chainId: number;
    chainName: string;
    exchangeContractAddress: string;
    matcherAddress: string;
    assetToAddress: Dictionary<string>;
    assetToDecimals: Dictionary<number>;
    assetToIcons: Dictionary<string>;
}
export interface SignOrderModel {
    fromCurrency: string;
    toCurrency: string;
    feeCurrency: string;
    side: string;
    price: BigNumber;
    amount: BigNumber;
    priceDeviation: BigNumber;
    numberFormat: NumberFormat;
    needWithdraw: boolean;
    chainPrices?: {
        gasWei: string;
        baseAsset: string | number;
        networkAsset: string | number;
        feeAsset: string | number;
    };
}
export interface SignOrderModelRaw {
    fromCurrency: string;
    toCurrency: string;
    feeCurrency: string;
    side: string;
    price: number;
    amount: number;
    priceDeviation?: number;
    needWithdraw?: boolean;
    chainPrices?: {
        gasWei: string;
        baseAsset: string | number;
        networkAsset: string | number;
        feeAsset: string | number;
    };
}
export interface BlockchainOrder {
    id: string;
    senderAddress: string;
    matcherAddress: string;
    baseAsset: string;
    quoteAsset: string;
    matcherFeeAsset: string;
    amount: number;
    price: number;
    matcherFee: number;
    nonce: number;
    expiration: number;
    buySide: number;
    isPersonalSign: boolean;
    signature: string;
    needWithdraw?: boolean;
}
export interface NumberFormat {
    name: string;
    minQty: number;
    maxQty: number;
    minPrice: number;
    maxPrice: number;
    pricePrecision: number;
    qtyPrecision: number;
    baseAssetPrecision: number;
    quoteAssetPrecision: number;
    limitOrderThreshold?: number;
    executableOnBrokersPriceDeviation?: number;
}
export declare const DEFAULT_NUMBER_FORMAT: NumberFormat;
export interface CancelOrderRequestV2 {
    id: number | string;
    sender: string;
    signature: string;
    isPersonalSign: boolean;
}
export interface CancelOrderRequest {
    id: number | string;
    senderAddress: string;
    signature: string;
    isPersonalSign: boolean;
}
export declare enum Side {
    BUY = "buy",
    SELL = "sell"
}
export interface OrderData {
    price: BigNumber;
    amount: BigNumber;
    total: BigNumber;
    isAsk: boolean;
}
export interface Transaction {
    type: 'deposit' | 'withdrawal';
    date: number;
    token: string;
    amount: BigNumber;
    status: 'Pending' | 'Done' | 'Bridge' | 'Approving' | 'Cancelled';
    transactionHash: string;
    user: string;
    chainId?: number;
    bridgeOrderId?: string;
    bridgeDepositAddress?: string;
    nativeWithdrawAddress?: string;
    bridgeDepositAmount?: BigNumber;
}
export declare type SubOrderStatus = 'NEW' | 'ACCEPTED' | 'REJECTED' | 'VALIDATION_FAILED' | 'FILLED' | 'TX_PENDING' | 'CANCELED' | 'FAILED' | 'SETTLED';
export interface TradeSubOrder {
    amount: BigNumber;
    exchange: string;
    id: number;
    price: BigNumber;
    status: SubOrderStatus;
    side: Side;
    sent: boolean;
    pair: string;
}
export interface TradeSubOrderV2 {
    amount: BigNumber;
    exchange: string;
    id: number;
    price: BigNumber;
    status: SubOrderStatus;
    side: Side;
    tradesInfo: Dictionary<string | number | boolean>;
    pair: string;
}
export declare type OrderStatus = "NEW" | "ACCEPTED" | "DIRECT_SWAP_PENDING" | "ROUTING" | "PARTIALLY_FILLED" | "FILLED" | "TX_PENDING" | "REJECTED" | "SETTLED" | "CANCELED" | "FAILED";
export interface TradeOrder {
    blockchainOrder: BlockchainOrder;
    id: number;
    sender: string;
    baseAsset: string;
    quoteAsset: string;
    feeAsset: string;
    fee: BigNumber;
    date: number;
    pair: string;
    amount: BigNumber;
    price: BigNumber;
    side: Side;
    status: OrderStatus;
    subOrders: TradeSubOrder[];
    total: BigNumber;
}
export interface TradeOrderV2 {
    pair: string;
    baseAsset: string;
    quoteAsset: string;
    feeAsset: string;
    blockchainOrder: BlockchainOrder;
    status: OrderStatus;
    sender: string;
    date: number;
    id: string;
    side: string;
    amount: BigNumber;
    price: BigNumber;
    fee: BigNumber;
    subOrders: TradeSubOrderV2[];
    total: BigNumber;
}
export interface HistoryParams {
    baseAsset?: string;
    quoteAsset?: string;
    startTime?: number;
    endTime?: number;
    limit?: number;
}
export interface DomainData {
    name: string;
    version: string;
    chainId: number;
    salt: string;
}
export interface OrderbookItem {
    price: BigNumber;
    size: BigNumber;
    total: BigNumber;
    cumulativeSize: BigNumber;
    cumulativeTotal: BigNumber;
    avgPrice: BigNumber;
    deltaSize: number;
    exchanges: string[];
}
export interface Pair {
    name: string;
    fromCurrency: string;
    toCurrency: string;
    lastPrice: BigNumber;
    openPrice: BigNumber;
    change24h: BigNumber;
    high: BigNumber;
    low: BigNumber;
    vol24h: BigNumber;
}
export interface NetworkEntity {
    RPC: string;
    ORION: string;
    CHAIN_ID: number;
    TX_TIMEOUT_SEC: number;
}
export interface BalanceContract {
    total: BigNumber;
    locked: BigNumber;
    available: BigNumber;
}
export interface GetFeeArgs {
    baseAsset: string;
    amount: BigNumber;
    networkAsset: string;
    gasPriceWei: string;
    assetsPrices: Dictionary<BigNumber>;
    needWithdraw: boolean;
    isPool: boolean;
    feePercent: string;
    feeAsset: string;
    limits: Dictionary<number>;
}
export interface MatcherFeeArgs {
    baseAsset: string;
    amount: BigNumber;
    assetsPrices: Dictionary<BigNumber>;
    feePercent: string;
    feeAsset: string;
}
export interface PairConfig {
    name: string;
    minQty: number;
    maxQty: number;
    minPrice: number;
    maxPrice: number;
    pricePrecision: number;
    qtyPrecision: number;
    baseAssetPrecision: number;
    quoteAssetPrecision: number;
    limitOrderThreshold?: number;
    executableOnBrokersPriceDeviation?: number;
}
export interface OrderbookUpdates {
    T: string;
    _: number;
    S: string;
    ob: {
        a: [][];
        b: [][];
    };
}
export interface TxType {
    code: number;
    name: string;
}
