import React, { useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';

import { HomeScreenProps } from '../../routes/Stack/screenProps';

function Home({navigation}: HomeScreenProps) {

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onPressBackHandler)
  })

  const onPressBackHandler = () => {
    if (navigation.isFocused()) {
      BackHandler.exitApp()
      return true
    } else {
      return false
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Você está logado!</Text>
      <Text>Bem vindo a home!!</Text>
    </View>
  );
}

export { Home }