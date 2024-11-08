import { SVGImage } from '@/assets/svg/SVGImage';
import { SVGImageName } from '@/assets/svg/SVGImageName';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, Pressable } from 'react-native';

interface TabBarIconProps {
  svgImage: SVGImageName; // Change to any to match the expected type for Image source
  color: string;
  size: number;
};

const TabBarIcon = (props: TabBarIconProps) => {
  return (
      // <Image source={props.svgImage} style={{ width: props.size, height: props.size, tintColor: props.color }} />

      <SVGImage name = {props.svgImage} width={props.size} height={props.size} fill={props.color} />

  )
}

export default TabBarIcon;