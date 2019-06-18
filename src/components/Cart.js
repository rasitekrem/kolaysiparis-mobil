import React, { Component } from 'react';
import { 
    View, 
    Text,  
    StyleSheet, 
    Dimensions, 
    TouchableOpacity, 
    ScrollView } from 'react-native';
    import { connect } from 'react-redux';
import { cartDecrase, cartIncrase, takeOrder } from '../actions';

const { width, height } = Dimensions.get('window');

class Cart extends Component {
    constructor(props) {
        super(props);
        this.decrease = this.decrease.bind(this);
        this.increase = this.increase.bind(this);
    }
    decrease(key) {
        const { authKey, cart, restaurantId } = this.props;
        this.props.cartDecrase({
            restaurantId,
            cart,
            key
        }, authKey);
        this.forceUpdate();
    }
    increase(key) {
        const { authKey, cart, restaurantId } = this.props;
        this.props.cartIncrase({
            restaurantId,
            cart,
            key
        }, authKey);
        this.forceUpdate();
    }
    takeOrder() {
        const { authKey, cart, restaurantId } = this.props;
        this.props.takeOrder({
            ...cart,
            restaurantId
        }, authKey);
    }
    render() {
        const { cart } = this.props;
        const bottom = cart ? (
            <View>
                <Text style={styles.totalText}>Sepet Tutarı: ₺ {cart.totalPrice}</Text>
                <TouchableOpacity style={styles.bottomButton} onPress={() => this.takeOrder()}>
                    <Text style={styles.bottomText}>Sipariş Ver</Text>
                </TouchableOpacity>
            </View>
        ) : null;
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    {
                        this.props.cart.products.map((product) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 5, height: height * 0.15, width: width * 0.95, marginTop: 10 }}>
                                    <Text style={styles.headerText}>
                                        {product.name} /  ₺ {product.price}
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TouchableOpacity style={styles.lare} onPress={() => this.decrease(product.key)}>
                                            <Text style={styles.lareText}> - </Text>
                                        </TouchableOpacity>
                                        <View style={styles.counterStyle}>
                                            <Text style={styles.lareText}>{product.count.toString()}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.lare} onPress={() => this.increase(product.key)}>
                                            <Text style={styles.lareText}> + </Text>
                                        </TouchableOpacity>
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
        textAlign: 'center'
    }
  });
const mapStateToProps = state => {
    const { authKey } = state.auth;
    const { products, cart, counter, table, restaurantId } = state.user;
    return {
        authKey,
        products,
        cart,
        counter,
        table,
        restaurantId
    };
  };
  
  export default connect(mapStateToProps, { 
    cartDecrase, 
    cartIncrase, 
    takeOrder 
  })(Cart);