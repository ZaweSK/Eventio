import { View, Text, StyleSheet } from "react-native";

import getEventButtonAction from "@/src/utils/functions/getEventAction";
import { EventCellProps } from "@/src/features/events/components/cells/EventCellProps";
import EventCellContainer from "@/src/features/events/components/cells/EventCellContainer";
import EventCellCoreInfo from "@/src/features/events/components/cells/EventCellCoreInfo";
import EventCellButton from "@/src/features/events/components/cells/EventCellButton";

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
