import { EventioApiError } from "@/src/utils/result/EventioApiError";

export function is404(error: any): boolean {
    return error instanceof EventioApiError && error.status === 404;
}