import { storage } from "@/storage/storage";
import { AsyncError } from "@/utils/result/AsyncError";
import { Result, UserFriendlyError } from "@/utils/result/Result";

// Converts any error to a user-friendly error
const getUserFriendlyError = (error: any) : Result => {
    if (error instanceof AsyncError) {
        return UserFriendlyError(error.issues);
    }

    return UserFriendlyError("Something went wrong. Please try again.");
}
export default getUserFriendlyError;