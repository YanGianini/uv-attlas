import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native"


export default PaisesList = ({ navigation }) => {
    const [paises, setPaises] = useState([]);
    useEffect(() => {
        fetchPaises();
      }, []);

    const fetchPaises = async () => {
        try {
          const response = await fetch('https://servicodados.ibge.gov.br/api/v1/paises/');
          const jsonData = await response.json();
          setPaises(jsonData);
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <View>
            
            <Text>Lista de paises</Text>
            <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
                <Text> Home</Text> 
            </TouchableOpacity>
            <ScrollView>
                {paises.map((pais) => (
                    <TouchableOpacity onPress={() => navigation.navigate('pais detail', {pais: pais})}>
                        <Text> {pais.nome.abreviado}</Text>
                    </TouchableOpacity>
                    
                ))}
            </ScrollView>
        </View>
    )
}
  