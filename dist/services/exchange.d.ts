import { ethers } from "ethers";
import { BlockchainOrder, Dictionary, BalanceContract } from '../utils/Models';
import { Chain } from './chain';
export declare class Exchange {
    readonly chain: Chain;
    exchangeContract: ethers.Contract;
    constructor(chain: Chain);
    getContractBalance(tokenSymbol?: string): Promise<Dictionary<BalanceContract>>;
    checkReservedBalance(walletAddress: string, asset?: string): Promise<Dictionary<string>>;
    private parseContractBalance;
    private depositETH;
    private depositERC20;
    deposit(currency: string, amount: string, gasPriceWei?: string): Promise<string>;
    withdraw(currency: string, amount: string, gasPriceWei?: string): Promise<string>;
    validateOrder(order: BlockchainOrder): Promise<boolean>;
}
