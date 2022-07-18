import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function Sidebar() {
  return (
    <NavigationContainer>
      <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
            <Drawer.Screen name='Login' component={LoginScreen} />
            <Drawer.Screen name='Home' component={Home} />
            <Drawer.Screen name='Category' component={Category} />
            <Drawer.Screen name='Cart' component={CartScreen} />
            <Drawer.Screen name='Ingredient' component={Ingredient} />
            <Drawer.Screen name='Detail' component={MenuDetail} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}