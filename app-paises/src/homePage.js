import { StyleSheet, View, Text, TouchableOpacity } from "react-native"

export default HomePage = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text>Paises</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Paises list')}>
                <Text> Lista de Paises</Text>
            </TouchableOpacity>
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