import React from "react";
import { TouchableOpacity, Image, ActionSheetIOS, Alert, StyleSheet } from "react-native";
import { router } from "expo-router";
import { EventioEvent } from "@/src/types/EventioEvent";
import { eventsApi } from "@/src/features/events/eventsApi";

interface SettingsButtonProps {
    event: EventioEvent;
    onPressed: () => void;
}

const SettingsButton = (props: SettingsButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPressed} style={styles.button}>
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