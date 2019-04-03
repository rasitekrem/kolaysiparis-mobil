import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

class Button extends Component{
    render() {
        return (
            <View style={ styles.buttonStyle}>  
                <Text style={{ color: 'white' }}>{this.props.text}</Text>
            </View>

        );
    }
}
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
export { Button };

