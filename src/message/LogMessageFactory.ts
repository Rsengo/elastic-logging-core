import LoggerError from '../errors/LoggerError';
import { LogLevel, LogMessageData } from '../logger/types';
import { ElasticMessageData, ElasticIndex, DeprecatedElasticIndex, ElasticMessageMetadata } from './types';
import { LoggerConfig } from '../config/types';

class LogMessageFactory {
    constructor(
        private _config: LoggerConfig
    ) { }

    public createLogMessage (data: LogMessageData, level: LogLevel): string {
        const meta = this._createMetadata();
        const dataObject = this._createData(data, level);
    
        return `${JSON.stringify(meta)}\n${JSON.stringify(dataObject)}\n`;
    }

    private _createData (data: LogMessageData, level: LogLevel): ElasticMessageData {
        const dateTime: string = new Date().toISOString();
    
        if (typeof data === 'string') {
            return {
                message: data,
                level,
                dateTime
            };
        }
    
        if (typeof data === 'object') {
            // TODO: cycles check
            return {
                ...data,
                level,
                dateTime,
            };
        }
    
        throw new LoggerError('Invalid data format. Expected: string | object without cycle refs');
    }

    private _createMetadata (): ElasticMessageMetadata {
        const index: ElasticIndex = {
            _index: this._config.application,
        };
    
        if (!this._config.deprecated) {
            return { index };
        }
    
        const deprecatedIndex: DeprecatedElasticIndex = {
            ...index,
            _type: this._config.indexType
        };
    
        return { index: deprecatedIndex };
    }
}

export default LogMessageFactory;