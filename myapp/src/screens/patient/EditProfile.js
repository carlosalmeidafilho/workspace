import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Loading from '../../components/Loading';

const screenWidth = Math.round(Dimensions.get('window').width);

{/* ASYNC STORAGE */}
import AsyncStorage from '@react-native-async-storage/async-storage';

{/* API */}
import Api from '../../Api';
 
export default () => {
	{/* NAVEGAÇÃO */}
	const navigation = useNavigation();

	{/* HOOKS */}
	const[name, setName] = useState('');
	const[sex, setSex] = useState('');
	const[age, setAge] = useState('');
	const[city, setCity] = useState('');
	const[state, setState] = useState('');
	const[phone, setPhone] = useState('');
	const[cpf, setCpf] = useState('');
	const[rg, setRg] = useState('');
	const[email, setEmail] = useState('');
	const[password, setPassword] = useState('');

	const [loading, setLoading] = useState(true);

	{/* ALTERA AS INFORMAÇÕES NO BANCO DE DADOS*/}
	const updatePatient = async () => {
		{/* VERIFICA SE OS CAMPOS OBRIGATORIOS ESTÃO PREENCHIDOS */}
		if(name != "" && sex != "" && cpf != "" && rg != "" && password != ""){
			const id = await AsyncStorage.getItem('@id');

			await Api.patchPatient(id, name, sex, age, phone, city, state, cpf, rg, email, password);
			navigation.reset({
				routes:[{name: 'PatientTab'}]
			});
		} else {
			alert("Preencha todos os campos obrigatorios *")
		}
	}

	//Funcao que armazena os dados na memoria
  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      console.log(e);
    }
  }

	const loadData = async () => {
		console.log("Loading Data");

		const id = await AsyncStorage.getItem('@id');
		let results = await Api.getPatient(id);

		//Carrega dados armazenados
		var storedName = await AsyncStorage.getItem('@name');
		setName(storedName);
		var storedSex = await AsyncStorage.getItem('@sex');
		setSex(storedSex);
		var storedAge = await AsyncStorage.getItem('@age');
		setAge(storedAge);
		var storedCity = await AsyncStorage.getItem('@city');
		setCity(storedCity);
		var storedState = await AsyncStorage.getItem('@state');
		setState(storedState);
		var storedPhone = await AsyncStorage.getItem('@phone');
		setPhone(storedPhone);
		var storedCpf = await AsyncStorage.getItem('@cpf');
		setCpf(storedCpf);
		var storedRg = await AsyncStorage.getItem('@rg');
		setRg(storedRg);
		var storedEmail = await AsyncStorage.getItem('@email');
		setEmail(storedEmail);

		//Verifica se possui dados alterados
		if(results.patient.name != storedName) {
			storeData('@name',results.patient.name);
			const storedName = await AsyncStorage.getItem('@name');
			setName(storedName);
		}
		if(results.patient.sex != storedSex){
			storeData('@sex',results.patient.sex);
			const storedSex = await AsyncStorage.getItem('@sex');
			setSex(storedSex);
		}
		if(results.patient.age != storedAge){
			storeData('@age',results.patient.age);
			const storedAge = await AsyncStorage.getItem('@age');
			setAge(storedAge);
		}
		if(results.patient.city != storedCity){
			storeData('@city',results.patient.city);
			const storedCity = await AsyncStorage.getItem('@city');
			setCity(storedCity);
		}
		if(results.patient.state != storedState){
			storeData('@state',results.patient.state);
			const storedState = await AsyncStorage.getItem('@state');
			setState(storedState);
		}
		if(results.patient.phone != storedPhone){
			storeData('@phone',results.patient.phone);
			const storedPhone = await AsyncStorage.getItem('@phone');
			setPhone(storedPhone);
		}
		if(results.patient.cpf != storedCpf){
			storeData('@cpf',results.patient.cpf);
			const storedCpf = await AsyncStorage.getItem('@cpf');
			setCpf(storedCpf);
		}
		if(results.patient.rg != storedRg){
			storeData('@rg',results.patient.rg);
			const storedRg = await AsyncStorage.getItem('@rg');
			setRg(storedRg);
		}
		if(results.patient.email != storedEmail){
			storeData('@email',results.patient.email);
			const storedEmail = await AsyncStorage.getItem('@email');
			setEmail(storedEmail);
		}
		setLoading(false);
	}
	
	{/* EXECUTA AO CARREGAR A TELA */}
	useEffect(()=>{
		setLoading(true);
		loadData();
	}, []);
	
	return(
		<View>
			<ScrollView contentContainerStyle={ styles.scrollViewContainer }>
				{/* CARD AVATAR */}
				<View style={ styles.colContainer }>
					{/* FOTO */}
					<Image
						source={require('../../assets/img/perfil.jpg')}
						style={ styles.avatar }
					/>
					<TouchableOpacity style={ styles.button } onPress={{}}>
						<Text style={ styles.buttonText }>Trocar foto</Text>
					</TouchableOpacity>
					{/* EMAIL */}
					<View style={ styles.rowContainer }>
						<Text style={ styles.text }>E-mail:</Text>
						<TextInput
							style={ styles.TextInput }
							value={email} 
							autoCapitalize='none'
							onChangeText={ value => setEmail(value) }/>
					</View>
					{/* SENHA */}
					<View style={ styles.rowContainer }>
						<Text style={ styles.text }>Senha:</Text>
						<TextInput
							secureTextEntry
							style={ styles.TextInput }
							value={password}
							onChangeText={ value => setPassword(value) } />
					</View>
				</View>

				{/* CARD PERFIL*/}
				<View style={ styles.colContainer }>
					{/* NOME */}
					<View style={ styles.rowContainer }>
						<Text style={ styles.text }>Nome:</Text>
						<TextInput
							style={ styles.TextInput } 
							value={name} 
							autoCapitalize='words'
							onChangeText={ value => setName(value)} />
					</View>
					{/* SEXO */}
					<View style={ styles.rowContainer }>
						<Text style={ styles.text }>Sexo:</Text>
						<TextInput
							style={styles.TextInput}
							value={sex}
							onChangeText={ value => setSex(value)} />
					</View>
					{/* CPF */}
					<View style={ styles.rowContainer }>
						<Text style={ styles.text }>CPF:</Text>
						<TextInput
							style={ styles.TextInput }
							value={cpf}
							onChangeText={ value => setCpf(value)} />
					</View>	
					{/* RG */}
					<View style={ styles.rowContainer }>
						<Text style={styles.text}>RG:</Text>
						<TextInput
							style={styles.TextInput}
							value={rg}
							onChangeText={ value => setRg(value)} />
					</View>
					{/* Idade */}
					<View style={styles.rowContainer}>
						<Text style={styles.text}>Idade:</Text>
						<TextInput
							style={styles.TextInput} 
							value={age} 
							onChangeText={value => setAge(value)} />
					</View>
					{/* CIDADE */}
					<View style={styles.rowContainer}>
						<Text style={styles.text}>Cidade:</Text>
						<TextInput 
						style={styles.TextInput} 
						value={city} 
						onChangeText={value => setCity(value)} />
					</View>
					{/* ESTADO */}
					<View style={styles.rowContainer}>
						<Text style={styles.text}>Estado:</Text>
						<TextInput 
							style={styles.TextInput} 
							value={state} 
							onChangeText={value => setState(value)} />
					</View>
					{/* TELEFONE */}
					<View style={styles.rowContainer}>
						<Text style={styles.text}>Telefone:</Text>
						<TextInput 
							style={styles.TextInput} 
							value={phone} 
							onChangeText={ value => setPhone(value)} />
					</View>
				</View >
				{/* FIM CARD PERFIL */}

				{/* CARD MOTIVO CONSULTA */}
				<View style={styles.colContainer}>
					{/* MOTIVO */}
					<Text style={styles.text}>Motivo da consulta:</Text>
						<TextInput 
							style={styles.TextInputArea}
							multiline = {true}
							numberOfLines = {4} />
				</View>
				{/* FIM CARD MOTIVO CONSULTA */}

				<TouchableOpacity style={styles.button} onPress={updatePatient}>
					<Text style={styles.buttonText}>Gravar</Text>
				</TouchableOpacity>

			</ScrollView>
		{loading && <Loading />}
		</View>
	);
}

const styles = StyleSheet.create({
	scrollViewContainer: {
		flexGrow: 1,
		alignItems: "center"
	},
	avatar: {
		width: 120,
		height: 120, 
		borderRadius: 50, 
		marginBottom: 10
	}, 
	button: {
		borderRadius: 6, 
		backgroundColor: "#97D2FB", 
		marginBottom:10,
		margin: 5
	},
	buttonText: {
		textAlign:"center", 
		fontSize:19, 
		fontWeight:"bold", 
		color: "#FFFFFF", 
		textShadowRadius:1, 
		textShadowColor: "#000000", 
		margin:5
	},
	colContainer: {
		flex:1, 
		alignItems: "center",
		borderWidth: 0.5, 
		borderRadius: 20, 
		borderColor: "#97D2FB", 
		backgroundColor: "#e4fbff", 
		marginTop: 5, 
		padding: 10,
		width: screenWidth - 10

	},
	rowContainer: {
		flexDirection: "row",
		paddingBottom: 10
	},
	text: {
		fontSize:18, 
		fontWeight:"300", 
		paddingRight:5,
		minWidth: 80,
		maxWidth: 200,
	},
	TextInput: {
		backgroundColor:'#FFFFFF',
		borderColor: '#97D2FB', 
		borderWidth:1.5, 
		borderRadius:5,
		paddingHorizontal: 10,
		fontSize: 20,
		width:screenWidth*0.7
	},
	TextInputArea: {
		backgroundColor:'#FFFFFF',
		borderColor: '#97D2FB', 
		borderWidth:1.5, 
		borderRadius:5,
		paddingHorizontal: 10,
		fontSize: 20,
		width:screenWidth*0.9
	},
})