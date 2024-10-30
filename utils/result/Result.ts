export type Success = {
    type: "success";
};

export type UserFriendlyError = {
    type: "error";
    userFriendlyMessage: string;
};

export type Result = Success | UserFriendlyError;

export function Success(): Success {
    return { type: "success" };
}

export function UserFriendlyError(message: string): UserFriendlyError {
    return { type: "error", userFriendlyMessage: message };
}