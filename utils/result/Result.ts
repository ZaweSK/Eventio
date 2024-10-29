export type Success = {
    type: "success";
};

export type UserFriendlyError = {
    type: "error";
    message: string;
};

export type Result = Success | UserFriendlyError;

export function Success(): Result {
    return { type: "success" };
}

export function UserFriendlyError(message: string): Result {
    return { type: "error", message: message };
}