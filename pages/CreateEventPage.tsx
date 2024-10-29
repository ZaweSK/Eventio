import EventioButton from "@/components/EventioButton";
import Input from "@/components/Input";
import Colors from "@/constants/Colors";
import useEventsStore from "@/store/EventsStore";
import { router, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View, StatusBar, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import DatePicker from "react-native-date-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

// ================================ PRIVATE HOOKS ================================
function useEventInfo() {
  const [triedToCreateEvent, setTriedToCreateEvent] = useState(false);

  const [eventInfo, setEventInfo] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    capacity: "",
  });

  const [errors, setErrors] = useState({
    titleInputError: false,
    descInputError: false,
    dateInputError: false,
    timeInputError: false,
    capacityInputError: false,
  });

  useEffect(() => {
    if (triedToCreateEvent) {
      validateEventInfo();
    }
  }, [eventInfo]);

  const validateEventInfo = () => {
    const newErrors = {
      titleInputError: eventInfo.title.length < 3 ,
      descInputError: eventInfo.description.length < 6,
      dateInputError: eventInfo.date.length === 0,
      timeInputError: eventInfo.time.length === 0,
      capacityInputError: eventInfo.capacity.length === 0,
    };

    console.log("New errors:", newErrors);
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleInputChange = (propertyName: string, propertyValue: string) => {
    setEventInfo((prev) => ({ ...prev, [propertyName]: propertyValue }));
  };

  return {eventInfo, errors, validateEventInfo, handleInputChange, setTriedToCreateEvent};
}

function useDateTimeInfo(mode: "date" | "time") {
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [formattedDateTime, setFormattedDateTime] = useState<string | null>( null);

  useEffect(() => {
    if (dateTime) {
      console.log("date", dateTime);
      formatDateTime(dateTime);
    }
  }, [dateTime]);

  const formatDateTime = (date: Date) => {
    const formatted =
      mode === "date"
        ? date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : date.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
    setFormattedDateTime(formatted);
  };

  return {dateTime, setDateTime, pickerOpen,setPickerOpen, formattedDateTime};
}
// ============================= PRIVATE METHODS =============================
function combineDateAndTime(date: Date, time: Date): string {
  const combined = new Date(date);
  combined.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
  return combined.toISOString();
}

// ================================ COMPONENT ================================
const CreateEventPage = () => {
  StatusBar.setBarStyle("light-content");
  const {
    eventInfo,
    errors,
    validateEventInfo,
    handleInputChange,
    setTriedToCreateEvent,
  } = useEventInfo();

  const {
    dateTime: date,
    setDateTime: setDate,
    pickerOpen: datePickerOpen,
    setPickerOpen: setDatePickerOpen,
    formattedDateTime: formattedDate,
  } = useDateTimeInfo("date");

  const {
    dateTime: time,
    setDateTime: setTime,
    pickerOpen: timePickerOpen,
    setPickerOpen: setTimePickerOpen,
    formattedDateTime: formattedTime,
  } = useDateTimeInfo("time");

  const loading = useEventsStore((state) => state.asyncOpeationInProgress);

  useEffect(() => {
    if (formattedDate) {
      console.log("here time", formattedTime);
      handleInputChange("date", formattedDate!);
    }
  }, [formattedDate]);
  useEffect(() => {
    if (formattedTime) {
      handleInputChange("time", formattedTime!);
    }
  }, [formattedTime]);

  const createEvent = useEventsStore((state) => state.createEvent);
  const tryToCreateEvent = async () => {
    setTriedToCreateEvent(true);
    if (validateEventInfo()) {



      try {
      
          const startsAt = combineDateAndTime(date!, time!);
          const result = await createEvent(eventInfo.title, eventInfo.description, startsAt, parseInt(eventInfo.capacity));
          if (result.type == "success") {
            router.back();
          } else {
            console.log("Error creating event:", result.message);
            Alert.alert("Error", result.message);
          }
        } catch (error) {
          if (error instanceof AsyncError) {
            console.log("AsyncError caught:", error);
            Alert.alert("Error", error.message);

        } else {
            console.log("Unexpected error:", error);
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
        }
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        id="ScrollableContent"
        bottomOffset={50}
        style={{ padding: 20 }}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <Input
          error={errors.titleInputError ? "* (at least 3 characters)" : null}
          placeholder="Title"
          inputValue={eventInfo.title}
          onInputChanged={(input) => handleInputChange("title", input)}
        />
        <Input
          error={errors.descInputError ? "* (at least 6 characters)" : null}
          placeholder="Description"
          inputValue={eventInfo.description}
          onInputChanged={(input) => handleInputChange("description", input)}
        />
        <Input
          error={errors.dateInputError ? "*" : null}
          placeholder="Date"
          onFocus={() => setDatePickerOpen(true)}
          inputValue={eventInfo.date}
          onInputChanged={(input) => handleInputChange("date", input)}
        />
        <Input
          error={errors.timeInputError ? "*" : null}
          placeholder="Time"
          onFocus={() => setTimePickerOpen(true)}
          inputValue={eventInfo.time}
          onInputChanged={(input) => handleInputChange("time", input)}
        />
        <Input
          error={errors.capacityInputError ? "*" : null}
          placeholder="Capacity"
          keyboardType="numeric"
          inputValue={eventInfo.capacity}
          onInputChanged={(input) => handleInputChange("capacity", input)}
        />
        <View id="buttonContainer" style={styles.buttonContainer}>
          <EventioButton title="CREATE" onPress={tryToCreateEvent} />
        </View>
      </KeyboardAwareScrollView>

      <DatePicker
        modal
        mode="date"
        open={datePickerOpen}
        date={date || new Date()}
        onDateChange={setDate}
        onConfirm={(pickedDate) => {
          console.log("Picked date:", pickedDate);
          
          setDatePickerOpen(false);
          setDate(pickedDate);
          console.log("confirmed");
          
        }}
        onCancel={() => {
          setDatePickerOpen(false);
        }}
      />

      <DatePicker
        modal
        mode="time"
        open={timePickerOpen}
        date={time || new Date()}
        onDateChange={setTime}
        onConfirm={(pickedTime) => {
          setTimePickerOpen(false);
          setTime(pickedTime);
        }}
        onCancel={() => {
          setTimePickerOpen(false);
        }}
      />

{loading && (
      <View style = {{position: 'absolute', top:0, bottom:0, left: 0, right: 0,  justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size= 'large'/>
    </View>)}
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
