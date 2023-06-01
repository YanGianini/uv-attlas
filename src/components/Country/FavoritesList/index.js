import { memo, useState, useEffect } from "react";
import { TouchableOpacity, View, FlatList } from "react-native"
import { ListItem, Text, Avatar } from '@rneui/themed';
import * as SecureStore from 'expo-secure-store';

function itemEq(prevItem, nextItem) {
    return prevItem.item.alpha3Code === nextItem.item.alpha3Code;
  }

const Country = ({ item, navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('País', { name: item.translations.br, country: item })}>
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

export default CountryList = ({ route, navigation }) => {
    const { countryList } = route.params

    return (
        <FlatList
            data={countryList}
            renderItem={({ item }) => (
                    <MemoizedCountry item={item} navigation={navigation} />
                )
            }
        ></FlatList>
    )
}
