
import { StyleSheet, View, Text } from 'react-native';
export type AttendeTagStyle = 'white' | 'dark';

export interface AttendeeTagProps {
    style: AttendeTagStyle;
    text: string;
}

const AttendeeTag = (props: AttendeeTagProps) => {
    const colorStyle = props.style === 'white' ? styles.styleWhite : styles.styleDark;
    return (
        <View style={[styles.container, colorStyle]}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#72727B',
        margin: 4,
    },
    text: {
        color: '#72727B',
        fontFamily: 'Hind-Regular',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 16,
    },

    styleWhite: {
        borderWidth: 1, 
        borderColor: '#A7A7B9',
        backgroundColor: 'white',
    },

    styleDark: {
        borderWidth: 0, 
        backgroundColor: '#E4E4EA',
    }
})

export default AttendeeTag;

