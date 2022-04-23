import { ethers } from "ethers";
import { BlockchainOrder, CancelOrderRequest, CancelOrderRequestV2 } from "../utils/Models";
export declare function signCancelOrder(cancelOrderRequest: CancelOrderRequest | CancelOrderRequestV2, signer: ethers.Wallet, chainId: number): Promise<string>;
export declare function signOrder(order: BlockchainOrder, signer: ethers.Wallet, chainId: number): Promise<string>;
export declare function hashOrder(order: BlockchainOrder): string;
