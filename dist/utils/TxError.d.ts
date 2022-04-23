import { TxType } from './Models';
export declare class TxError extends Error {
    txHash: string;
    txCode: number;
    txName: string;
    constructor(txHash: string, type: TxType, message: string);
}
