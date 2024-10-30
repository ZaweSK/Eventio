import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image } from 'react-native';

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

// export default function TabBarIcon(props: {
//     name: React.ComponentProps<typeof FontAwesome>['name'];
//     color: string;
//     fontSize: number;
//   }) {
//     console.log(props.color)


//     return <FontAwesome size={props.fontSize} style={{ marginBottom: -3 }} {...props} />;
//   }