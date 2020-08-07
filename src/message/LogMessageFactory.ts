import LoggerError from '../errors/LoggerError';
import { LogLevel, LogMessageData } from '../logger/types';
import { ElasticMessageData, ElasticIndex, DeprecatedElasticIndex, ElasticMessageMetadata } from './types';
import { LoggerConfig } from '../config/types';
import { isCyclic } from '../utils/objectUtils';
import { PlainObject } from '../types';
import { getISODate } from '../utils/dateUtils';

class LogMessageFactory {
    constructor(
        private config: LoggerConfig
    ) { }

    public createLogMessage(data: LogMessageData, level: LogLevel): string {
        const meta = this.createMetadata();
        const dataObject = this.createData(data, level);
    
        return `${JSON.stringify(meta)}\n${JSON.stringify(dataObject)}\n`;
    }

    private createData(data: LogMessageData, level: LogLevel): ElasticMessageData {
        if (typeof data === 'string') {
            return this.createDataFromString(data, level)
        }
    
        if (typeof data === 'object') {
            return this.createDataFromObject(data, level);
        }
    
        throw new LoggerError('Invalid data format. Expected: string | object without cycle refs');
    }

    private createDataFromString(data: string, level: LogLevel): ElasticMessageData {
        return {
            message: data,
            level,
            dateTime: getISODate()
        };
    }

    private createDataFromObject(data: PlainObject, level: LogLevel): ElasticMessageData {
        if (isCyclic(data)) {
            throw new LoggerError('Message data contains some cyclic refs');
        }

        return {
            ...data,
            level,
            dateTime: getISODate(),
        };
    }

    private createMetadata(): ElasticMessageMetadata {
        const index: ElasticIndex = {
            _index: this.config.application,
        };
    
        if (!this.config.deprecated) {
            return { index };
        }
    
        const deprecatedIndex: DeprecatedElasticIndex = {
            ...index,
            _type: this.config.indexType
        };
    
        return { index: deprecatedIndex };
    }
}

export default LogMessageFactory;