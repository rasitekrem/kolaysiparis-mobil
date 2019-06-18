import React from 'react';
import { Router, Scene, Drawer, Actions, ActionConst } from 'react-native-router-flux';
import { Dimensions } from 'react-native';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Cart from './components/Cart';
import Settings from './components/Settings';
import Menu from './components/Menu';
import Category from './components/Category';
import Order from './components/Order';
import Products from './components/Products';

const { width, height } = Dimensions.get('window');

const RouterComp = () => (
        <Router 
        navigationBarStyle={styles.navBar}
        >
            <Scene key='root' hideNavBar>
                <Scene key='auth' initial type={ActionConst.RESET}>
                    <Scene
                    key='login'
                    component={Login}
                    hideNavBar
                    initial
                    />
                    <Scene
                    key='register'
                    hideNavBar
                    component={Register}
                    />
                </Scene>
                <Scene key='main' type={ActionConst.RESET}>
                
                    <Drawer
                        key="homeDrawer"
                        contentComponent={Menu}
                        drawerPosition="left"
                        // eslint-disable-next-line global-require
                        drawerImage={require('./img/Menu.png')}
                        drawerWidth={(width / 1.5)}
                        initial
                    >
                        <Scene
                            key='home'
                            component={Home}
                            hideNavBar
                        />
                    </Drawer>
                        <Scene
                            key='settings'
                            component={Settings}
                            leftButtonImage={require('./img/back.png')}
                            onLeft={() => Actions.pop()}
                            title='Ayarlar'
                            titleStyle={{ textAlign: 'center', flex: 1, alignSelf: 'center' }}
                            renderRightButton
                        />
                </Scene>
                <Scene key='afterorder' type={ActionConst.RESET}>
                        <Scene
                            key='category'
                            component={Category}
                            title='Kategoriler'
                            titleStyle={{ textAlign: 'center', flex: 1, alignSelf: 'center' }}
                            initial
                        />
                        <Scene
                            key='products'
                            component={Products}
                            leftButtonImage={require('./img/back.png')}
                            onLeft={() => Actions.pop()}
                            title='Ürünler'
                            titleStyle={{ textAlign: 'center', flex: 1, alignSelf: 'center' }}
                            renderRightButton
                        />
                        <Scene
                            key='cart'
                            component={Cart}
                            leftButtonImage={require('./img/back.png')}
                            onLeft={() => Actions.pop()}
                            title='Sepet'
                            titleStyle={{ textAlign: 'center', flex: 1, alignSelf: 'center' }}
                            renderRightButton
                        />
                    <Drawer
                        key="orderDrawer"
                        title='Siparişim'
                        titleStyle={{ textAlign: 'center', flex: 1, alignSelf: 'center' }}
                        contentComponent={Menu}
                        drawerPosition="left"
                        // eslint-disable-next-line global-require
                        drawerImage={require('./img/Menu.png')}
                        drawerWidth={(width / 1.5)}
                        rightButtonImage={require('./img/cart.png')}
                        onRight={() => Actions.cart()}
                    >
                        <Scene
                            key='order'
                            component={Order}
                            hideNavBar
                        />
                    </Drawer>
                </Scene>
            </Scene>
        </Router>
    );
const styles = {
    navBar: {
        backgroundColor: '#cd5c5c',
        height: height * 0.07
    }
}
export default RouterComp;

