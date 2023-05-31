import React, { useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { ActivityIndicator, ScrollView, View, Image } from 'react-native';
import { Card, Tab, Text, TabView } from '@rneui/themed';
import styles from './styles'

export default CountryDetail = ({ route, navigation }) => {

    const { country } = route.params
    const [countryData, setCountryData] = React.useState(null);
    const [location, setLocation] = React.useState([0, 0]);
    const [index, setIndex] = React.useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/paises/' + country.alpha2Code)
            const data = await response.json()
            setCountryData(data[0])
        }
        fetchData().catch(console.error);
        setLocation(country.latlng)
    }, [country])


    return (
        <>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: 'white',
                    height: 3,
                }}
                variant="primary"
            >
                <Tab.Item
                    title="Informações"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'book', type: 'ionicon', color: 'white' }}
                />
                <Tab.Item
                    title="Mapa"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'map', type: 'ionicon', color: 'white' }}
                />
            </Tab>

            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{ backgroundColor: 'gray', width: '100%' }}>
                    <ScrollView>
                        <Card>
                            {countryData ? (
                                <>  
                                    <View style={styles.container}>
                                        <Image style={styles.stretch} source={country.flags.png ? { uri: country.flags.png } : {}}/>
                                    </View>
                                    <Text style={styles.countryName}>{country.translations.pt}</Text>
                                    <Text style={styles.fontBolder}>Continente:</Text>
                                    <Text style={styles.fontInfo}>{countryData.localizacao.regiao.nome}</Text>
                                    <Text style={styles.fontBolder}>Capital:</Text>
                                    <Text style={styles.fontInfo}>{countryData.governo.capital.nome}</Text>
                                    <Text style={styles.fontBolder}>Área:</Text>
                                    <Text style={styles.fontInfo}>{countryData.area.total} {countryData.area.unidade['símbolo']}</Text>
                                    <Text style={styles.fontBolder}>Idioma:</Text>
                                    <Text style={styles.fontInfo}>{countryData.linguas[0].nome}</Text>
                                    <Text style={styles.fontBolder}>Moeda:</Text>
                                    <Text style={styles.fontInfo}>{countryData['unidades-monetarias'][0].id['ISO-4217-ALPHA']} - {countryData['unidades-monetarias'][0].nome}</Text>
                                    <Text style={styles.fontBolder}>História Geral:</Text>
                                    <Text style={styles.fontInfo}>{countryData.historico}</Text>
                                </>
                            ) : <ActivityIndicator />}
                        </Card>
                    </ScrollView>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                    {countryData ? (
                        <MapView loadingEnabled={true} style={{ backgroundColor: 'white', width: '100%', height: '100%' }}
                            region={
                                !location ?
                                    {
                                        latitude: 0,
                                        longitude: 0,
                                        latitudeDelta: 0,
                                        longitudeDelta: 1000,
                                    } :
                                    {
                                        latitude: location[0],
                                        longitude: location[1],
                                        latitudeDelta: 0.005,
                                        longitudeDelta: 750,
                                    }
                            }
                        >
                            <Marker coordinate={
                                !location ?
                                    {
                                        latitude: 0,
                                        longitude: 0,
                                        latitudeDelta: 0,
                                        longitudeDelta: 1000,
                                    } :
                                    {
                                        latitude: location[0],
                                        longitude: location[1],
                                        latitudeDelta: 0.005,
                                        longitudeDelta: 0.005,
                                    }
                            }
                                title={countryData.nome.abreviado}
                                description={countryData.governo.capital.nome}
                            />
                        </MapView>
                    ) : <ActivityIndicator />}
                </TabView.Item>
            </TabView>
        </>
    )
}