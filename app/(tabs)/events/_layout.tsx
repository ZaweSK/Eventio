import { View, StyleSheet, useColorScheme, TouchableOpacity } from "react-native";
import ToggleButton from "@/src/components/ToggleButton";
import useEventsStore from "@/src/store/useEventsStore";
import Colors from "@/src/constants/Colors";
import { Stack } from "expo-router";
import Fonts from "@/src/constants/Fonts";
import SVG from "@/assets/svg/SVG";
import { useNavigation } from "@react-navigation/native";

// ===============================  PRIVATE ===============================
const BackButton = (onPress: () => void) => (
  <TouchableOpacity onPress={onPress}>
    <SVG.BackArrow width={24} height={24} fill="black" />
  </TouchableOpacity>
);

const HeaderRightComponent = () => {
  const cellLayout = useEventsStore((state) => state.eventsLayout);
  const setCellLayout = useEventsStore((state) => state.setEventsLayout);

  return (
    <View style={styles.headerRightContainer}>
      <ToggleButton
        isActive={cellLayout === 'default'}
        onPress={() => setCellLayout('default')}
        image={require('@/assets/images/cellsLayout_1.png')}
        style={[styles.toggleButton, { marginRight: 10 }]}
        imageStyle={[
          styles.toggleButtonImage,
          cellLayout === 'default' ? styles.toggleButtonImageActive : styles.toggleButtonImageInactive,
        ]}
      />
      <ToggleButton
        isActive={cellLayout === 'compact'}
        onPress={() => setCellLayout('compact')}
        image={require('@/assets/images/cellsLayout_2.png')}
        style={styles.toggleButton}
        imageStyle={[
          styles.toggleButtonImage,
          cellLayout === 'compact' ? styles.toggleButtonImageActive : styles.toggleButtonImageInactive,
        ]}
      />
    </View>
  );
};

const getHeaderOptions = ({
  color,
  title,
  headerLeft = () => undefined,
  headerRight = () => undefined,
}: {
  color: string;
  title: string;
  headerLeft?: () => JSX.Element | undefined,
  headerRight?: () => JSX.Element | undefined,
}) => {
  return {
    headerShown: true,
    headerTintColor: '#000',
    headerBackTitleVisible: false,
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: color,
    },
    headerTitleStyle: {
      fontSize: Fonts.size.headerTitle,
      fontFamily: Fonts.family.regular,
    },
    title,
    headerLeft: headerLeft,
    headerRight: headerRight,
  };
};

// ===============================  COMPONENT ===============================
export default function EventsTabLayout() {
  const colorScheme = useColorScheme();
  const color = colorScheme ? Colors[colorScheme].background : 'black';
  const navigation = useNavigation();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={getHeaderOptions({
          color,
          title: 'Events',
          headerRight: HeaderRightComponent,
        })}
      />

      <Stack.Screen
        name="[id]/index"
        options={getHeaderOptions({
          color,
          title: 'Event Detail',
          headerLeft: () => BackButton(() => navigation.goBack()),
        })}
      />

      <Stack.Screen
        name="[id]/edit"
        options={getHeaderOptions({
          color,
          title: 'Event Detail',
          headerLeft: () => BackButton(() => navigation.goBack()),
        })}
      />
    </Stack>
  );
}

// ===============================  STYLES ===============================
const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
  toggleButton: {
    width: 25,
    height: 25,
  },
  toggleButtonImage: {
    width: 25,
    height: 25,
    tintColor: 'black',
  },
  toggleButtonImageInactive: {
    opacity: 0.2,
  },
  toggleButtonImageActive: {
    opacity: 1,
  },
});