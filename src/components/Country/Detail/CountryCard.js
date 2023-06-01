import {  View, Image } from 'react-native';
import { Card, Text } from '@rneui/themed';
import styles from './styles'

const CountryCard = ({country, countryIBGE}) => {
    return countryIBGE ? (
        <Card>
            <View style={styles.container}>
                <Image style={styles.headerImage} source={country.flags.png ? { uri: country.flags.png } : {}}/>
            </View>
            <Text style={styles.fontBolder}>Continente:</Text>
            <Text style={styles.fontInfo}>{countryIBGE.localizacao.regiao.nome}</Text>
            <Text style={styles.fontBolder}>Capital:</Text>
            <Text style={styles.fontInfo}>{countryIBGE.governo.capital.nome}</Text>
            <Text style={styles.fontBolder}>Área:</Text>
            <Text style={styles.fontInfo}>{countryIBGE.area.total} {countryIBGE.area.unidade['símbolo']}</Text>
            <Text style={styles.fontBolder}>Idioma:</Text>
            <Text style={styles.fontInfo}>{countryIBGE.linguas[0].nome}</Text>
            <Text style={styles.fontBolder}>Moeda:</Text>
            <Text style={styles.fontInfo}>{countryIBGE['unidades-monetarias'][0].id['ISO-4217-ALPHA']} - {countryIBGE['unidades-monetarias'][0].nome}</Text>
            <Text style={styles.fontBolder}>História Geral:</Text>
            <Text style={styles.fontInfo}>{countryIBGE.historico}</Text>
        </Card>
    ) : (
        <Card style={{marginBottom: 10}}>
            <View style={styles.container}>
                <Image style={styles.headerImage} source={country.flags.png ? { uri: country.flags.png } : {}}/>
            </View>
            <Text style={styles.fontBolder}>Continente:</Text>
            <Text style={styles.fontInfo}>{country.region}</Text>
            <Text style={styles.fontBolder}>Capital:</Text>
            <Text style={styles.fontInfo}>{country.capital}</Text>
            <Text style={styles.fontBolder}>Área:</Text>
            <Text style={styles.fontInfo}>{country.area}</Text>
            <Text style={styles.fontBolder}>Idioma:</Text>
            <Text style={styles.fontInfo}>{country.languages?.[0]?.nativeName}</Text>
            <Text style={styles.fontBolder}>Moeda:</Text>
            <Text style={styles.fontInfo}>{country.currencies?.[0]?.code}</Text>
        </Card>
    )
}

export default CountryCard;