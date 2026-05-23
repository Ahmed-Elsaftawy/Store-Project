

class AppError extends Error {
    constructor(message, statusCode, statusMessage) {
        super(  )
        this.message = message
        this.statusCode = statusCode
        this.statusMessage = statusMessage
    }
}

const appErrorHandler = (message, statusCode, statusMessage) => {
    return new AppError(message, statusCode, statusMessage);
}

export { appErrorHandler };

