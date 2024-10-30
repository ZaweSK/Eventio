import { View, Text, StyleSheet } from "react-native";
import EventCellContainer from "./EventCellContainer";
import EventCellCoreInfo from "./EventCellCoreInfo";
import EventCellButton from "./EventCellButton";
import getEventButtonAction from "@/src/utils/getEventAction";

const EventCellCompact = (props: EventCellProps) => {
const buttonAction = getEventButtonAction(props.event);

  return (
    <EventCellContainer onPress={props.onPress}>
      <EventCellCoreInfo event={props.event} />
      {buttonAction !== null && (
        <EventCellButton
          style={styles.cellButton}
          action={buttonAction}
          onPress={() => {
            props.onEventAction();
          }}
        />
      )}
    </EventCellContainer>
  );
};

const styles = StyleSheet.create({
  cellButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
});

export default EventCellCompact;
