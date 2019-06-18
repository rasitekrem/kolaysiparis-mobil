import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { isLoggedIn, setRestaurantInfo, categoryChanged } from '../actions';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

class Category extends Component {
    constructor(props) {
        super(props);
        this.selectCategory = this.selectCategory.bind(this);
    }
    selectCategory(category) {
        this.props.categoryChanged(category);
    }
    render() {
        const { cart } = this.props;
        const bottom = cart ? (
            <TouchableOpacity style={styles.bottomButton} onPress={() => Actions.cart()}>
                <Text style={styles.bottomText}>Sepete Git</Text>
            </TouchableOpacity>
        ) : null;
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <ScrollView>
                <FlatList
                    data={this.props.categories}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={styles.container} onPress={() => this.selectCategory(item)}>
                            <Text style={styles.item}> {item.name} </Text>
                            <Image style={styles.item} source={require('../img/rightarrow.png')} />
                        </TouchableOpacity> 
                    }
                />
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
     justifyContent: 'space-between',
     alignItems: 'center',
     width: width * 0.95,
     height: height * 0.1,
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#cd5c5c',
     marginTop: 10,
     padding: 5
    },
    item: {
      fontSize: 22,
      color: '#cd5c5c',
      tintColor: '#cd5c5c'
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
    }
  });

const mapStateToProps = state => {
    const { authKey } = state.auth;
    const { categories, cart } = state.user;
    return {
        authKey,
        categories,
        cart
    };
  };
  
  export default connect(mapStateToProps, { 
    isLoggedIn,
    setRestaurantInfo,
    categoryChanged
  })(Category);
