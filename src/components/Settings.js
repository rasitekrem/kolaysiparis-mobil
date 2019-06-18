import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    Dimensions, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Button, Spinner } from '../commons';
import { 
    oldpasswordChanged, 
    newpasswordChanged, 
    renewpasswordChanged,
    passwordChange } from '../actions';

const { width, height } = Dimensions.get('window');

class Settings extends Component {
    // eslint-disable-next-line react/sort-comp
    save() {
        const { oldpassword, newpassword, renewpassword, authKey } = this.props;
        console.log(renewpassword)
        this.props.passwordChange(oldpassword, newpassword, renewpassword, authKey);
    }
    onOldpasswordChanged(oldpassword) {
        this.props.oldpasswordChanged(oldpassword);
    }
    onNewpasswordChanged(newpassword) {
        this.props.newpasswordChanged(newpassword);
    }
    onRenewpasswordChanged(renewpassword) {
        this.props.renewpasswordChanged(renewpassword);
    }
    render() {
        const { error, loading } = this.props;
        const errorMsg = error ? (
        <Text style={styles.errorStyle}>
            { error }
        </Text>
        ) : null;
        const saveButton = loading ? (
            <Spinner />
            ) : (
                <TouchableOpacity onPress={() => this.save()}>
                    <Button text={'Kaydet'} />
                </TouchableOpacity>
            );
        return (
            <ImageBackground source={require('../img/bg.png')} style={{ height, width }}>
            <KeyboardAvoidingView behavior="padding" enabled style={{ height, width, alignItems: 'center', justifyContent: 'center' }}>
            
            <View style={styles.section}>
                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput
                        placeholder='Eski Parolanız'
                        style={{ marginLeft: 5, flex: 1 }}
                        onChangeText={this.onOldpasswordChanged.bind(this)}
                        value={this.props.oldpassword}
                        secureTextEntry
                    />
                </View>
            </View>
            <View style={styles.section}>
                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput
                        placeholder='Yeni Parolanız'
                        style={{ marginLeft: 5, flex: 1 }}
                        onChangeText={this.onNewpasswordChanged.bind(this)}
                        value={this.props.newpassword}
                        secureTextEntry
                    />
                </View>
            </View>
            <View style={styles.section}>
                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput
                        placeholder='Yeni Parolanız Yeniden'
                        style={{ marginLeft: 5, flex: 1 }}
                        onChangeText={this.onRenewpasswordChanged.bind(this)}
                        value={this.props.renewpassword}
                        secureTextEntry
                    />
                </View>
            </View>
            { errorMsg }
            { saveButton } 
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
}
const mapStateToProps = state => {
    const { oldpassword, newpassword, renewpassword, loading, error, authKey } = state.auth;
    return {
        oldpassword,
        newpassword,
        renewpassword,
        loading,
        error,
        authKey
    };
};

export default connect(mapStateToProps, { 
    oldpasswordChanged, 
    newpasswordChanged, 
    renewpasswordChanged,
    passwordChange
})(Settings);
