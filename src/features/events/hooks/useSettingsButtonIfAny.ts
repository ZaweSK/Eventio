// import { EventioEvent } from "@/src/types/EventioEvent";
// import { useNavigation } from "expo-router";
// import { useEffect } from "react";
// import { eventsApi } from "@/src/features/events/eventsApi";
// import getEventOwnership from "@/src/utils/getEventOwnership";

// export const useSettingsButtonIfAny = (event: EventioEvent | undefined) => {
//     const { mutate: deleteEvent, isPending: isDeleting, isError } = eventsApi.useDeleteEventMutation();
//     const navigation = useNavigation();
  
//     useEffect(() => {
//       if (event) {
//         const ownership = getEventOwnership(event);
//         navigation.setOptions({
//           headerRight: () =>  
//             ownership === "owned" ? (  
//                 <SettingsButton event= {event!} />
//             ) : null,
//         });
//       }
//     }, [event]);
  
//     return { isDeleting, isError };
//   };