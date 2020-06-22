import React from 'react';
import { AppLoading } from 'expo';
import { StatusBar } from 'react-native';

import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';

import Routes from './src/routes';

// O <> </> tem nome de fragment e serve como alternativa ao <View />
// Pois o <View /> se assemelha a uma div, e eu quero apenas encaixar mais de dois elementos
// Para colocar mais de dois elemntos, eu encapsulo eles dentro de <> </>

export default function App() {
const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Ubuntu_700Bold
    });

    if (!fontsLoaded)
        return <AppLoading />

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </>
  );
}
