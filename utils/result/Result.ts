export type Success = {
    type: "success";
};

export type UserFriendlyError = {
    type: "error";
    message: string;
};

export type Result = Success | UserFriendlyError;

export function Success(): Success {
    return { type: "success" };
}

export function UserFriendlyError(message: string): UserFriendlyError {
    return { type: "error", message: message };
}