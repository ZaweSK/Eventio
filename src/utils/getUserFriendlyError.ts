import { AsyncError } from "@/src/utils/result/AsyncError";
import { UserFriendlyError } from "@/src/utils/result/Result";

// Converts any error to a user-friendly error
const getUserFriendlyError = (error: any) : UserFriendlyError => {
    if (error instanceof AsyncError) {
        return UserFriendlyError(error.issues);
    }
    return UserFriendlyError("Something went wrong. Please try again.");
}
export default getUserFriendlyError;