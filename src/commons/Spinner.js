import React from 'react';
import { ActivityIndicator, View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Spinner = () => {
    return (
        <View style={styles.buttonStyle}>
            <ActivityIndicator />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        width: width * 0.8,
        height: height * 0.07,
        backgroundColor: '#003366',
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export { Spinner }
