import axios, { AxiosInstance } from 'axios';
import { ElasticClientConfig } from './types';
import clientSettings from './clientSettings.json';

class ElasticClient {
    private readonly restClient: AxiosInstance;

    constructor(config: ElasticClientConfig) {
        this.restClient = this.createClient(config);
    }

    public sendMessage(message: string): void {
        this.restClient.post('', message);
    }

    private createClient (config: ElasticClientConfig): AxiosInstance {
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