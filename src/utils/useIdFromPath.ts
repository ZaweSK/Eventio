import { useLocalSearchParams } from "expo-router";

// "events/1" => "1"
// "events" => undefined
export const useIdFromPathIfAny = () => {
    const { id } = useLocalSearchParams();
    const eventId = id ? (Array.isArray(id) ? id[0] : id) : null;
    return eventId;
}