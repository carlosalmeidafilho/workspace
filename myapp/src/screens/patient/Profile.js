import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Loading from '../../components/Loading';

{/* ASYNC STORAGE */}
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Math.round(Dimensions.get('window').width);
 
{/* IMPORT API */}
import Api from '../../Api';
 
export default () => {
	//Navegação
	const navigation = useNavigation();
	//Hooks
	const[name, setName] = useState('');
	const[sex, setSex] = useState('');
	const[age, setAge] = useState('');
	const[city, setCity] = useState('');
	const[state, setState] = useState('');
	const[phone, setPhone] = useState('');
	const[cpf, setCpf] = useState('');
	const[rg, setRg] = useState('');
	const[email, setEmail] = useState('');

	const [loading, setLoading] = useState(true);

	//ARMAZENA INFORMAÇÃO
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
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
	
	useEffect(()=>{
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
					{/* EMAIL */}
					<View style={ styles.rowContainer }>
						<Text style={ styles.text }>E-mail:</Text>
						<Text style={ styles.text }>{email}</Text>
					</View>
					{/* SENHA */}
					<View style={ styles.rowContainer }>
						<Text style={ styles.text }>Senha:</Text>
						<Text style={ styles.text }>********</Text>

					</View>
				</View>

				{/* CARD PERFIL*/}
				<View style={ styles.colContainer }>
					{/* NOME */}
					<View style={ styles.rowContainer }>
						<Text style={ styles.text }>Nome:</Text>
						<Text style={ styles.text }>{name}</Text>
					</View>
					{/* SEXO */}
					<View style={ styles.rowContainer }>
						<Text style={ styles.text }>Sexo:</Text>
						<Text style={ styles.text }>{sex}</Text>
					</View>
					{/* CPF */}
					<View style={ styles.rowContainer }>
						<Text style={ styles.text }>CPF:</Text>
						<Text style={ styles.text }>{cpf}</Text>
					</View>	
					{/* RG */}
					<View style={ styles.rowContainer }>
						<Text style={styles.text}>RG:</Text>
						<Text style={ styles.text }>{rg}</Text>
					</View>
					{/* Idade */}
					<View style={styles.rowContainer}>
						<Text style={styles.text}>Idade:</Text>
						<Text style={ styles.text }>{age}</Text>
					</View>
					{/* CIDADE */}
					<View style={styles.rowContainer}>
						<Text style={styles.text}>Cidade:</Text>
						<Text style={ styles.text }>{city}</Text>
					</View>
					{/* ESTADO */}
					<View style={styles.rowContainer}>
						<Text style={styles.text}>Estado:</Text>
						<Text style={ styles.text }>{state}</Text>
					</View>
					{/* TELEFONE */}
					<View style={styles.rowContainer}>
						<Text style={styles.text}>Telefone:</Text>
						<Text style={ styles.text }>{phone}</Text>
					</View>
				</View >
				{/* FIM CARD PERFIL */}

				{/* CARD MOTIVO CONSULTA */}
				<View style={styles.colContainer}>
					{/* MOTIVO */}
					<Text style={styles.text}>Motivo da consulta:</Text>
					<Text style={styles.textArea}>Descreva aqui.</Text>
				</View>
				{/* FIM CARD MOTIVO CONSULTA */}

				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfile')}>
					<Text style={styles.buttonText}>Editar Perfil</Text>
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
		paddingBottom: 10,
		width: screenWidth*0.9,
	},
	text: {
		fontSize:18, 
		fontWeight:"300", 
		paddingRight:10,
		minWidth: 80,
		maxWidth: 260
	},
	textArea: {
		fontSize:18, 
		fontWeight:"300", 
		paddingRight:10,
		minWidth: 80,
		textAlign: "center"
	},
})