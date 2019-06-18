import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, ImageBackground, Modal, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { connect } from 'react-redux';
import { isLoggedIn, setRestaurantInfo, changeModalVisible } from '../actions';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

class Home extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.onSuccess = this.onSuccess.bind(this);
      }
      componentDidMount() {
        if (this.props.fullLoading) {
          this.props.isLoggedIn();
        }
      }
      onSuccess(value) {
          const token = this.props.authKey;
          this.props.setRestaurantInfo(value, token);
      }
    render() {
        return (
            <ImageBackground source={require('../img/bg.png')} style={{ height, width }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
                <TouchableOpacity style={styles.pickerButtonStyle} onPress={() => this.props.changeModalVisible(true)}>
                     <Image source={require('../img/scanner.png')} />
                 </TouchableOpacity>
                 <Text style={styles.pickerTextStyle}>
                     QR Code Tara
                 </Text>
            </View>
                <Modal
                  style={{ height, width }}
                  animationType="slide"
                  transparent={false}
                  visible={this.props.modalVisible}
                  onRequestClose={() => {
                    this.props.changeModalVisible(false);
                  }}
                >
                  <QRCodeScanner 
                    onRead={(e) => {
                      this.props.changeModalVisible(false);
                      this.onSuccess(e.data);
                    }}
                    topContent={
                      <Text style={styles.centerText}>
                        Lütfen masadaki QR kodu okutun.
                      </Text>
                    }
                    bottomContent={
                      <TouchableOpacity 
                        style={styles.buttonTouchable} 
                        onPress={() => this.props.changeModalVisible(false)}
                      >
                        <Text style={styles.buttonText}>Kapat</Text>
                      </TouchableOpacity>
                    }
                  />
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
    },
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777',
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
      marginTop: 15,
      padding: 16,
    },
};
const mapStateToProps = state => {
  const { authKey } = state.auth;
  const { modalVisible } = state.user;
  return {
      authKey,
      modalVisible
  };
};

export default connect(mapStateToProps, { 
  isLoggedIn,
  setRestaurantInfo,
  changeModalVisible
})(Home);
