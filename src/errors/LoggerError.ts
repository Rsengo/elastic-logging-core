class LoggerError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export default LoggerError;