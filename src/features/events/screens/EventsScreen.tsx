import { useEventsScreen } from "@/src/features/events/hooks/useEventsScreen";
import EventsFilter from "@/src/features/events/components/EventsFilter";
import EventsList from "@/src/features/events/components/EventsList";
import Loading from "@/src/components/Loading";
import Page from "@/src/components/Page";
import useLoadingStore from "@/src/store/LoadingStore";

const EventsScreen = () => {
  const eventsScreenLoading = useLoadingStore(state => state.eventsScreenLoading);
    return (
        <Page >
            <EventsFilter/>
            <EventsList />
            {eventsScreenLoading && <Loading />}  
        </Page>
    )
}

export default EventsScreen;