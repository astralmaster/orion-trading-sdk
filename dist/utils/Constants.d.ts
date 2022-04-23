import { TxType } from "./Models";
export declare const NETWORK: {
    TEST: {
        BSC: {
            RPC: string;
            ORION: string;
            CHAIN_ID: number;
            TX_TIMEOUT_SEC: number;
        };
        ETH: {
            RPC: string;
            ORION: string;
            CHAIN_ID: number;
            TX_TIMEOUT_SEC: number;
        };
    };
    MAIN: {
        BSC: {
            RPC: string;
            ORION: string;
            CHAIN_ID: number;
            TX_TIMEOUT_SEC: number;
        };
        ETH: {
            RPC: string;
            ORION: string;
            CHAIN_ID: number;
            TX_TIMEOUT_SEC: number;
        };
    };
};
export declare const ORION_WS: {
    TEST: {
        BSC: string;
        ETH: string;
    };
    MAIN: {
        BSC: string;
        ETH: string;
    };
};
export declare const DEFAULT_EXPIRATION: number;
export declare const ORDER_TYPES: {
    Order: {
        name: string;
        type: string;
    }[];
};
export declare const CANCEL_ORDER_TYPES_V2: {
    DeleteOrder: {
        name: string;
        type: string;
    }[];
};
export declare const CANCEL_ORDER_TYPES: {
    DeleteOrder: {
        name: string;
        type: string;
    }[];
};
export declare const DOMAIN_TYPE: {
    name: string;
    type: string;
}[];
export declare const ORDER_STATUSES: string[];
export declare const NETWORK_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000";
export declare const PRICE_DEVIATIONS: {
    MIN: number;
    MAX: number;
};
export declare const EXCHANGE_ORDER_PRECISION = 8;
export declare const CHAIN_TX_TYPES: Record<string, TxType>;
export declare const TEST_WALLET: {
    mnemonicPhrase: string;
};
