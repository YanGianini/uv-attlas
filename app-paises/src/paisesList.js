import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { SearchBar } from '@rneui/themed';

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
          const jsonData = await response.json();
          setPaises(jsonData);
          setPaisesFiltrados(jsonData);
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
        <View>
            
            <Text>Lista de paises</Text>
            <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
                <Text>Home</Text> 
            </TouchableOpacity>
            <SearchBar
              placeholder="Pesquise um país..."
              onChangeText={updateSearch}
              value={search}
            />
            <ScrollView>
                {paisesFiltrados.map((pais, index) => (
                    <TouchableOpacity key={index} onPress={() => navigation.navigate('pais detail', {pais: pais})}>
                        <Text> {pais.nome.abreviado}</Text>
                    </TouchableOpacity>
                    
                ))}
            </ScrollView>
        </View>
    )
}