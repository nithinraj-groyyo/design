export interface ResponseFormat<T> {
    statusCode: number;
    message: string;
    data: T;
}

export interface ResponseDTO<T> {
    status: boolean;
    message: string;
    httpStatusCode: number;
    id?: string;
    errorReason?: string;
    data?: T;
}
export type SuccessResponse<T> = {
    status: true;
    message: string;
    httpStatusCode: number;
    id?: string;
    data: T;
};
export type FailureResponse = {
    status: false;
    message: string;
    httpStatusCode: number;
    id?: string;
    errorReason: string;
    data?: null;
};