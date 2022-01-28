declare type Toptions = {
    url: string;
    body: Object | any;
    headers?: any;
    success: (e: any) => void;
    progress?: (e: number) => void;
    error?: (e: any) => void;
};
export default class httpRequest {
    options: Toptions;
    xhr: XMLHttpRequest | any;
    percent: number;
    constructor(options: Toptions);
    abort(): void;
    request(): void;
    getError(): any;
    getBody(): any;
}
export {};
