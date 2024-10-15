import { View, StyleSheet, Text, Image, StyleProp, ViewStyle } from "react-native";

interface EventioAuthPromptProps {
    title: string
    subtitle: string
    style?: StyleProp<ViewStyle>; 
}

const EventioAuthHeader = (props: EventioAuthPromptProps) => {
    return (
        <View style = {[styles.container, props.style]}>
          <Image style = {styles.appLogo} source={require('@/assets/images/appLogo.png')}  />
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
      fontFamily: 'Hind-Regular',
    },
    subtitle: {
      fontSize: 16,
      color: 'gray',
      marginBottom: 15,
      textAlign: 'center',
      fontFamily: 'Hind-Regular',

    }
  });

export default EventioAuthHeader;