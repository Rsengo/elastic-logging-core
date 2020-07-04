import axios, { AxiosInstance } from 'axios';
import { ElasticClientConfig } from './types';
import clientSettings from './clientSettings.json';

class ElasticClient {
    private readonly _restClient: AxiosInstance;

    constructor(config: ElasticClientConfig) {
        this._restClient = this._createClient(config);
    }

    public sendMessage(message: string): void {
        this._restClient.post('', message);
    }

    private _createClient (config: ElasticClientConfig): AxiosInstance {
        return axios.create({
            baseURL: `${config.url}/${clientSettings.urlPostfix}`,
            timeout: config.timeout,
            headers: { 
                'Content-Type': clientSettings.contentType 
            },
        });
    }
}

export default ElasticClient;