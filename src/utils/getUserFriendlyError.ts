import { EventioApiError } from "@/src/utils/result/EventioApiError";
import { UserFriendlyError } from "@/src/utils/result/Result";

// Converts any error to a user-friendly error
const getUserFriendlyError = (error: any) : UserFriendlyError => {
    if (error instanceof EventioApiError) {
        return UserFriendlyError(error.issues);
    }
    return UserFriendlyError("Something went wrong. Please try again.");
}
export default getUserFriendlyError;