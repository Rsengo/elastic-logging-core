import { LogLevel, LogMessageData } from './types';
import LogMessageFactory from '../message/LogMessageFactory';
import { generateConfig } from '../config/configWorker';
import { LoggerConfig } from '../config/types';
import ElasticClient from '../client/ElasticClient';

class Logger {
    private client: ElasticClient;

    private messageFactory: LogMessageFactory;

    constructor(config: Partial<LoggerConfig>) {
        const fullConfig = generateConfig(config);

        this.client = new ElasticClient(fullConfig);
        this.messageFactory = new LogMessageFactory(fullConfig);
    }

    log(data: LogMessageData, level: LogLevel): void {
        const message: string = this.messageFactory.createLogMessage(data, level);
        this.client.sendMessage(message);
    }

    logError(data: LogMessageData): void {
        this.log(data, 'error');
    }

    logWarn(data: LogMessageData): void {
        this.log(data, 'warn');
    }

    logInfo(data: LogMessageData): void {
        this.log(data, 'info');
    }
}

export default Logger;