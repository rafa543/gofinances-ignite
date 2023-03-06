import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import { Register } from './src/screens/Register';
import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './src/routes/app.routes';
import { StatusBar} from 'react-native'
import { SignIn } from './src/screens/SignIn';
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({ Poppins_400Regular, Poppins_500Medium, Poppins_700Bold });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ width: '100%', height: '100%' }}>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <StatusBar barStyle="light-content"/>
          {/* <AppRoutes /> */}
          <SignIn/>
        </ThemeProvider>
      </NavigationContainer>
    </View>
  );
}

