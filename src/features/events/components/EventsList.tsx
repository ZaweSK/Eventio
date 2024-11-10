import { router } from "expo-router";
import { RefreshControl } from "react-native";
import { EventioEvent } from "@/src/types/EventioEvent";
import EventCellDefault from "./cells/EventCellDefault";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useEventsList } from "@/src/features/events/hooks/useEventsList";
import EventCellCompact from "@/src/features/events/components/cells/EventCellCompact";

// ================================== PRIVATE METHODS ==================================
const Cell = (item: EventioEvent, eventsLayout: string, onPress: () => void, onActionButtonPressed: () => void) => {
  switch (eventsLayout) {
    case 'default':
      return <EventCellDefault event={item} onPress={onPress} onEventAction={onActionButtonPressed} />;
    case 'compact':
      return <EventCellCompact event={item} onPress={onPress} onEventAction={onActionButtonPressed} />;
    default:
      return <EventCellDefault event={item} onPress={onPress} onEventAction={onActionButtonPressed} />; // Fallback to default layout
  }
};

// ================================== COMPONENT ==================================
const EventsList = () => {  
    const { eventsLayout, filteredEvents, refetch: refreshEvents, eventAction, isFetchingEvents } = useEventsList();

    const onCellPressed = (event: EventioEvent) => {
      router.push(`/events/${event.id}`);
    };    

    return (
        <Animated.FlatList
            data={filteredEvents ?? []}
            renderItem={({ item }) => Cell(item, eventsLayout, () => onCellPressed(item), () => {eventAction(item)})}
            keyExtractor={(event) => event.id}
            contentContainerStyle={{ padding: 20 }}
            itemLayoutAnimation={LinearTransition}
            refreshControl={
                <RefreshControl
                  refreshing={isFetchingEvents}
                  onRefresh={refreshEvents}
                  tintColor="#000" // Change the spinner color if desired
                />}
        />
    );
};

export default EventsList;