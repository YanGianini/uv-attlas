import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { Header, Button } from '@rneui/themed';
import React from "react";

export default HomePage = ({ navigation }) => {

  return (
    <View>
      <Header
        backgroundImageStyle={{}}
        barStyle="default"
        centerComponent={{
          text: "Attlas",
          style: { color: "#fff" }
        }}
        centerContainerStyle={{}}
        containerStyle={{ width: '100%' }}
        linearGradientProps={{}}
        placement="center"
        statusBarProps={{}}
      />
      <Button
        title={'Lista de Países'}
        onPress={() => navigation.navigate('Lista de Países')}
        containerStyle={{
          width: 200,
          marginHorizontal: '25%',
          marginVertical: 100,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});