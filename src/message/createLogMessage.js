import constants from '../constants';
import LoggerError from '../errors/LoggerError';

const _createIndex = ({application, deprecated}) => {
    const index = {
        _index: application,
    };

    if (!deprecated) {
        return { index };
    }

    const deprecatedIndex = {
        ...index,
        _type: constants.indexType
    };

    return { index: deprecatedIndex };
};

const _createData = (data, level) => {
    const dateTime = new Date().toISOString();

    if (typeof data === 'string') {
        return {
            message: data,
            level,
            dateTime
        };
    };

    if (typeof data === 'object') {
        // TODO: cycles check
        return {
            ...data,
            level,
            dateTime,
        };
    }

    throw new LoggerError('Invalid data format. Expected: string | object without cycle refs');
};

const createLogMessage = (data, level, config) => {
    const index = _createIndex(config);
    const dataObject = _createData(data, level);

    return `${JSON.stringify(index)}\n${JSON.stringify(dataObject)}\n`;
};

export default createLogMessage;