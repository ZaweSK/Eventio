import React from "react"
import { View, StyleSheet } from "react-native"

const EventCellContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <View style={styles.cell}>
            {children}
        </View>
    )    
}

const styles = StyleSheet.create({
    cell: {
        padding: 20,
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 8,

        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        // Shadow for Android
        elevation: 3, // Adjust this value to increase/decrease shadow intensity
    }
})

export default EventCellContainer;