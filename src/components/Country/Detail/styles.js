import { StyleSheet } from "react-native"

import { Dimensions } from 'react-native';


const win = Dimensions.get('window');

const styles = StyleSheet.create({
    countryName: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        backgroundColor: '#2089DC',
        color: '#FFF',
    },
    fontBolder: {
        fontWeight: 'bold',
    },
    fontInfo: {
        textAlign: 'justify',
    },
    imageContainer: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    headerImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'contain'
    },
});

export default styles;