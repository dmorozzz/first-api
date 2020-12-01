class OperationError extends Error {
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode;
        this.isOperation = true;
    }
}

module.exports = {
    OperationError
}
