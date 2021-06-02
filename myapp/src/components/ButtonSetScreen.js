import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

{ /*
Ex: <ButtonSetScreen buttonName="Texto clicavel" screen="Tela1/>
*/}

export default (props) => {
    const navigation = useNavigation();

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes:[{name: props.screen}]
        });
    }

    return(
        <TouchableOpacity style={styles.buttonContainer} onPress={handleMessageButtonClick}>
            <Text style={styles.buttonText}>{props.buttonName}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer:{
        marginBottom: 10,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 15
    }
})