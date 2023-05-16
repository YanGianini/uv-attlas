import { Card } from '@rneui/themed';
import { View, Text, ScrollView } from "react-native"
import styles from './styles'

export default CountryDetail = ({ route, navigation }) => {

    const { country } = route.params

    return country ? (
        <View>
            <ScrollView>
                <Card>
                    <Text style={styles.countryName}>{country.nome.abreviado}</Text>
                    <Text style={styles.fontBolder}>Continente:</Text>
                    <Text style={styles.fontInfo}>{country.localizacao.regiao.nome}</Text>
                    <Text style={styles.fontBolder}>Capital:</Text>
                    <Text style={styles.fontInfo}>{country.governo.capital.nome}</Text>
                    <Text style={styles.fontBolder}>Area:</Text>
                    <Text style={styles.fontInfo}>{country.area.total} {country.area.unidade['símbolo']}</Text>
                    <Text style={styles.fontBolder}>Lingua:</Text>
                    <Text style={styles.fontInfo}>{country.linguas[0].nome}</Text>
                    <Text style={styles.fontBolder}>Moeda:</Text>
                    <Text style={styles.fontInfo}>{country['unidades-monetarias'][0].id['ISO-4217-ALPHA']} - {country['unidades-monetarias'][0].nome}</Text>
                    <Text style={styles.fontBolder}>Historia geral:</Text>
                    <Text style={styles.fontInfo}>{country.historico}</Text>
                </Card>
            </ScrollView>
        </View>
    ) : null
}