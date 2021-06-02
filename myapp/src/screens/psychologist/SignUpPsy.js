import React, { useState } from 'react';
import { Text, View, Image, ScrollView, TextInput, TouchableOpacity, Alert, CheckBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';

{/* IMPORT STYLES */}
import DefaultStyle from '../../assets/css/DefaultStyle';

{/* IMPORT API */}
import Api from '../../Api';

{/* IMPORT COMPONENTS */}
import ButtonSetScreen from '../../components/ButtonSetScreen';

export default () => {
  const[name, setName] = useState('');
  const[sex, setSex] = useState('');
  const[crp, setCrp] = useState('');
  const[email, setEmail] = useState('');
  const[epsi, setEpsi] = useState(false);
  const[password, setPassword] = useState('');
  const type = "psicologo";

  const navigation = useNavigation();

  const handleSignClick = async () => {
    //VERIFICA SE TODOS OS CAMPOS ESTÃO PREENCHIDOS
    if(name != '' && crp != '' && email != '' && password != '') {
        //API PARA CADASTRO
        signUpRes = await Api.signUpPsy(name, crp, email, password, type);
        //VERIFICA O RETORNO DA API PARA SABER SE O CADASTRO FOI CONCLUIDO COM SUCESSO
        if(signUpRes.message =='Psicologo cadastrado com sucesso.') {
          console.log("Logs >> Cadastro Psicologo | Tipo: "+type+", Nome: "+name+", CRP: "+crp+", E-mail: "+email+", Senha: "+password);
          //API PARA LOGIN
          let signInRes = await Api.signIn(email, password);
          //VERIFICA A API DE LOGIN RETORNOU UM TOKEN
          if(signInRes.token) {
            await AsyncStorage.setItem('token', signInRes.token);
            console.log("Logs >> Cadastro Psicologo >> Login | e-mail: "+email+", senha: "+password+", token: "+signInRes.token);
            navigation.reset({
                routes:[{name: 'Presentation'}]
            });
          }
          //CASO TENHA FALHA NO LOGIN RETORNA O ERRO
          else {
            Alert.alert("Falha:",signInRes.error);
          }
        }
        //VERIFICA O RETORNO DA API PARA SABER SE O EMAIL E/OU CRP JA ESTA CADASTRADO
        else if(signUpRes.message =='E-mail ja cadastrado.'){
          Alert.alert("Falha:","Possui dados ja cadastrados.");
        }
        //CASO TENHA FALHA NO CADASTRO RETORNA O ERRO
        else {
            Alert.alert("Falha:",signUpRes.error);
        }
      //CASO ALGUM CAMPO NÃO ESTEJA PREENCHIDO RETORNA O ERRO
    } else {
        Alert.alert("Falha:","Preencha todos os campos");
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
              placeholder="CRP"
              onChangeText={ value => setCrp(value) }
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
            <View style={DefaultStyle.checkboxContainer}>
							<CheckBox
								value={epsi}
								onValueChange={setEpsi}
								style={DefaultStyle.checkbox}
							/>
							<Text>Declado que sou cadastrado{"\n"}na plataforma E-Psi</Text>
						</View>
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
