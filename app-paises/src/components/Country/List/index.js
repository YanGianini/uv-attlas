import { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native"
import { ThemeProvider, SearchBar, ListItem, Avatar } from '@rneui/themed';
import { Header } from '@rneui/themed';

export default CountryList = ({ navigation }) => {
  const [countryList, setCountryList] = useState([]);
  const [countryListFiltered, setCountryListFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCountryList();
  }, []);

  const updateSearch = (search) => {
    setSearch(search);
  };

  const fetchCountryList = async () => {
    try {
      const response = await fetch('https://restcountries.com/v2/all');
      const countryListData = await response.json();
      const countryList = [];
      countryListData.forEach((country) => {
        const countryName = country?.translations?.pt
        const alreadyAdded = countryList.findIndex(country => {
          return country.translations.pt === countryName;
        }) > -1;
        if (!alreadyAdded) {
          countryList.push(country);
        }
      });
      setCountryList(countryList);
      setCountryListFiltered(countryList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (search) {
      const newCountryListFiltered = countryList.filter(
        function (country) {
          const countryName = country?.translations?.pt
            ? country?.translations?.pt?.toUpperCase()
            : ''.toUpperCase();
          return countryName.indexOf(search.toUpperCase()) > -1;
        }
      )
      setCountryListFiltered(newCountryListFiltered)
    } else {
      setCountryListFiltered(countryList)
    }
  }, [search])

  return (
    <ThemeProvider>
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
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        </TouchableOpacity>
        <SearchBar
          placeholder="Pesquise um país..."
          onChangeText={updateSearch}
          value={search}
          lightTheme={true}
        />
        <ScrollView>
          {countryListFiltered.map((country, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('País', { country: country })}>
              <ListItem bottomDivider>
                <Avatar
                  rounded
                  source={country.flags.png ? { uri: country.flags.png } : {}}
                />
                <ListItem.Content>
                  <ListItem.Title>{country.translations.pt}</ListItem.Title>
                  <ListItem.Subtitle>{country.nativeName}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ThemeProvider>
  )
}