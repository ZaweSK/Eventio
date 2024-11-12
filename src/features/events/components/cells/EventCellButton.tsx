import Fonts from "@/src/constants/Fonts";
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";

function ButtonStyle(style: EventAction)  {
    switch(style) {
        case 'join': return styles.joinButton;
        case 'leave':return styles.leaveButton;
        case 'edit': return styles.editButton;
    }
}

function ButtonTextStyle(style: EventAction) {
    switch(style) {
        case 'join': return styles.whiteText;
        case 'leave':return styles.whiteText;
        case 'edit': return styles.darkText;
    }
}

function ButtonText(style: EventAction) { 
    switch(style) {
        case 'join': return 'JOIN';
        case 'leave':return 'LEAVE';
        case 'edit': return 'EDIT';
    }
}

interface EventCellButtonProps {
    action: EventAction;
    style?: StyleProp<ViewStyle>; 
    onPress: () => void;
}

const EventCellButton = (props: EventCellButtonProps) => {
    const textStyle = ButtonTextStyle(props.action);
    const buttonStyle = ButtonStyle(props.action);
    const text = ButtonText(props.action);

    return(
        <TouchableOpacity style= {[styles.defaultButton, buttonStyle, props.style]} onPress= {() => {props.onPress();}}>
            <Text style= {[styles.defaultText, textStyle]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    defaultButton: {
        width: 96,
        height: 32,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    joinButton: {
        backgroundColor: '#22D486',
    },
    leaveButton: {
        backgroundColor: '#F40000',
    },
    editButton: {
        backgroundColor: '#E4E4EA',
    },
    defaultText: {
        fontFamily: Fonts.family.bold,
        textAlign: 'center',
        fontSize: 14,
    },
    whiteText: {
        color: 'white',
    },
    darkText: {
        color: Fonts.color.tertiary,
    }
})

export type EventAction = 'join' | 'leave' | 'edit';
export default EventCellButton;