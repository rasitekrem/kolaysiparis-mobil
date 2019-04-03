import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, ImageBackground, Modal, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default class Home extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        };
      }
      componentDidMount() {
        axios.post('http://192.168.1.100:3000/api/test')
          .then(response => {
            Alert.alert(response.data.kimsalak);
          });
      }
      onSuccess(value) {
          Alert.alert(value);
      }
    render() {
        return (
            <ImageBackground source={require('../img/bg.png')} style={{ height, width }}>
                <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center'}}> 
                <TouchableOpacity style={styles.pickerButtonStyle} onPress={() => this.setState({ modalVisible: true })}>
                     <Image source={require('../img/scanner.png')} />
                 </TouchableOpacity>
                 <Text style={styles.pickerTextStyle}>
                     QR Code Tara
                 </Text>
            </View>
                <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
                <QRCodeScanner 
                onRead={(e) => this.onSuccess(e.data)}
                topContent={
                    <Text style={styles.centerText}>
                      Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
                    </Text>
                  }
                  bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                      <Text style={styles.buttonText}>OK. Got it!</Text>
                    </TouchableOpacity>
                  }
                />
              <TouchableOpacity
                onPress={() => this.setState({ modalVisible: false })}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
          </View>
        </Modal>
            </ImageBackground>
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
        marginTop: 25 
    }
};