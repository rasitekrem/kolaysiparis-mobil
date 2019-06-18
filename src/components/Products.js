import React, { Component } from 'react';
import { 
    View, 
    Text,  
    StyleSheet, 
    Dimensions, 
    TouchableOpacity, 
    ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { isLoggedIn, setRestaurantInfo, countDecrase, countIncrase, addToCart } from '../actions';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

class Products extends Component {
    constructor(props) {
        super(props);
        this.decrease = this.decrease.bind(this);
        this.increase = this.increase.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }
    decrease(key) {
        this.props.countDecrase(key);
        this.forceUpdate();
    }
    increase(key) {
        this.props.countIncrase(key);
        this.forceUpdate();
    }
    addToCart(product) {
        const { counter, table, authKey, restaurantId } = this.props;
        const data = {
            product: {
                ...product,
                count: counter[product.key].count
            },
            table,
            restaurantId
        };
        this.props.addToCart(data, authKey);
        this.forceUpdate();
    }
    render() {
        const { cart, counter } = this.props;
        const bottom = cart ? (
            <TouchableOpacity style={styles.bottomButton} onPress={() => Actions.cart()}>
                <Text style={styles.bottomText}>Sepete Git</Text>
            </TouchableOpacity>
        ) : null;
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    {
                        this.props.products.map((product) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 5, height: height * 0.15, width: width * 0.95, marginTop: 10 }}>
                                    <Text style={styles.headerText}>
                                        {product.name} /  ₺ {product.price}
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TouchableOpacity style={styles.lare} onPress={() => this.decrease(product.key)}>
                                            <Text style={styles.lareText}> - </Text>
                                        </TouchableOpacity>
                                        <View style={styles.counterStyle}>
                                            {counter[product.key] ? (
                                                <Text style={styles.lareText}>{counter[product.key].count.toString()}</Text>
                                            ) : (
                                                <Text style={styles.lareText}>0</Text>
                                            )}
                                        </View>
                                        <TouchableOpacity style={styles.lare} onPress={() => this.increase(product.key)}>
                                            <Text style={styles.lareText}> + </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={styles.button} onPress={() => this.addToCart(product)}>
                                        <Text style={styles.buttonText}>Ekle</Text>
                                    </TouchableOpacity>
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
    isLoggedIn,
    setRestaurantInfo,
    countDecrase,
    countIncrase,
    addToCart
  })(Products);
