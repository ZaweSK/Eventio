import { View, ActivityIndicator } from 'react-native';

const Loading = () => {
    return (
        <View style = {{position: 'absolute', top:0, bottom:0, left: 0, right: 0,  justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size= 'large'/>
      </View>
    );
};

export default Loading;