import { Card } from '@rneui/themed';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native"

export default PaisDetail = ({ route, navigation }) => {

    const { pais } = route.params

    return (
        <View>
            <ScrollView>
                <Card>
                    <Text style={styles.nome_pais}>{pais.nome.abreviado}</Text>
                    <Text style={styles.font_bolder}>Continente:</Text>
                    <Text style={styles.font_info}>{pais.localizacao.regiao.nome}</Text>
                    <Text style={styles.font_bolder}>Capital:</Text>
                    <Text style={styles.font_info}>{pais.governo.capital.nome}</Text>
                    <Text style={styles.font_bolder}>Area:</Text>
                    <Text style={styles.font_info}>{pais.area.total} {pais.area.unidade['símbolo']}</Text>
                    <Text style={styles.font_bolder}>Lingua:</Text>
                    <Text style={styles.font_info}>{pais.linguas[0].nome}</Text>
                    <Text style={styles.font_bolder}>Moeda:</Text>
                    <Text style={styles.font_info}>{pais['unidades-monetarias'][0].id['ISO-4217-ALPHA']} - {pais['unidades-monetarias'][0].nome}</Text>
                    <Text style={styles.font_bolder}>Historia geral:</Text>
                    <Text style={styles.font_info}>{pais.historico}</Text>
                </Card>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    nome_pais: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        backgroundColor: '#0000FF',
        color: '#FFF',
    },
    font_bolder: {
        fontWeight: 'bold',
    },
    font_info: {
        marginLeft: 10,
        textAlign: 'justify',
    },
  });