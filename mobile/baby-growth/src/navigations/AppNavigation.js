import { StyleSheet,  } from 'react-native';
import { BottomTabBar } from '@react-navigation/bottom-tabs'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChartIbu from '../screens/ChartIbu';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

function MyBottomDrawer() {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarButton: [
                "ChangePassword"
            ].includes(route.name)
                ? () => {
                    return null;
                }
                : undefined,
        })}
            initialRouteName="Categories"
        >
            <Tab.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{
                    tabBarLabel: 'ChangePassword',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="chart-timeline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Categories"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Categories',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="chart-timeline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="My Baby Growth"
                component={ChartIbu}
                options={{
                    tabBarLabel: 'Baby Growth',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="calendar-month" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}
export default function MyDrawer() {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
            useLegacyImplementation
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={MyBottomDrawer} options={{
                headerTitle: 'Welcome to BabyGrowth',
                headerTintColor: '#008080',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }} />
            <Drawer.Screen name="Logout" component={LoginScreen} options={{
                headerShown: false
            }} />
        </Drawer.Navigator>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
