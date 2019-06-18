/* eslint-disable global-require */
import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Spinner, url } from '../commons';
import { emailChanged, passwordChanged, repasswordChanged, registerUser, registerFailed } from '../actions';

const { width, height } = Dimensions.get('window');

class Register extends Component {

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    register() {
        const { username, password, repassword } = this.props;
        if (username === '' || password === '' || repassword === '') {
            this.props.registerFailed('Boş Alan Olamaz');
            return;
        } else if (!this.validateEmail(username)) {
            this.props.registerFailed('Geçerli bir email adresi giriniz.');
            return;
        } else if (password !== repassword) {
            this.props.registerFailed('Parolalar Uyuşmuyor');
            return;
        } else if (password.length < 6) {
            this.props.registerFailed('Parola en az 6 karakterden oluşmalı');
            return;
        }
        axios.post(`${url}/checkuser`, { data: { email: username } })
            .then(check => {
                if (check.data.status === 'ok') {
                    this.props.registerUser(username, password, repassword);
                } else {
                    this.props.registerFailed('Mail Adresi Kullanılıyor');
                    return;
                }
            })
            .catch(() => {
                this.props.registerFailed('Bir hata meydana geldi, bağlantınızı kontrol ediniz.');
            });
    }
    onEmailChanged(username) {
        this.props.emailChanged(username);
    }
    onPasswordChanged(password) {
        this.props.passwordChanged(password);
    }
    onRepasswordChanged(repassword) {
        this.props.repasswordChanged(repassword);
    }
    render() {
        const { error, loading } = this.props;
        const errorMsg = error ? (
        <Text style={styles.errorStyle}>
            { error }
        </Text>
        ) : null;
        const registerButton = loading ? (
            <Spinner />
            ) : (
                <TouchableOpacity onPress={() => this.register()}>
                    <Button text={'Kayıt Ol'} />
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
            <View style={styles.section}>
                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput
                        placeholder='Yeniden Parolanız'
                        style={{ marginLeft: 5, flex: 1 }}
                        onChangeText={this.onRepasswordChanged.bind(this)}
                        value={this.props.repassword}
                        secureTextEntry
                    />
                </View>
            </View>
            { errorMsg }
            { registerButton }
            <TouchableOpacity onPress={() => Actions.login()}>
                <Text style={{ marginTop: 5, color: 'white', fontSize: 15 }}>Hesabınız var mı?</Text>
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

const mapStateToProps = state => {
    const { username, password, repassword, loading, error } = state.auth;
    return {
        username,
        password,
        repassword,
        loading,
        error
    };
};

export default connect(mapStateToProps, { 
    emailChanged, 
    passwordChanged, 
    repasswordChanged,
    registerUser,
    registerFailed
})(Register);

