import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions, Image } from 'react-native';
import Button from '../commons/Button';

const { width, height } = Dimensions.get('window');

class Form extends Component{
    renderPickerButton(text){
       return (
           <View>
               <View style={styles.pickerButtonStyle}>
                    <Image source={require('../img/Add.png')} />
                </View>
                <Text style={styles.pickerTextStyle}>
                    {text}
                </Text>
           </View>
        
       );
    }
    renderSection(title){
        return (
            <View style={styles.section}>
                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{ textAlign: 'center', flex: 9 }}>{title}</Text>
                    <Image source={require('../img/ok.png')} />
                </View>
            </View>
        );
    };
    render() {
        return (
            <ImageBackground
            source={require('../img/bg.png')}
            style={{ width, height, alignItems: 'center', justifyContent: 'center' }}
            >
            <Image
            source={require('../img/logo.png')} />
            {this.renderSection('test')}
            {this.renderSection('test')}
            <View style= {styles.pickerMainViewStyle}>
                {this.renderPickerButton('test')}
                {this.renderPickerButton('test')}
            </View>

            <Button text={'test'}/>
            </ ImageBackground>

        );
    }
}
const styles = {
    section: {
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        width: width * 0.59,
        height: height * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },
    pickerButtonStyle: {
        width: width * 0.24,
        height: width * 0.24,
        borderRadius: (width * 0.24) / 2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pickerMainViewStyle: { 
        flexDirection: 'row', 
        marginTop: 20, 
        width: width * 0.59,
        justifyContent: 'space-between' 
    },
    pickerTextStyle: { 
        color: 'white', 
        width: width * 0.24, 
        textAlign: 'center', 
        marginTop: 10 
    }
};
export default Form;

