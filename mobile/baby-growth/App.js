
import { StyleSheet,  } from 'react-native';
// import MainNavigator from './src/navigations/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar } from '@react-navigation/bottom-tabs'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ArticleScreen from './src/screens/ArticleScreen';
import ArticleDetail from './src/screens/ArticleDetail';
import ChartIbu from './src/screens/ChartIbu';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';

function MyBottomDrawer() {
  
  const Tab = createBottomTabNavigator();
  
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarButton: [
          "Articles",
          "ArticleDetail",
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
          name="Articles"
          component={ArticleScreen}
          options={{
            tabBarLabel: 'Articles',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chart-timeline" color={color} size={size} />
            ),
          }}
        />
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
          name="ArticleDetail"
          component={ArticleDetail}
          options={{
            tabBarLabel: 'ArticleDetail',
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

  

// function MainNavigator(){
//   const Stack= createStackNavigator();
//       return(
//           <Stack.Navigator>
//               <Stack.Screen name='Articles' component={ArticleScreen} />
//               <Stack.Screen name='ArticleDetail' component={ArticleDetail} />
//               {/* <Stack.Screen name='Login' component={LoginScreen} />
//               <Stack.Screen name='Category' component={Category} />
//               <Stack.Screen name='Cart' component={CartScreen} />
//               <Stack.Screen name='Ingredient' component={Ingredient} />
//               <Stack.Screen name='Detail' component={MenuDetail} /> */}
//           </Stack.Navigator>
//       )
//   }

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
function MyDrawer() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={MyBottomDrawer} options={{
            headerTitle:'Welcome to BabyGrowth',
            headerTintColor: '#008080',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
      }}/>
      <Drawer.Screen name="Logout" component={LoginScreen} options={{
            headerShown: false
      }}/>
      {/* <Drawer.Screen name="Home" component={HomeScreen}/> */}
        {/* <Drawer.Screen name="ChartBayi" component={ChartBayi} /> */}
    </Drawer.Navigator>
  );
}


export default function App() {

  return (
      <NavigationContainer>
{/*           
        <Sidebar/> */}
      <MyDrawer />
      
          {/* <SafeAreaView style={styles}> */}
          {/* <MainNavigator>
          </MainNavigator> */}
          {/* </SafeAreaView> */}
         
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
