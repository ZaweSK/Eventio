import { ErrorBody } from "./ErrorBody";

export class EventioApiError extends Error {
    status: number;
    errorBody: ErrorBody;
  
    constructor(status: number, errorBody: ErrorBody) {        
      super(`Error ${status}`);
      Object.setPrototypeOf(this, EventioApiError.prototype);
      // Pass the constructed message to the base Error class
      this.name = "EventioApiError"; 
      this.status = status;
      this.errorBody = errorBody;
  
      // Ensures the stack trace shows the correct location
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, EventioApiError);
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

    get fullDescription(): string {
        return `${this.status} - ${this.errorBody.code} - ${this.errorBody.message} - ${this.issues}`;
    }
  }