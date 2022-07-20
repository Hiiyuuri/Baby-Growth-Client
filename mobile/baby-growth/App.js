

import MyDrawer from './src/navigations/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';

import 'react-native-gesture-handler';

export default function App() {

  return (
      <NavigationContainer>
      <MyDrawer />      
      </NavigationContainer>
  );
}
