import { api } from "@/src/api/apiClient";
import { EventioEvent } from "@/src/types/EventioEvent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useGetAllEventsQuery = () => {
    const { data: events, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const { data } = await api.get<EventioEvent[]>('/events');
            return data;
        }
    });
    return { events, isLoading, isError, error, refetch };
}

const useGetEventQuery = (id: string) => {
    const { data: event, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['events', id],
        queryFn: async () => {
            const { data } = await api.get<EventioEvent>(`/events/${id}`);
            return data;
        },
        enabled: !!id
    });
    return { event, isLoading, isError, error, refetch };
};

const useCreateEventMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ['createEvent'],
      mutationFn: async ({ title, desc, startsAt, capacity }: {
        title: string,
        desc: string,
        startsAt: string,
        capacity: number
      }) => {
        const data = {
          title: title,
          description: desc,
          startsAt: startsAt,
          capacity: capacity
        };
        
        const { data: createdEvent } = await api.post('/events', data);
        return createdEvent;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['events'] })
    }
    });
  };

const useJoinEventMutation = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['joinEvent'],
        mutationFn: async (id: string) => {
            const { data: updatedEvent } = await api.post<EventioEvent>(`/events/${id}/attendees/me`);
            return updatedEvent;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] })
        }
    });
    return mutation;
};

const useLeaveEventMutation = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['leaveEvent'],
        mutationFn: async (id: string) => {
            const { data: updatedEvent } = await api.delete<EventioEvent>(`/events/${id}/attendees/me`);
            return updatedEvent;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
        }
    });
    return mutation;
};

const useDeleteEventMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['deleteEvent'],
        mutationFn: async (id: string) => {
            const response = await api.delete(`/events/${id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
        }
    });
};

export const eventsApi = {
    useGetEventQuery,
    useGetAllEventsQuery,
    useJoinEventMutation,
    useLeaveEventMutation,
    useDeleteEventMutation,
    useCreateEventMutation,
}