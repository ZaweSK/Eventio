import EventioButton from "@/src/components/EventioButton";
import Input from "@/src/components/Input";
import { StatusBar, SafeAreaView, View, StyleSheet } from "react-native";
import DatePicker from "react-native-date-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Controller } from "react-hook-form";
import Loading from "@/src/components/Loading";
import { useCreateEventScreen } from "@/src/features/events/hooks/useCreateEventsScreen";

const CreateEventScreen = () => {
  const { control, handleSubmit, setValue, errors, loading, datePickerOpen, setDatePickerOpen, timePickerOpen, setTimePickerOpen, onSubmit } = useCreateEventScreen();

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
              value={value}
              onChangeText={onChange}
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
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="date"
          rules={{
            required: "Date is required",
            validate: (value) => {
              if (!value) return "Date is required";
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return value > today || "Date must be in the future";
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              error={errors.date?.message || null}
              placeholder="Date"
              onFocus={() => setDatePickerOpen(true)}
              value={value ? value.toISOString().split("T")[0] : ""} // Display empty if no date
              onChangeText={() => {}}
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
              value={value ? value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""} // Display empty if no time
              onChangeText={() => {}}
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
              value={value}
              onChangeText={onChange}
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
          setValue("date", pickedDate, { shouldValidate: true });
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
          setValue("time", pickedTime, { shouldValidate: true });
        }}
        onCancel={() => setTimePickerOpen(false)}
      />
      {loading && <Loading />}
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

export default CreateEventScreen;