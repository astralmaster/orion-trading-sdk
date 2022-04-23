/// <reference types="node" />
import ReconnectingWebSocket from 'reconnecting-websocket';
import EventEmitter from 'events';
declare class WsEmitter extends EventEmitter {
    socket: ReconnectingWebSocket;
    constructor(socket: ReconnectingWebSocket);
    close(): void;
}
export declare class WS {
    readonly wsOrionUrl: string;
    constructor(url?: string);
    init(): Promise<boolean>;
    private connect;
    priceFeedAll(): WsEmitter;
    priceFeedTicker(symbol: string): WsEmitter;
    orderBooks(pair: string): WsEmitter;
    private orderBooksV2;
}
export {};
