import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";

function ButtonStyle(style: EventCellButtonAction)  {
    switch(style) {
        case 'join': return styles.joinButton;
        case 'leave':return styles.leaveButton;
        case 'edit': return styles.editButton;
    }
}

function ButtonTextStyle(style: EventCellButtonAction) {
    switch(style) {
        case 'join': return styles.whiteText;
        case 'leave':return styles.whiteText;
        case 'edit': return styles.darkText;
    }
}

function ButtonText(style: EventCellButtonAction) { 
    switch(style) {
        case 'join': return 'JOIN';
        case 'leave':return 'LEAVE';
        case 'edit': return 'EDIT';
    }
}

interface EventCellButtonProps {
    action: EventCellButtonAction;
    style?: StyleProp<ViewStyle>; 
}

const EventCellButton = (props: EventCellButtonProps) => {
    const textStyle = ButtonTextStyle(props.action);
    const buttonStyle = ButtonStyle(props.action);
    const text = ButtonText(props.action);

    return(
        <TouchableOpacity style= {[styles.defaultButton, buttonStyle, props.style]}>
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
        fontFamily: 'Hind-Bold',
        textAlign: 'center',
        fontSize: 14,
    },
    whiteText: {
        color: 'white',
    },
    darkText: {
        color: '#A7A7B9',
    }
})

export type EventCellButtonAction = 'join' | 'leave' | 'edit';
export default EventCellButton;