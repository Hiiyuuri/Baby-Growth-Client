
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'
// import LoginScreen from '../screens/LoginScreen';
// import CartScreen from '../screens/CartScreen'
// import Category from '../screens/Category'
// import Ingredient from '../screens/Ingredient'
// import MenuDetail from '../screens/MenuDetail'
import ChartBayi from '../screens/ChartBayi'

const Stack= createStackNavigator();

export default function MainNavigator(){
    
    return(
        <Stack.Navigator>
            <Stack.Screen name='ChartBayi' component={ChartBayi} />
            <Stack.Screen name='Home' component={HomeScreen} />
            {/* <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Category' component={Category} />
            <Stack.Screen name='Cart' component={CartScreen} />
            <Stack.Screen name='Ingredient' component={Ingredient} />
            <Stack.Screen name='Detail' component={MenuDetail} /> */}
        </Stack.Navigator>
    )
}