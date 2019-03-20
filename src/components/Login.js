import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../commons/Button';

const { width, height } = Dimensions.get('window');

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = { mail: '', password: '' };
      }
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
                    <TextInput
                        placeholder={title}
                        style={{ marginLeft: 5, flex: 1 }}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                        keyboardType="email-address"
                    />
                </View>
            </View>
        );
    };
    render() {
        return (
            
            <ImageBackground source={require('../img/bg.png')} style={{ height, width }}>
            <KeyboardAvoidingView behavior="padding" enabled style={{ height, width, alignItems: 'center', justifyContent: 'center' }}>
            
            <Image source={require('../img/logo.png')} />
            <View style={styles.section}>
                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput
                        placeholder='Email adresiniz'
                        style={{ marginLeft: 5, flex: 1 }}
                        onChangeText={(mail) => this.setState({ mail })}
                        value={this.state.mail}
                        keyboardType="email-address"
                    />
                </View>
            </View>
            <View style={styles.section}>
                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput
                        placeholder='Parolanız'
                        style={{ marginLeft: 5, flex: 1 }}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        secureTextEntry
                    />
                </View>
            </View>
            <TouchableOpacity >
                <Button text={'Giriş Yap'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.register()}>
                <Text style={{ marginTop: 5, color: 'white', fontSize: 15 }}>Yeni Hesap Oluşturun </Text>
            </TouchableOpacity>  
            </KeyboardAvoidingView>
            </ImageBackground>   

        );
    }
}
const styles = {
    section: {
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        width: width * 0.8,
        height: height * 0.07,
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
export default Login;

