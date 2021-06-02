import React, { useState } from 'react';
import { Text, View, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';

{/* IMPORT STYLES */}
import DefaultStyle from '../../assets/css/DefaultStyle'

{/* IMPORT COMPONENTS */}
import ButtonSetScreen from '../../components/ButtonSetScreen';

{/* IMPORT API */}
import Api from '../../Api';

export default function RegisterUser() {
  const[name, setName] = useState('');
  const[sex, setSex] = useState('');
  const[cpf, setCpf] = useState('');
  const[rg, setRg] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const type = 'patient';

  const navigation = useNavigation();

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      console.log(e);
    }
  }
  
  const handleSignClick = async () => {
    //VERIFICA SE TODOS OS CAMPOS ESTÃO PREENCHIDOScx
    if(name != '' && sex != '' && cpf != '' && rg != '' && email != '' && password != '') {
        //API PARA CADASTRO
        let signUpRes = await Api.signUpPat(name, sex, cpf, rg, email, password, type);
        //VERIFICA O RETORNO DA API PARA SABER SE O CADASTRO FOI CONCLUIDO COM SUCESSO
        if(signUpRes.message =='Patient successfully created.') {
          console.log("Logs >> Cadastro Paciente | Tipo: "+type+", Nome: "+name+", CPF: "+cpf+", RG: "+rg+", E-mail: "+email+"Senha: "+password);
          //API PARA LOGIN
          let signInRes = await Api.signIn(email, password);
          //VERIFICA A API DE LOGIN RETORNOU UM TOKEN
          console.log(signInRes.user.token)
          if(signInRes.user.token) {
            storeData('@token', signInRes.user.token);
            storeData('@id', signInRes.user.id);
            console.log("Logs >> Cadastro Paciente >> Login | e-mail: "+email+", senha: "+password+", token: "+signInRes.token);
            navigation.reset({
                routes:[{name: 'PatientTab'}]
            });
          }
          //CASO TENHA FALHA NO LOGIN RETORNA O ERRO
          else {
            Alert.alert("Falha:",signInRes.error);
          }
        }
        //VERIFICA O RETORNO DA API PARA SABER SE O EMAIL E/OU CRP JA ESTA CADASTRADO
        else if(signUpRes.message =='E-mail already registered.'){
          Alert.alert("Falha:","Possui dados ja cadastrados.");
        }
        //CASO TENHA FALHA NO CADASTRO RETORNA O ERRO
        else {
          Alert.alert("Falha:",signUpRes.error);
        }
      //CASO ALGUM CAMPO NÃO ESTEJA PREENCHIDO RETORNA O ERRO
    } else {
        Alert.alert("Falha:","Preencha todos os campos.");
    }
  }

  return ( 
    <View style={ DefaultStyle.mainContainer }>
      <ScrollView contentContainerStyle={ DefaultStyle.scrollViewContainer }>
        <View style={ DefaultStyle.defaultContainer }>
          <Image
            source={require('../../assets/img/react-native.png')}
            style={ DefaultStyle.imageLogo }
          />
          <View style={ DefaultStyle.colContainer }>
            <TextInput
              autoCapitalize='words'
              style={ DefaultStyle.input }
              placeholder="Nome completo"
              onChangeText={ value => setName(value) }
            />

            <Picker style={ DefaultStyle.picker }
							selectedValue={sex}
							onValueChange={(item, indexItem) => {setSex(item)}}
						>
							<Picker.Item key={0} value="Masculino" label="Masculino" />
							<Picker.Item key={1} value="Feminino" label="Feminino" />
							<Picker.Item key={2} value="Outro" label="Outro" />
						</Picker>

            <TextInput
              autoCapitalize='none'
              keyboardType='numeric'
              style={ DefaultStyle.input }
              placeholder="CPF"
              onChangeText={ value => setCpf(value) }
            />
            <TextInput
              autoCapitalize='none'
              keyboardType='numeric'
              style={ DefaultStyle.input }
              placeholder="RG"
              onChangeText={ value => setRg(value) }
            />
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
              <Text style={ DefaultStyle.buttonText }>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ButtonSetScreen buttonName="Já possui uma conta? Faça o Login" screen="Presentation" />

      </ScrollView>
    </View>
  );
}