import { EventioApiError } from "@/src/utils/result/EventioApiError";

export function getAlertMessage(error: any): string {
    if (error instanceof EventioApiError) {
        return error.fullDescription;
      } else {
        return error.message;
      }
}