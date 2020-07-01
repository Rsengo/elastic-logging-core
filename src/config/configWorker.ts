import LoggerError from '../errors/LoggerError';
import { LoggerConfig } from './LoggerConfig';

export const validateConfig = (config: LoggerConfig) => {
    if (!config.application) {
        throw new LoggerError('Expected application to be specified');
    }

    if (!config.url) {
        throw new LoggerError('Expected elastic url to be specified');
    }
};

// TODO
export const generateConfig = (userConfig: Partial<LoggerConfig>): LoggerConfig => {
    return {
        indexType: '',

        timeout: 100,
    
        deprecated: false,
    
        url: '',
        
        application: ''
    };
}