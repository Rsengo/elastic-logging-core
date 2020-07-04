import LoggerError from '../errors/LoggerError';
import { LoggerConfig } from './types';
import defaultConfig from './defaultConfig.json';

const validateConfig = (config: Partial<LoggerConfig>) => {
    if (!config.application) {
        throw new LoggerError('Expected application to be specified');
    }

    if (!config.url) {
        throw new LoggerError('Expected elastic url to be specified');
    }
};

export const generateConfig = (userConfig: Partial<LoggerConfig>): LoggerConfig => {
    const config = {
        ...defaultConfig,
        ...userConfig
    };

    validateConfig(userConfig);

    return config as LoggerConfig;
}