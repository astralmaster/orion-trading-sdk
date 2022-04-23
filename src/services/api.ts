import axios, { AxiosInstance } from "axios"
import { NetworkEntity } from '../utils/Models'

export class Api {
    public readonly orionBlockchain!: AxiosInstance
    public readonly orionAggregator!: AxiosInstance
    public readonly binance!: AxiosInstance

    private static instance: Api;

    constructor (network: NetworkEntity) {
        if (Api.instance) return Api.instance

        Api.instance = this

        axios.defaults.headers.common['user-agent'] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"

        this.orionBlockchain = axios.create({
            baseURL: `${network.ORION}/api`,
            timeout: 5000
        })

        this.orionAggregator = axios.create({
            baseURL: `${network.ORION}/backend/api/v1`,
            timeout: 5000
        })

        this.binance = axios.create({
            baseURL: network.RPC,
            timeout: 5000
        })
    }
}
