import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Login from './components/Login';
import Register from './components/Register';

export default class Root extends Component {
    render() {
        return (
            <Router>
                <Scene 
                key='Root'
                >
                    <Scene
                    key='login'
                    component={Login}
                    hideNavBar
                    initial
                    />
                    <Scene
                    key='register'
                    component={Register}
                    hideNavBar
                    />
                </Scene>
            </Router>
        );
    }
}

