import React from 'react';
import { View, Text } from 'react-native';

 function Home() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Você está logado!</Text>
        <Text>Bem vindo a home!!</Text>
    </View>
  );
}

export {Home}