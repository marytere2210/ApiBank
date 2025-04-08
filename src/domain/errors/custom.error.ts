export class CustomError extends Error {
    constructor(
        public readonly message: string,
        public readonly statusCode: number,
        public readonly errorCode: string,
    ) {
        super(message);
    }

    static badRequest(message: string)
    {
        return new CustomError(
            message,
            400,
            "BAD_REQUEST",
        );
    }
    static unAuthorized(message: string){
        return new CustomError(
            message,
            401,
            "UNAUTHORIZED",
        );
    }
    static forbidden(message: string){
        return new CustomError(
            message,
            403,
            "FORBIDDEN",
        );
    
    }
    static conflict(message: string){
        return new CustomError(
            message,
            409,
            "CONFLICT",
        );
    
    }

    static unprocessableEnity(message: string){
        return new CustomError(
            message,
            422,
            "UNPROCESSABLE_ENTITY",
        );
    
    }

    static internalServer(message: string){
        return new CustomError(
            message,
            500,
            "INTERNAL_SERVER_ERROR",
        );
    
    }

    
    static notFound(message: string){
        return new CustomError(
            message,
            404,
            "NOT_FOUND",
        );
    
    }

}