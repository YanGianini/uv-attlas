import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CountryList from './src/components/Country/List';
import CountryFavoritesList from './src/components/Country/FavoritesList';
import CountryDetail from './src/components/Country/Detail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#2089DC',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="Lista de Países" options={{headerShown: false}} component={CountryList} />
        <Stack.Screen name="Favoritos" component={CountryFavoritesList} />
        <Stack.Screen name="País" options={({ route }) => ({ title: route.params.name })} component={CountryDetail} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
