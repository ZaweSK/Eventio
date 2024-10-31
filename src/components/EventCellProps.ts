import { EventioEvent } from "@/src/types/EventioEvent";

interface EventCellProps {  
    event: EventioEvent;
    onPress?: () => void;
    onEventAction: () => void;
}