
import { StyleSheet, View } from 'react-native';
import ToggleButton from '@/src/components/ToggleButton';
import Colors from '@/src/constants/Colors';
import useEventsStore from '@/src/store/useEventsStore';
import { TimeFilter } from '@/src/types/TimeFilter';
import Fonts from '@/src/constants/Fonts';


// ======================================== PRIVATE ====================    
function createToggleButton(thisFilter: TimeFilter, currenFilter: TimeFilter, setEventsFilter: (filter: TimeFilter) => void) {
    return (
        <ToggleButton
        text= {thisFilter.toUpperCase()}
        isActive={currenFilter === thisFilter}
        onPress={() => setEventsFilter(thisFilter)}
        style= {buttonStyles(currenFilter, thisFilter)}
        textStyle = {textStyles(currenFilter, thisFilter)}
        />
    )
}
function textStyles(currentFilter: TimeFilter, filter: TimeFilter) {
    const isActive = currentFilter === filter;
    return [toggleButton.textDefault, isActive ? toggleButton.textActive : toggleButton.textInactive];      
}

function buttonStyles(currentFilter: TimeFilter, filter: TimeFilter) {
    const isActive = currentFilter === filter;
    return [toggleButton.buttonDefault, isActive ? toggleButton.buttonActive : toggleButton.buttonInactive];      
}

// ======================================== COMPONENT  =========================
const EventsFilter = () => {
    const eventsFilter = useEventsStore(state => state.eventsFilter);
    const setEventsFilter = useEventsStore(state => state.setEventsFilter);

    return (
        <View style = {styles.container}>
         {createToggleButton('all', eventsFilter, setEventsFilter)}     
         {createToggleButton('future', eventsFilter, setEventsFilter)}     
         {createToggleButton('past', eventsFilter, setEventsFilter)}     
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        backgroundColor : Colors.light.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const toggleButton = StyleSheet.create({
    buttonDefault: {
        width: 100,
        height: 32,
        borderRadius: 4,
        marginHorizontal: 5,
    },
    buttonActive: {
        backgroundColor: '#323C46',
    },
    buttonInactive: {   
        backgroundColor: 'white',
    },
    textDefault: { 
        fontSize: 12,
        fontWeight: 'bold',
    },
    textActive: {
        color: 'white'
    },
    textInactive: {
        color: Fonts.color.tertiary
    },
})



export default EventsFilter;

