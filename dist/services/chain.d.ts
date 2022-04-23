import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import { BlockchainInfo, NetworkEntity, Dictionary } from '../utils/Models';
import { Tokens } from '../utils/Tokens';
import { Api } from './api';
export declare class Chain {
    readonly provider: ethers.providers.JsonRpcProvider;
    readonly signer: ethers.Wallet;
    readonly api: Api;
    readonly network: NetworkEntity;
    tokensContracts: Dictionary<ethers.Contract>;
    private _blockchainInfo;
    private _tokens;
    private _isEthereum;
    private _tokensFee;
    private _baseLimits;
    constructor(privateKey: string, network?: NetworkEntity);
    init(): Promise<void>;
    get blockchainInfo(): BlockchainInfo;
    get tokens(): Tokens;
    get baseLimits(): Dictionary<number>;
    get tokensFee(): Dictionary<string>;
    get isEthereum(): boolean;
    getTokenAddress(name: string): string;
    getTokenSymbolsList(): string[];
    getTokenAddressesList(): string[];
    tokenAddressToName(address: string): string;
    getNetworkAsset(data: BlockchainInfo): string;
    isNetworkAsset(asset: string): boolean;
    checkNetworkTokens(): Promise<void>;
    getBlockchainInfo(): Promise<BlockchainInfo>;
    getTokensFee(): Promise<Dictionary<string>>;
    getBaseLimits(): Promise<Dictionary<number>>;
    getBlockchainPrices(): Promise<Record<string, BigNumber>>;
    /**
     * @return gasPrice current gas price in wei
     */
    getGasPrice(): Promise<string>;
    private getGasPriceOB;
    private getGasPriceBinance;
    getNetworkBalance(): Promise<BigNumber>;
    getWalletBalance(ticker?: string): Promise<Dictionary<string>>;
    getTokenBalance(token: string): Promise<string[]>;
    sendTransaction(unsignedTx: ethers.PopulatedTransaction, gasLimit: number, gasPriceWei: BigNumber): Promise<ethers.providers.TransactionResponse>;
    getAllowance(currency: string, toAddress?: string): Promise<BigNumber>;
    allowanceHandler(currency: string, amount: string, gasPriceWei: string): Promise<string | void>;
    private checkNeedZeroReset;
    approve(currency: string, amountUnit: string, gasPriceWei?: string): Promise<string>;
    private approveERC20;
}
