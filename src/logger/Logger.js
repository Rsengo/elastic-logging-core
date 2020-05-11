import createClient from '../client/createClient';
import LogLevel from './LogLevel';
import createLogMessage from '../message/createLogMessage';
import validateConfig from '../validators/validateConfig';
import defaultConfig from '../constants/defaultConfig';

class Logger {
    constructor(config) {
        const fullConfig = { ...defaultConfig, config };
        validateConfig(fullConfig);

        this._config = fullConfig;
        this._client = createClient(config);
    }

    log(data, level) {
        this._client.post('', createLogMessage(data, level, this._config));
    }

    logError(data) {
        this.log(data, LogLevel.ERROR);
    }

    logWarn(data) {
        this.log(data, LogLevel.WARN);
    }

    logInfo(data) {
        this.log(data, LogLevel.INFO);
    }
}

export default Logger;