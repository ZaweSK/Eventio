import { eventsApi } from "@/src/features/events/eventsApi";
import { getAlertMessage } from "@/src/utils/functions/getAlertMessage";
import { getCombinedDate } from "@/src/utils/functions/getCombinedDate";
import { router } from "expo-router";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { Alert } from "react-native";

type FormFields = {
    title: string;
    description: string;
    date: Date | null;
    time: Date | null;
    capacity: string;
};

// Represents custom hook for CreadeEventScreen
export const useCreateEventScreen = () => {
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [timePickerOpen, setTimePickerOpen] = useState(false);
    const { mutate: createEvent, isPending: loading, error } = eventsApi.useCreateEventMutation();
    const { control, handleSubmit, setValue, setFocus, formState: { errors, isSubmitting } } = useForm<FormFields>({
        defaultValues: {
            title: "",
            description: "",
            date: null,
            time: null,
            capacity: "",
        },
    });

    const onSubmit = async (data: FormFields) => {
        if (!data.date || !data.time) 
            return;
        
        const capacity = parseInt(data.capacity);
        const startsAt = getCombinedDate(data.date, data.time);
        createEvent({ title: data.title, desc: data.description, startsAt: startsAt, capacity }, {
            onSuccess: () => {
                router.back();
                Alert.alert("Success", `Event ${data.title} created successfully.`);
            },
            onError: (error) => {
                Alert.alert("Error", getAlertMessage(error));
            },
        });
    };

    return {
        control,
        handleSubmit,
        setValue,
        errors,
        loading,
        datePickerOpen,
        setDatePickerOpen,
        timePickerOpen,
        setTimePickerOpen,
        onSubmit,
        error,
        setFocus,
    };
}