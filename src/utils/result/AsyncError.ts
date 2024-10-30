import { ErrorBody } from "./ErrorBody";

export class AsyncError extends Error {
    status: number;
    statusText: string;
    errorBody: ErrorBody;
  
    constructor(status: number, statusText: string, errorBody: ErrorBody) {
        console.log("AsyncError constructor");
        
      super(`Error ${status}: ${statusText}`);
      Object.setPrototypeOf(this, AsyncError.prototype);
      // Pass the constructed message to the base Error class
      this.name = "AsyncError"; 
      this.status = status;
      this.statusText = statusText;
      this.errorBody = errorBody;
  
      // Ensures the stack trace shows the correct location
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, AsyncError);
      }
      console.log("AsyncError constructor end");
      
    }

    get issues(): string {
        const issues = this.errorBody.issues;
        if (issues != null) {
            return issues.map(issue => issue.message).join(", ");
        }
        return "🤷‍♂️";
    }
  }