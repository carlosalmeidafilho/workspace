import React, { useState } from 'react';
import { Text, View, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Loading from '../components/Loading';

{/* ASYNC STORAGE */}
import AsyncStorage from '@react-native-async-storage/async-storage';

{/* IMPORT API */}
import Api from '../Api.js';

{/* IMPORT STYLES */}
import DefaultStyle from '../assets/css/DefaultStyle'

{/* IMPORT COMPONENTS */}
import ButtonSetScreen from '../components/ButtonSetScreen';

export default function Login() {
  //Hooks
  const[email, setEmail] = useState("100");
  const[password, setPassword] = useState("100");

  //Navegação
  const navigation = useNavigation();

  //Funcao que armazena os dados na memoria
  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      console.log(e);
    }
  }

  //Função de login
  const handleSignClick = async () => {
    //Limpa o storage antes do login
    await AsyncStorage.clear();
    //Verifica se os campos estão vazios
    if(email != '' && password != ''){
      let results = await Api.signIn(email, password);

      //Verifica se o login foi efetuado
      if(results.message === "Authentication failed.") {
        Alert.alert("Falha:","E-mail e/ou senha errados!");
      }

      else if(results.user.token) {
        //Verifica se o usuario é um paciente
        if(results.user.type === "patient") {
          navigation.reset({
            routes:[{name: 'PatientTab'}]
          });
        }
        //Verifica o usuario é um psicologo
        else if(results.user.type === "psychologist") {
          navigation.reset({
            routes:[{name: 'PsychologistTab'}]
          });
        }
        
      //Armazena os dados na memoria
      storeData('@id', results.user.id);
      storeData('@type', results.user.type);
      storeData('@email', results.user.email);
      storeData('@token', results.user.token);
      }
    } else {
      Alert.alert("Falha:","Preencha os campos!");
    }
  }
 
  return ( 
    <View style={ DefaultStyle.mainContainer }>
      <ScrollView contentContainerStyle={ DefaultStyle.scrollViewContainer }>
        <View style={ DefaultStyle.defaultContainer }>
          <Image
            source={require('../assets/img/react-native.png')}
            style={ DefaultStyle.imageLogo }
          />
          <View style={ DefaultStyle.colContainer }>
            <TextInput
              autoCapitalize='none'
              style={ DefaultStyle.input }
              placeholder="E-mail"
              onChangeText={ value => setEmail(value) }
            />
            <TextInput
              secureTextEntry
              autoCapitalize='none'
              style={ DefaultStyle.input }
              placeholder="Senha"
              onChangeText={ value => setPassword(value) }
            />
            <TouchableOpacity style={ DefaultStyle.button } onPress={handleSignClick}>
              <Text style={ DefaultStyle.buttonText }>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

