import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { logoutUser } from '../actions';
import { connect } from 'react-redux';


class Menu extends Component {
    constructor(props) {
        super(props);
        this.logoutAction = this.logoutAction.bind(this);
    }
    logoutAction() {
        this.props.logoutUser();
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
                <TouchableOpacity onPress={Actions.orders}>
                    <Text style={styles.sectionStyle}>
                        Siparişlerim
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={Actions.settings}>
                    <Text style={styles.sectionStyle}>
                        Ayarlar
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.logoutAction}>
                    <Text style={styles.sectionStyle}>
                        Çıkış Yap
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    sectionStyle: {
        marginLeft: 20,
        marginTop: 20,
        fontSize: 16,
        fontWeight: '600',
        color: '#cd5c5c'
    }
};

export default connect(null, { 
    logoutUser
  })(Menu);

