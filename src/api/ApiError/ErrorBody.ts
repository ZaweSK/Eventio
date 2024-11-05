export interface Issue {
    code: string ,
    message: string,
    inclusive: boolean, 
}

export interface ErrorBody {
    message: string;
    code: string;
    issues?: Issue[];
}