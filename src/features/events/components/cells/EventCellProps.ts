import { EventioEvent } from "@/src/types/EventioEvent";

export interface EventCellProps {  
    event: EventioEvent;
    onPress?: () => void;
    onEventAction: () => void;
    test?: string
}