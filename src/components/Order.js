import React, { Component } from 'react';
import { 
    View, 
    Text,  
    StyleSheet, 
    Dimensions, 
    TouchableOpacity, 
    ScrollView } from 'react-native';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window');

class Order extends Component {
    render() {
        const { order } = this.props;
        console.log('order page')
        console.log(order)
        const bottom = order ? (
            <View>
                <Text style={styles.totalText}>Sipariş Tutarı: ₺ {order.totalPrice}</Text>
                <View style={styles.bottomButton}>
                    <Text style={styles.bottomText}>{order.status}</Text>
                </View>
            </View>
        ) : null;
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    {
                        this.props.order.products.map((product) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 5, height: height * 0.15, width: width * 0.95, marginTop: 10 }}>
                                    <Text style={styles.headerText}>
                                        {product.name} /  ₺ {product.price}
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={styles.counterStyle}>
                                            <Text style={styles.lareText}>x{product.count.toString()}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.headerText}>
                                        Toplam:  ₺ {product.totalPrice}
                                    </Text>
                                </View>
                        ))
                    }
                    </View>
                </ScrollView>
                {bottom}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'space-between'
    },
    item: {
      fontSize: 18,
    },
    counterStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        marginRight: 5,
        marginLeft: 5,
        borderBottomWidth: 1,
        borderRadius: 5
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 7,
        height: height * 0.05,
        width: width * 0.4,
        borderColor: '#cd5c5c',
        marginTop: 5
    },
    buttonText: {
        fontSize: 20,
        color: '#cd5c5c'
    },
    bottomButton: {
        height: height * 0.10,
        width,
        backgroundColor: '#cd5c5c',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomText: {
        fontSize: 26,
        color: '#fff',
    },
    totalText: {
        fontSize: 24,
        color: '#000',
        textAlign: 'right'
    },
    lare: { 
        borderWidth: 1, 
        borderRadius: 15, 
        width: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center' 
    },
    lareText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    }
  });
const mapStateToProps = state => {
    const { order } = state.user;
    return {
        order
    };
  };
  
  export default connect(mapStateToProps, {})(Order);