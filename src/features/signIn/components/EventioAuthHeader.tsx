import { SVGImage } from "@/assets/svg/SVGImage";
import Fonts from "@/src/constants/Fonts";
import { View, StyleSheet, Text, Image, StyleProp, ViewStyle } from "react-native";

interface EventioAuthPromptProps {
    title: string
    subtitle: string
    style?: StyleProp<ViewStyle>; 
}

const EventioAuthHeader = (props: EventioAuthPromptProps) => {
    return (
        <View style = {[styles.container, props.style]}>
          <SVGImage name="Eventio" width={40} height={40} fill = "black" style = {styles.appLogo}/>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subtitle}>{props.subtitle}</Text>
        </ View>
    )
}

const styles = StyleSheet.create({
  container : {
    justifyContent: 'center',
    alignItems: 'center',
  },
    appLogo: {
      width: 40,
      height: 40,
      marginBottom: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5, 
      textAlign: 'center',
      color: Fonts.color.primary,
      fontFamily: Fonts.family.regular
    },
    subtitle: {
      fontSize: 16,
      color: Fonts.color.secondary,
      marginBottom: 15,
      textAlign: 'center',
      fontFamily: Fonts.family.regular

    }
  });

export default EventioAuthHeader;