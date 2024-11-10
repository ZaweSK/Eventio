import Page from '@/src/components/Page';
import { View, StyleSheet } from 'react-native';
import Animated, { SharedTransition, SharedTransitionType, withSpring } from 'react-native-reanimated';


const transition = SharedTransition.custom((values) => {
    'df';
    return {
      height: withSpring(500),
      width: withSpring(values.targetWidth),
    };
  }).defaultTransitionType(SharedTransitionType.ANIMATION);


const EditEventScreen = () => {
    return (
        <Page>
            {/* <Animated.View  sharedTransitionTag="1" sharedTransitionStyle={transition}> 
              <View style = {{width: '90%', height: 100, backgroundColor: 'red'}}/>

           </Animated.View> */}
        </Page>
    );
};

const styles = StyleSheet.create({
    
});





export default EditEventScreen;