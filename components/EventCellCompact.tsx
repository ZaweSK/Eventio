import { View, Text } from "react-native";
import EventCellContainer from "./EventCellContainer";
import EventCellCoreInfo from "./EventCellCoreInfo";

const EventCellCompact = (props: EventCellProps) => {
    return (
        <EventCellContainer onPress={props.onPress}>
            <EventCellCoreInfo event={props.event} />
        </EventCellContainer>
    );
  };

export default EventCellCompact;