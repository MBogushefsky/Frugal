import * as React from 'react';
import { Button, View, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import SideMenuDrawerButton from './SideMenuDrawerButton';
import { StyleSheet } from 'react-native';
import { SText } from '../components/StyledComponents';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

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

function CustomDrawerContent(props: any) {
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
                icon={({ focused, size }) => DrawerItemIcon({focused, size}, "log-out-outline")}
                onPress={() => props.navigation.navigate('Login')}
            />
        </DrawerContentScrollView>
    );
}

function DrawerItemIcon({ focused, size }: any, iconName: string) {
    const { colors } = useTheme();
    return (
        <Ionicons name={iconName} size={size} 
            style={[focused ? { color: colors.primary } : { color: colors.backdrop }, styles.drawerIcon]}/>
    );
}

const Drawer = createDrawerNavigator();

export default function SideMenuDrawerNavigator() {
    const { colors } = useTheme();
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContentOptions={{
            activeTintColor: colors.primary,
            inactiveTintColor: colors.backdrop,
            }} drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={HomeScreenNavigator} options={{ headerTitle: 'Home', 
                drawerIcon: ({ focused, size }) => DrawerItemIcon({focused, size}, "home-outline")
            }}/>
            <Drawer.Screen name="Stats" component={StatsScreen} options={{
                drawerIcon: ({ focused, size }) => DrawerItemIcon({focused, size}, "pie-chart-outline")
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