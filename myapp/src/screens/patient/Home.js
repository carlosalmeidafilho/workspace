import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loading from '../../components/Loading';

{/* IMPORT API */}
import Api from '../../Api';

const screenWidth = Math.round(Dimensions.get('window').width);

const storeData = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, value)
	} catch (e) {
		console.log(e);
	}
}

export default () => {
	const[name, setName] = useState('');
	const [loading, setLoading] = useState(true);

	//Navegação
	const navigation = useNavigation();

	const loadData = async () => {
		console.log("Loading Data");
	
		const id = await AsyncStorage.getItem('@id');
		let results = await Api.getPatient(id);
		storeData('@name', results.patient.name);

		var storedName = await AsyncStorage.getItem('@name');
		setName(storedName);

		if(results.patient.name != storedName) { 
			storeData('@name',results.patient.name);
			const storedName = await AsyncStorage.getItem('@name');
			setName(storedName);
		}

		setLoading(false);
	}
  
	useEffect(()=>{
		loadData();
	}, []);

	return(
		<View>
			<ScrollView contentContainerStyle={ styles.scrollViewContainer }>
				<View style={styles.colContainer}>
					<Text style={styles.text}>Seja bem vindo(a) <Text style={styles.textBold}>{name}</Text> ao PsicoMeet !</Text>
					<Image
            source={require('../../assets/img/react-native.png')}
            style={ styles.imageLogo }
          />

					<Text style={styles.text}>Através da plataforma você podera encontrar um profissional que atenda suas necessidades.</Text>
					<Text style={styles.textBold}>Instruções:</Text>
					<Text style={styles.text}>-Complete ou altere seu perfil, através do botão <Text style={styles.textBold}>Perfil</Text></Text>
					<Text style={styles.text}>-Faça a busca dos psicologos através do botão <Text style={styles.textBold}>Encontrar</Text></Text>

				</View>
				<View style={styles.colContainer}>
					<Text style={styles.textBold}>Trabalho de Conclusão de Curso</Text>
					<Text style={styles.text}>Curso: Engenharia da Computação</Text>
					<Text style={styles.text}>Aluno: Carlos José de Almeida Filho</Text>
					<Text style={styles.text}>RA: 83613</Text>

				</View>

				<TouchableOpacity
					style={styles.button}
					onPress={async () =>{
						await AsyncStorage.clear();
						navigation.reset({
							routes:[{name: 'Presentation'}]
						});
					}}>
						
					<Text style={styles.buttonText}>Sair</Text>
				</TouchableOpacity>
			</ScrollView>
			{loading && <Loading />}
		</View>
	);
}

const styles = StyleSheet.create({
	scrollViewContainer: {
		flexGrow: 1,
		alignItems: "center",
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
	avatar: {
		width: 120,
		height: 120, 
		borderRadius: 50, 
		marginBottom: 10
	},
	text: {
		fontSize:18, 
		fontWeight:"300", 
		paddingRight:10,
		minWidth: 80,
		maxWidth: screenWidth,
		textAlign: "center"
	},
	textBold: {
		fontSize:19, 
		fontWeight:"bold", 
		paddingRight:10,
		minWidth: 80,
		maxWidth: screenWidth,
		textAlign: "center"
	},
	imageLogo:{
		margin: 5,
		resizeMode: "contain",
		width:150,
		height:150,
	},
	button: {
		borderRadius: 6, 
		backgroundColor: "#97D2FB", 
		marginBottom:10,
		margin: 5,
		width: 200
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
}) 