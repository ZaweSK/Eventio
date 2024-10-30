import { EventioEvent } from "@/src/store/EventioEvent";

interface EventCellProps {  
    event: EventioEvent;
    onPress?: () => void;
    onEventAction: () => void;
}