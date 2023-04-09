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
import { StatusBar } from 'react-native'
import { SignIn } from './src/screens/SignIn';
import { StatusBar as Status } from 'expo-status-bar';



import { Routes } from './src/routes'
import { AuthProvider, useAuth } from './src/hooks/auth';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const { userStorageLoading } = useAuth()

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

  if (!appIsReady || userStorageLoading) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ width: '100%', height: '100%' }}>
      <Status style="auto" />
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        {/* <AppRoutes /> */}
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </View>
  );
}

