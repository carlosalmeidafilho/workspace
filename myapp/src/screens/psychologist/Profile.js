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
	const[phone, setPhone] = useState('');
	const[city, setCity] = useState('');
	const[state, setState] = useState('');
	const[crp, setCrp] = useState('');
	const[epsi, setEpsi] = useState('');
	const[yearofformation, setYearofformation] = useState('');
	const[institution, setInstitution] = useState('');
	const[specialty, setSpecialty] = useState('');
	const[approach, setApproach] = useState('');
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
		console.log("Loading Psychologist Data"); 

		const id = await AsyncStorage.getItem('@id');
		let results = await Api.getPsychologist(id);

		//Carrega dados armazenados
		var storedName = await AsyncStorage.getItem('@name');
		setName(storedName);
		var storedSex = await AsyncStorage.getItem('@sex');
		setSex(storedSex);
		var storedAge = await AsyncStorage.getItem('@age');
		setAge(storedAge);
		var storedPhone = await AsyncStorage.getItem('@phone');
		setPhone(storedPhone);
		var storedCity = await AsyncStorage.getItem('@city');
		setCity(storedCity);
		var storedState = await AsyncStorage.getItem('@state');
		setState(storedState);
		var storedCrp = await AsyncStorage.getItem('@crp');
		setCrp(storedCrp);
		var storedEpsi = await AsyncStorage.getItem('@epsi');
		setEpsi(storedEpsi);
		var storedYearofformation = await AsyncStorage.getItem('@yearofformation');
		setYearofformation(storedYearofformation);
		var storedInstitution = await AsyncStorage.getItem('@institution');
		setInstitution(storedInstitution);
		var storedSpecialty = await AsyncStorage.getItem('@specialty');
		setSpecialty(storedSpecialty);
		var storedApproach = await AsyncStorage.getItem('@approach');
		setApproach(storedApproach);
		var storedEmail = await AsyncStorage.getItem('@email');
		setEmail(storedEmail);

		//Verifica se possui dados alterados
		if(results.psychologist.name != storedName) { 
			storeData('@name',results.psychologist.name);
			const storedName = await AsyncStorage.getItem('@name');
			setName(storedName);
		}
		if(results.psychologist.sex != storedSex){
			storeData('@sex',results.psychologist.sex);
			const storedSex = await AsyncStorage.getItem('@sex');
			setSex(storedSex);
		}
		if(results.psychologist.age != storedAge){
			storeData('@age',results.psychologist.age);
			const storedAge = await AsyncStorage.getItem('@age');
			setAge(storedAge);
		}
		if(results.psychologist.phone != storedPhone){
			storeData('@phone',results.psychologist.phone);
			const storedPhone = await AsyncStorage.getItem('@phone');
			setPhone(storedPhone);
		}
		if(results.psychologist.city != storedCity){
			storeData('@city',results.psychologist.city);
			const storedCity = await AsyncStorage.getItem('@city');
			setCity(storedCity);
		}
		if(results.psychologist.state != storedState){
			storeData('@state',results.psychologist.state);
			const storedState = await AsyncStorage.getItem('@state');
			setState(storedState);
		}
		if(results.psychologist.crp != storedCrp){
			storeData('@crp',results.psychologist.crp);
			const storedCrp = await AsyncStorage.getItem('@crp');
			setCrp(storedCrp);
		}
		
		if(JSON.stringify(results.psychologist.epsi) != storedEpsi){
			storeData('@epsi',JSON.stringify(results.psychologist.epsi));
			const storedEpsi = await AsyncStorage.getItem('@epsi');
			setEpsi(storedEpsi);
		}
		
		if(results.psychologist.yearofformation != storedYearofformation){
			storeData('@yearofformation',JSON.stringify(results.psychologist.yearofformation));
			const storedYearofformation = await AsyncStorage.getItem('@yearofformation');
			setYearofformation(storedYearofformation);
		}
		if(results.psychologist.institution != storedInstitution){
			storeData('@institution',results.psychologist.institution);
			const storedInstitution = await AsyncStorage.getItem('@institution');
			setInstitution(storedInstitution);
		}
		if(results.psychologist.specialty != storedSpecialty){
			storeData('@specialty',results.psychologist.specialty);
			const storedSpecialty = await AsyncStorage.getItem('@specialty');
			setSpecialty(storedSpecialty);
		}
		if(results.psychologist.approach != storedApproach){
			storeData('@approach',results.psychologist.approach);
			const storedApproach = await AsyncStorage.getItem('@approach');
			setApproach(storedApproach);
		}
		if(results.psychologist.email != storedEmail){
			storeData('@email',results.psychologist.email);
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
					{/* IDADE */}
					<View style={ styles.rowContainer }>
						<Text style={ styles.text }>Idade:</Text>
						<Text style={ styles.text }>{age}</Text>
					</View>
					{/* CRP */}
					<View style={ styles.rowContainer }>
						<Text style={ styles.text }>CRP:</Text>
						<Text style={ styles.text }>{crp}</Text>
					</View>	
					{/* EPSI */}
					<View style={ styles.rowContainer }>
						<Text style={styles.text}>E-psi:</Text>
						<Text style={ styles.text }>{epsi}</Text>
					</View>
					{/* ANO DE FORMAÇÃO */}
					<View style={styles.rowContainer}>
						<Text style={styles.text}>Ano de formação:</Text>
						<Text style={ styles.text }>{yearofformation}</Text>
					</View>
					{/* INSTITUICAO */}
					<View style={styles.rowContainer}>
						<Text style={styles.text}>Instituição:</Text>
						<Text style={ styles.text }>{institution}</Text>
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
					{/* ABORDAGEM */}
					<View style={styles.rowContainer}>
						<Text style={styles.text}>Abordagem:</Text>
						<Text style={ styles.text }>{approach}</Text>
					</View>
					{/* TELEFONE */}
					<View style={styles.rowContainer}>
						<Text style={styles.text}>Telefone:</Text>
						<Text style={ styles.text }>{phone}</Text>
					</View>

				</View >
				{/* FIM CARD PERFIL */}

				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditPsyProfile')}>
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
		minWidth: 180,
		maxWidth: 200
	},
})