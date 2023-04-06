
import { View, Text, TouchableOpacity, ScrollView } from "react-native"

export default PaisDetail = ({ route, navigation }) => {

    const { pais } = route.params

    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text>Home</Text>
            </TouchableOpacity>
            <ScrollView>
                <Text>{pais.nome.abreviado}</Text>
                <Text>Continente: {pais.localizacao.regiao.nome}</Text>
                <Text>Area: {pais.area.total} {pais.area.unidade['símbolo']}</Text>
                <Text>Lingua: {pais.linguas[0].nome}</Text>
                <Text>Capital: {pais.governo.capital.nome}</Text>
                <Text>Moeda: {pais['unidades-monetarias'][0].id['ISO-4217-ALPHA']} - {pais['unidades-monetarias'][0].nome}</Text>
                <Text>Historia geral: {pais.historico}</Text>
            </ScrollView>
        </View>
    )
}
  