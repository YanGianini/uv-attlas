import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { ThemeProvider, SearchBar, ListItem } from '@rneui/themed';

export default PaisesList = ({ navigation }) => {
  const [paises, setPaises] = useState([]);
  const [paisesFiltrados, setPaisesFiltrados] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPaises();
  }, []);

  const updateSearch = (search) => {
    setSearch(search);
  };

  const fetchPaises = async () => {
    try {
      const response = await fetch('https://servicodados.ibge.gov.br/api/v1/paises/');
      const paisesData = await response.json();
      const paises = [];
      paisesData.forEach((pais) => {
        const paisNome = pais?.nome?.abreviado
        const alreadyAdded = paises.findIndex(pais => {
          return pais.nome.abreviado === paisNome;
        }) > -1;
        if (!alreadyAdded) {
          paises.push(pais);
        }
      });
      setPaises(paises);
      setPaisesFiltrados(paises);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (search) {
      const newPaisesFiltrados = paises.filter(
        function (pais) {
          const paisNome = pais?.nome?.abreviado
            ? pais?.nome?.abreviado?.toUpperCase()
            : ''.toUpperCase();
          const pesquisa = search.toUpperCase();
          return paisNome.indexOf(pesquisa) > -1;
        }
      )
      setPaisesFiltrados(newPaisesFiltrados)
    }
  }, [search])

  return (
    <ThemeProvider>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        </TouchableOpacity>
        <SearchBar
          placeholder="Pesquise um país..."
          onChangeText={updateSearch}
          value={search}
          lightTheme={true}
        />
        <ScrollView>
          {paisesFiltrados.map((pais, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('País', { pais: pais })}>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>{pais.nome.abreviado}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ThemeProvider>
  )
}