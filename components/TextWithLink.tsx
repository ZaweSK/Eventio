import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

interface TextWithLinkProps {
    text: string;
    linkText: string;
    onPress: () => void;
}

const TextWithLink = (props: TextWithLinkProps) => {
    return (
        <View style = {styles.container}> 
            <Text style = {styles.text}>{props.text}</Text>
            <TouchableOpacity onPress={props.onPress}>
                <Text style = {styles.linkText}> {props.linkText}</Text>
            </ TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#72727B',
        fontSize: 16,
        fontFamily: 'Hind-Regular',

        
    },
    linkText: {
        color: '#22D486',
        fontSize: 16,
        fontFamily: 'Hind-Regular',

    },
});

export default TextWithLink;