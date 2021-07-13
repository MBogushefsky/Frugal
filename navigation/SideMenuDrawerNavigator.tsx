import * as React from 'react';
import { Button, View, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import SideMenuDrawerButton from './SideMenuDrawerButton';
import { StyleSheet } from 'react-native';
import { SText } from '../components/StyledComponents';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import LinkedBankAccountsScreen from '../screens/LinkedBankAccountsScreen';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../redux/Reducers';
import RegisterRestInterceptor from '../interceptors/RestInterceptor';
import CurrentUserData from '../models/CurrentUserData';

const HomeScreenStack = createStackNavigator();

function HomeScreenNavigator({ navigation }: any) {
  return (
    <HomeScreenStack.Navigator>
      <HomeScreenStack.Screen 
        options={{ headerTitle: "Home", headerLeft: () => (SideMenuDrawerButton(navigation)) }} 
        name="Home" 
        component={HomeScreen} />
    </HomeScreenStack.Navigator>
  );
}

function StatsScreen({ navigation }: any) {
  return (
    <HomeScreenStack.Navigator>
      <HomeScreenStack.Screen 
        options={{ headerTitle: "Stats", headerLeft: () => (SideMenuDrawerButton(navigation)) }} 
        name="Stats" 
        component={HomeScreen} />
    </HomeScreenStack.Navigator>
  );
}

const LinkedBankAccountsScreenStack = createStackNavigator();

function LinkedBankAccountsScreenNavigator({ navigation }: any) {
    return (
        <LinkedBankAccountsScreenStack.Navigator>
            <LinkedBankAccountsScreenStack.Screen 
                options={{ headerTitle: "Linked Bank Accounts", headerLeft: () => (SideMenuDrawerButton(navigation)) }} 
                name="Linked Bank Accounts" 
                component={LinkedBankAccountsScreen} />
        </LinkedBankAccountsScreenStack.Navigator>
    );
}

function CustomDrawerContent(props: any) {
    const { colors } = useTheme();
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
                <View style={styles.viewLogo}>
                    <Image style={styles.logo} source={require('../assets/images/leaf-icon-small.png')}/>
                </View>
                <View style={styles.viewTitle}>
                    <SText style={styles.title}>Frugal</SText>
                </View>
            </View>
            <View style={styles.separator}/>
            <DrawerItemList {...props} />
            <View style={styles.separator}/>
            <DrawerItem
                label="Log Out"
                icon={({ focused, size }) => <Ionicons name="log-out-outline" size={size} 
                    style={[focused ? { color: colors.primary } : { color: colors.backdrop }, styles.drawerIcon]}/>}
                onPress={() => {
                    AsyncStorage.removeItem("currentUser").then(() => {
                        props.navigation.dispatch(
                            CommonActions.reset({
                              routes: [{ name: 'Login' }]
                            })
                        );
                    });
                }}
            />
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

export default function SideMenuDrawerNavigator() {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.currentUser);
    const [isStorageLoaded, setIsStorageLoaded] = React.useState(false);

    if (currentUser != null) {
        RegisterRestInterceptor(currentUser.Id);
    }
    else {
        AsyncStorage.getItem('currentUser').then(
            (value: any) => {
                if (!isStorageLoaded) {
                    let valueJson = JSON.parse(value) as CurrentUserData;
                    dispatch(setCurrentUser(valueJson));
                    setIsStorageLoaded(true);
                    if (value != null) {
                        RegisterRestInterceptor((valueJson as CurrentUserData).Id);
                    }
                }
            }
        );
    }
    
    if (currentUser != null && currentUser.Id == '') { return null; }

    return (
        <Drawer.Navigator initialRouteName="Home" drawerContentOptions={{
            activeTintColor: colors.primary,
            inactiveTintColor: colors.backdrop,
            }} drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={HomeScreenNavigator} options={{ headerTitle: 'Home', 
                drawerIcon: ({ focused, size }) => <Ionicons name="home-outline" size={size} 
                    style={[focused ? { color: colors.primary } : { color: colors.backdrop }, styles.drawerIcon]}/>
            }}/>
            <Drawer.Screen name="Stats" component={StatsScreen} options={{
                drawerIcon: ({ focused, size }) => <Ionicons name="pie-chart-outline" size={size} 
                    style={[focused ? { color: colors.primary } : { color: colors.backdrop }, styles.drawerIcon]}/>
            }} />
            <Drawer.Screen name="Linked Bank Accounts" component={LinkedBankAccountsScreenNavigator} options={{
                drawerIcon: ({ focused, size }) => <Ionicons name="link-outline" size={size} 
                    style={[focused ? { color: colors.primary } : { color: colors.backdrop }, styles.drawerIcon]}/>
            }} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        height: 50,
        width: '100%'
    },
    viewTitle: {
        flex: 7,
        justifyContent: 'center'
    },
    title: {
        fontSize: 32
    },
    viewLogo: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 40,
        height: 40
    },
    separator: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        marginVertical: 15,
        height: 1,
        width: '100%'
    },
    drawerIcon: {
        marginRight: -20
    }
  });