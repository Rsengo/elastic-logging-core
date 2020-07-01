import { LogLevel, LogMessageData } from './models';
import LogMessageFactory from '../message/LogMessageFactory';
import { validateConfig, generateConfig } from '../config/configWorker';
import { LoggerConfig } from '../config/LoggerConfig';
import ElasticClient from '../client/ElasticClient';

class Logger {
    private _client: ElasticClient;

    private _messageFactory: LogMessageFactory;

    constructor(config: Partial<LoggerConfig>) {
        const fullConfig = generateConfig(config);
        validateConfig(fullConfig);

        this._client = new ElasticClient(fullConfig);
        this._messageFactory = new LogMessageFactory(fullConfig);
    }

    log(data: LogMessageData, level: LogLevel) {
        const message: string = this._messageFactory.createLogMessage(data, level);
        this._client.sendMessage(message);
    }

    logError(data: LogMessageData) {
        this.log(data, 'error');
    }

    logWarn(data: LogMessageData) {
        this.log(data, 'warn');
    }

    logInfo(data: LogMessageData) {
        this.log(data, 'info');
    }
}

export default Logger;