import LoggerError from '../errors/LoggerError';

const validateConfig = ({
    url,
    application
}) => {
    if (!application) {
        throw new LoggerError('Expected application to be specified');
    }

    if (!url) {
        throw new LoggerError('Expected elastic url to be specified');
    }
};

export default validateConfig;