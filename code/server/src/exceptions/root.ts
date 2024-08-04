export class HttpException extends Error {
  message: string;
  errorCode: any;
  statusCode: number;
  errors: ErrorCode;

    constructor(message: string, errorCode: ErrorCode, statusCode: number, errors: any) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }

}


export enum ErrorCode{
    USER_NOT_FOUND = '1001',
    USER_ALREADY_EXISTS = '1002',
    USER_OR_INCORRECT_PASSWORD = '1003',
    UNAUTHORIZED = '1004',
    INTERNAL_EXCEPTION = '1005',
    UNPROCESSABLE_ENTITY = '1006',
} 