
import { StyleSheet, View } from 'react-native';
import ToggleButton from '@/components/ToggleButton';
import { useState } from 'react';
import { TimeFilter } from '@/constants/TimeFilter';
import useRootStore from '@/store/RootStore';

function CreateToggleButton(thisFilter: TimeFilter, currenFilter: TimeFilter, setEventsFilter: (filter: TimeFilter) => void) {
    return (
        <ToggleButton
        text= {thisFilter.toUpperCase()}
        isActive={currenFilter === thisFilter}
        onPress={() => setEventsFilter(thisFilter)}
        style= {ButtonStyles(currenFilter, thisFilter)}
        textStyle = {TextStyles(currenFilter, thisFilter)}
        />
    )
}
function TextStyles(currentFilter: TimeFilter, filter: TimeFilter) {
    const isActive = currentFilter === filter;
    return [toggleButton.textDefault, isActive ? toggleButton.textActive : toggleButton.textInactive];      
}

function ButtonStyles(currentFilter: TimeFilter, filter: TimeFilter) {
    const isActive = currentFilter === filter;
    return [toggleButton.buttonDefault, isActive ? toggleButton.buttonActive : toggleButton.buttonInactive];      
}


const EventsFilter = () => {
    const eventsFilter = useRootStore(state => state.eventsFilter);
    const setEventsFilter = useRootStore(state => state.setEventsFilter);
    
    return (
        <View style = {styles.container}>
         {CreateToggleButton('all', eventsFilter, setEventsFilter)}     
         {CreateToggleButton('future', eventsFilter, setEventsFilter)}     
         {CreateToggleButton('past', eventsFilter, setEventsFilter)}     
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        backgroundColor : 'lightgrey',
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
        color: '#A7A7B9'
    },
})



export default EventsFilter;

