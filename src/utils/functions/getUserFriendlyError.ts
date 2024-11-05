import { EventioApiError } from "@/src/api/ApiError/EventioApiError";
import { UserFriendlyError } from "@/src/utils/result/Result";

// Converts any error to a user-friendly error
export function getUserFriendlyError(error: any) : UserFriendlyError  {
    if (error instanceof EventioApiError) {
        return UserFriendlyError(error.issues);
    }
    return UserFriendlyError("Something went wrong. Please try again.");
}
export default getUserFriendlyError;