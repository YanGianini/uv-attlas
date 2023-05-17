import { memo, useState, useEffect, useRef } from "react";
import { SafeAreaView, TouchableOpacity, View, FlatList } from "react-native"
import { ThemeProvider, SearchBar, ListItem, Text, Avatar } from '@rneui/themed';
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

  function itemEq(prevItem, nextItem) {
    return prevItem.item.alpha3Code === nextItem.item.alpha3Code;
  }

  const Country = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('País', { country: item })}>
        <View>
          <ListItem bottomDivider>
            <Avatar
              rounded
              source={item.flags.png ? { uri: item.flags.png } : {}}
            />
            <ListItem.Content>
              <ListItem.Title>{item.translations.pt}</ListItem.Title>
              <ListItem.Subtitle>{item.nativeName}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </View>
      </TouchableOpacity>
    );
  };

  const MemoizedCountry = memo(Country, itemEq);

  return countryListFiltered ? (
    <ThemeProvider>
      <SafeAreaView>
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
        <SearchBar
          placeholder="Pesquise um país..."
          onChangeText={updateSearch}
          value={search}
          lightTheme={true}
        />
        <FlatList
          data={countryListFiltered}
          renderItem={({ item }) => <MemoizedCountry item={item} />}
        >
        </FlatList>
      </SafeAreaView>
    </ThemeProvider>
  ) : null
}