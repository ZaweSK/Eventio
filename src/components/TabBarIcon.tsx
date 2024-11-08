import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, Pressable } from 'react-native';

interface TabBarIconProps {
  image: any; // Change to any to match the expected type for Image source
  color: string;
  size: number;
};

const TabBarIcon = (props: TabBarIconProps) => {
  return (
      <Image source={props.image} style={{ width: props.size, height: props.size, tintColor: props.color }} />
  )
}

export default TabBarIcon;