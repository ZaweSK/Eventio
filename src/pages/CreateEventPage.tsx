import EventioButton from "@/src/components/EventioButton";
import Input from "@/src/components/Input";
import useEventsStore from "@/src/store/useEventsStore";
import { router, useRouter } from "expo-router";
import { StatusBar, SafeAreaView, Alert, View, StyleSheet } from "react-native";
import DatePicker from "react-native-date-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import Loading from "@/src/components/Loading";

type FormFields = {
  title: string;
  description: string;
  date: string;
  time: string;
  capacity: string;
};

const CreateEventPage = () => {
  const {control,handleSubmit,setValue,formState: { errors, isSubmitting },} = useForm({
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      capacity: "",
    },
  });

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const createEvent = useEventsStore((state) => state.createEvent);

  const onSubmit = async (data: FormFields) => {
    const startsAt = `${data.date}T${data.time}`;
    const result = await createEvent(
      data.title,
      data.description,
      startsAt,
      parseInt(data.capacity)
    );
    if (result.type === "success") {
      router.back();
    } else {
      Alert.alert("Error", result.userFriendlyMessage);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <KeyboardAwareScrollView
        style={{ padding: 20 }}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <Controller
          control={control}
          name="title"
          rules={{
            required: "Title is required",
            minLength: { value: 3, message: "At least 3 characters" },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              error={errors.title?.message || null}
              placeholder="Title"
              inputValue={value}
              onInputChanged={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          rules={{
            required: "Description is required",
            minLength: { value: 6, message: "At least 6 characters" },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              error={errors.description?.message || null}
              placeholder="Description"
              inputValue={value}
              onInputChanged={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="date"
          rules={{
            required: "Date is required",
            validate: (value) => {
              const selectedDate = new Date(value);
              const today = new Date();
              today.setHours(0, 0, 0, 0); // reset to start of today for comparison
              return selectedDate > today || "Date must be in the future";
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              error={errors.date?.message || null}
              placeholder="Date"
              onFocus={() => setDatePickerOpen(true)}
              inputValue={value}
              onInputChanged={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="time"
          rules={{ required: "Time is required" }}
          render={({ field: { onChange, value } }) => (
            <Input
              error={errors.time?.message || null}
              placeholder="Time"
              onFocus={() => setTimePickerOpen(true)}
              inputValue={value}
              onInputChanged={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="capacity"
          rules={{
            required: "Capacity is required",
            pattern: { value: /^\d+$/, message: "Must be a number" },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              error={errors.capacity?.message || null}
              placeholder="Capacity"
              keyboardType="numeric"
              inputValue={value}
              onInputChanged={onChange}
            />
          )}
        />
        <View style={styles.buttonContainer}>
          <EventioButton title="CREATE" onPress={handleSubmit(onSubmit)} />
        </View>
      </KeyboardAwareScrollView>

      <DatePicker
        modal
        mode="date"
        open={datePickerOpen}
        date={new Date()}
        onConfirm={(pickedDate) => {
          setDatePickerOpen(false);
          setValue("date", pickedDate.toISOString().split("T")[0], {
            shouldValidate: true,
          }); 
        }}
        onCancel={() => setDatePickerOpen(false)}
      />

      <DatePicker
        modal
        mode="time"
        open={timePickerOpen}
        date={new Date()}
        onConfirm={(pickedTime) => {
          setTimePickerOpen(false);
          setValue(
            "time",
            pickedTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            { shouldValidate: true }
          );
        }}
        onCancel={() => setTimePickerOpen(false)}
      />
      {isSubmitting && <Loading />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  buttonContainer: {
    justifyContent: "flex-end",
    flex: 1,
  },
});

export default CreateEventPage;
