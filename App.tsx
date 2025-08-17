import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { HomeScreen } from './screens/HomeScreen';
import { LogInScreen } from './screens/LogInScreen';
import { MainPageScreen } from './screens/MainPageScreen';
import { SettingsScreen } from './screens/SettingScreen';
import { SignupScreen } from './screens/SignupScreen';


export type ParameterList = {
  Home: undefined;
  SignUp: undefined;
  LogIn: undefined;
  MainPage: { name: string };
  Settings: undefined; 
};
const Stack = createNativeStackNavigator<ParameterList>(); //this part is just to let your code editor know what prameter your App is expecting

export const App = () => {
  return (
    <PaperProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              animation: 'fade',
              animationDuration: 500,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SignUp" component={SignupScreen} />
            <Stack.Screen name="LogIn" component={LogInScreen} />
            <Stack.Screen name="MainPage" component={MainPageScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </PaperProvider>
  );
};

// wanna do fade in fade out instead of slide animation when navigating
