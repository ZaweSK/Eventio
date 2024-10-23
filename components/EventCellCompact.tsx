import { View, Text } from "react-native";
import EventCellContainer from "./EventCellContainer";
import EventCellCoreInfo from "./EventCellCoreInfo";

const EventCellCompact = ({ event } : {event: EventioEvent}) => {
    return (
        <EventCellContainer>
            <EventCellCoreInfo event={event} />
        </EventCellContainer>
    );
  };

export default EventCellCompact;