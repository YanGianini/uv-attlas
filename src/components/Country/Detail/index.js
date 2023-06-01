import React, { useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { ScrollView } from 'react-native';
import { Tab, TabView } from '@rneui/themed';
import CountryCard from './CountryCard';

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
        fetchData().catch(console.log)
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
                    <ScrollView style={{marginBottom: 15}}>
                        <CountryCard country={country} countryIBGE={countryData} />
                    </ScrollView>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
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
                            title={country.translations.br}
                        />
                    </MapView>
                </TabView.Item>
            </TabView>
        </>
    )
}