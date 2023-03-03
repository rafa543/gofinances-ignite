import { ThemeProvider } from 'styled-components'
import { Dashboard } from './src/screens/Dashboard';
import theme from './src/global/styles/theme';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Register } from './src/screens/Register';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({Poppins_400Regular, Poppins_500Medium, Poppins_700Bold});
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
    <View onLayout={onLayoutRootView} style={{width: '100%', height: '100%'}}>
      <ThemeProvider theme={theme}>
        <Register />
      </ThemeProvider>
    </View>
  );
}

