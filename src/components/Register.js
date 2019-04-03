/* eslint-disable global-require */
import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { Button, Spinner } from '../commons';

const { width, height } = Dimensions.get('window');

class Login extends Component {
    state = { 
        username: '', 
        password: '', 
        repassword: '',
        loading: false,
        error: '',
        checkUser: false
    };
    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    register() {
        const { username, password, repassword } = this.state;
        this.setState({
            error: '',
            loading: true
        });
        if (username === '' || password === '' || repassword === '') {
            this.setState({ error: 'Boş Alan Olamaz', loading: false });
            return;
        } else if (!this.validateEmail(username)) {
            this.setState({ error: 'Geçerli bir email adresi giriniz.', loading: false });
            return;
        } else if (password !== repassword) {
            this.setState({ error: 'Parolalar Uyuşmuyor', loading: false });
            return;
        } else if (password.length < 6) {
            this.setState({ error: 'Parola en az 6 karakterden oluşmalı', loading: false });
            return;
        }
        axios.post('http://192.168.1.101:3000/api/checkuser', { data: { email: username } })
            .then(check => {
                console.log(check.data.status);
                                    if (check.data.status === 'ok') {
                                        axios.post('http://192.168.1.101:3000/api/register',
                                        {
                                            username,
                                            password,
                                            repassword
                                        })
                                        .then(response => {
                                            if (response.data.status) {
                                                this.setState({ error: 'Hesap Oluşturuldu', loading: false });
                                                // Cookie.set("authKey", response.data.token);
                                                // let expiresIn = new Date().getTime() + +response.data.expiresIn * 60000
                                                // Cookie.set("expiresIn", expiresIn);
                                                // localStorage.setItem("authKey", response.data.token);
                                                // localStorage.setItem("expiresIn", expiresIn);
                                                // vuexContext.commit("setAuthKey", response.data.token)
                                            } else {
                                                this.setState({ error: response.data.message, loading: false });
                                                return;
                                            }
                                        });
                                    } else {
                                        this.setState({ error: 'Mail Adresi Kullanılıyor', loading: false });
                                        return;
                                    }
            });
    }
    render() {
        const { error, loading } = this.state;
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
                        onChangeText={(username) => this.setState({ username })}
                        value={this.state.username}
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
            <View style={styles.section}>
                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput
                        placeholder='Yeniden Parolanız'
                        style={{ marginLeft: 5, flex: 1 }}
                        onChangeText={(repassword) => this.setState({ repassword })}
                        value={this.state.repassword}
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
export default Login;

