import React from "react";
import { TouchableOpacity, Image, ActionSheetIOS, Alert, StyleSheet } from "react-native";
import { router } from "expo-router";
import { EventioEvent } from "@/src/types/EventioEvent";
import { eventsApi } from "@/src/features/events/eventsApi";

interface SettingsButtonProps {
    event: EventioEvent;
}

const SettingsButton = (props: SettingsButtonProps) => {
  const { mutate: deleteEvent, isPending } = eventsApi.useDeleteEventMutation();

  const onSettingsButtonPressed = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Edit Event", "Delete", "Cancel"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
        title: "Event Settings",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // Handle Edit Event
        } else if (buttonIndex === 1) {
          deleteEvent(props.event.id, {
            onSuccess: () => {
              console.log("Deleted event:", props.event.id);
              router.back();
            },
            onError: (error) => {
              console.error("Error deleting event:", error);
              Alert.alert("Error", "Failed to delete the event.");
            },
          });
        }
      }
    );
  };

  return (
    <TouchableOpacity onPress={onSettingsButtonPressed} style={styles.button}>
      <Image source={require("@/assets/images/settings.png")} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default SettingsButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "black",
  },
});