import Colors from '@/src/constants/Colors';
import { ReactNode } from 'react';
import { useColorScheme, View } from 'react-native';

type PageProps = {
    children?: ReactNode;
};

const Page: React.FC<PageProps> = ({ children }) => {
    const colorScheme = useColorScheme();
    const color = Colors[colorScheme ?? 'light'].background;
    return (
        <View style = {{flex: 1, backgroundColor: color}} >
            {children}
        </View>
    )
}

export default Page;