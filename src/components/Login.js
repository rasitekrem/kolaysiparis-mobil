import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, repasswordChanged, loginUser, loginFailed } from '../actions';
import { Button, Spinner } from '../commons';

const { width, height } = Dimensions.get('window');

class Login extends Component {
    login() {
        const { username, password } = this.props;

        if (username === '' || password === '') {
            this.props.loginFailed('Boş Alan Olamaz');
            return;
        }
        this.props.loginUser(username, password);
    }
    onEmailChanged(username) {
        this.props.emailChanged(username);
    }
    onPasswordChanged(password) {
        this.props.passwordChanged(password);
    }
    renderPickerButton(text) {
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
    render() {
        const { error, loading } = this.props;
        const errorMsg = error ? (
        <Text style={styles.errorStyle}>
            { error }
        </Text>
        ) : null;
        const loginButton = loading ? (
            <Spinner />
            ) : (
                <TouchableOpacity onPress={() => this.login()}>
                    <Button text={'Giriş Yap'} />
                </TouchableOpacity>
            );

        return (
            
            <ImageBackground source={require('../img/bg.png')} style={{ height, width }}>
            <KeyboardAvoidingView behavior="padding" enabled style={{ height, width, alignItems: 'center', justifyContent: 'center' }}>
            
            <Image source={require('../img/logo.png')} />
            <View style={styles.section}>
                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput
                        placeholder='Email adresiniz'
                        style={{ marginLeft: 5, flex: 1 }}
                        onChangeText={this.onEmailChanged.bind(this)}
                        value={this.props.username}
                        keyboardType="email-address"
                    />
                </View>
            </View>
            <View style={styles.section}>
                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput
                        placeholder='Parolanız'
                        style={{ marginLeft: 5, flex: 1 }}
                        onChangeText={this.onPasswordChanged.bind(this)}
                        value={this.props.password}
                        secureTextEntry
                    />
                </View>
            </View>
            { errorMsg }
            { loginButton }
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
    },
    errorStyle: {
        fontSize: 20,
        color: '#a50000',
        marginTop: 5,
        alignSelf: 'center',
        textAlign: 'center',
        borderRadius: 10,
        padding: 3,
        width: width * 0.8,
        backgroundColor: 'rgba(255, 255, 255,0.3)'
    }
};
const mapStateToProps = state => {
    const { username, password, loading, error } = state.auth;
    return {
        username,
        password,
        loading,
        error
    };
};

export default connect(mapStateToProps, { 
    emailChanged, 
    passwordChanged, 
    repasswordChanged,
    loginUser,
    loginFailed
})(Login);

