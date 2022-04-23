import { Dictionary } from "./Models";
export declare class Tokens {
    readonly nameToAddress: Dictionary<string>;
    constructor(nameToAddress: Dictionary<string>);
    addressToName(address: string): (string | undefined);
    addressToNameSafe(address: string): string;
    nameToAddressSafe(name: string): string;
    addressesToSymbol(baseAsset: string, quoteAsset: string): (string | undefined);
    addressesToSymbolSafe(baseAsset: string, quoteAsset: string): string;
    symbolToAddresses(symbol: string): (string[] | undefined);
}
