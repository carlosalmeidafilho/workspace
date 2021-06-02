import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, TextInput, CheckBox } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';
import Loading from '../../components/Loading';

const screenWidth = Math.round(Dimensions.get('window').width);

{/* ASYNC STORAGE */}
import AsyncStorage from '@react-native-async-storage/async-storage';

{/* API */}
import Api from '../../Api';
 
export default () => {
	{/* NAVEGAÇÃO */}
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
	const[epsi, setEpsi] = useState(false);
	const[yearofformation, setYearofformation] = useState('');
	const[institution, setInstitution] = useState('');
	const[specialty, setSpecialty] = useState('');
	const[approach, setApproach] = useState('');
	const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

	const [loading, setLoading] = useState(true);
	
	{/* ALTERA AS INFORMAÇÕES NO BANCO DE DADOS*/}
	const updatePsychologist = async () => {
		{/* VERIFICA SE OS CAMPOS OBRIGATORIOS ESTÃO PREENCHIDOS */}
		if(name != "" && sex != "" && crp != "" && password != ""){
			const id = await AsyncStorage.getItem('@id');

			await Api.patchPsychologist(id, name, sex, age, phone, city, state, crp, epsi, yearofformation, institution, specialty, approach, password);
			navigation.reset({
				routes:[{name: 'PsychologistTab'}]
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
		
		if(results.psychologist.epsi != storedEpsi){
			storeData('@epsi',results.psychologist.epsi);
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
					{/* Idade */}
					<View style={styles.rowContainer}>
						<Text style={styles.text}>Idade:</Text>
						<TextInput
							style={styles.TextInput} 
							value={age} 
							onChangeText={value => setAge(value)} />
					</View>
					{/* CRP */}
					<View style={ styles.rowContainer }>
						<Text style={ styles.text }>CRP:</Text>
						<TextInput
							style={ styles.TextInput }
							value={crp}
							onChangeText={ value => setCrp(value)} />
					</View>	
					{/* ANO DE FORMAÇÃO */}
					<View style={styles.rowContainer}>
						<Text style={styles.text}>Ano de{"\n"}formação:</Text>
						<TextInput 
						style={styles.TextInput} 
						value={yearofformation} 
						onChangeText={value => setYearofformation(value)} />
					</View>
					{/* INSTITUICAO */}
					<View style={styles.rowContainer}>
						<Text style={styles.text}>Instituição:</Text>
						<TextInput 
						style={styles.TextInput} 
						value={institution} 
						onChangeText={value => setInstitution(value)} />
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
					{/* ABORDAGEM */}
					<View style={styles.rowContainer}>
						<Text style={styles.text}>Abordagem:</Text>
						<Picker style={styles.picker}
							selectedValue={approach}
							onValueChange={(item, indexItem) => {setApproach(item)}}
						>
							<Picker.Item key={0} value="Comportamental" label="Comportamental" />
							<Picker.Item key={1} value="Psicanálise" label="Psicanálise" />
							<Picker.Item key={2} value="Humanista" label="Humanista" />
							<Picker.Item key={3} value="Fenomenológica" label="Fenomenológica" />
							<Picker.Item key={4} value="Outro" label="Outro" />
						</Picker>
					</View>
					{/* TELEFONE */}
					<View style={styles.rowContainer}>
						<Text style={styles.text}>Telefone:</Text>
						<TextInput 
							style={styles.TextInput} 
							value={phone} 
							onChangeText={ value => setPhone(value)} />
					</View>
					{/* EPSI */}
					<View style={styles.container}>
						<View style={styles.checkboxContainer}>
							<CheckBox
								value={epsi}
								onValueChange={setEpsi}
								style={styles.checkbox}
							/>
							<Text style={styles.label}>Declado que sou cadastrado{"\n"}na plataforma E-Psi</Text>
						</View>
					</View>


				</View >
				
				{/* FIM CARD PERFIL */}

				<TouchableOpacity style={styles.button} onPress={updatePsychologist}>
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
		marginBottom: 10,
		alignSelf:"center"
	}, 
	button: {
		borderRadius: 6, 
		backgroundColor: "#97D2FB", 
		marginBottom:10,
		margin: 5,
		alignSelf:"center"
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
		alignItems: "flex-start",
		borderWidth: 0.5, 
		borderRadius: 20, 
		borderColor: "#97D2FB", 
		backgroundColor: "#e4fbff", 
		marginTop: 5, 
		padding: 10,
		width: screenWidth - 30

	},
	rowContainer: {
		flexDirection: "row",
		paddingBottom: 10,
		//backgroundColor: "green",
		width: screenWidth - 50
	},
	text: {
		fontSize:18, 
		fontWeight:"300", 
		paddingRight:5,
		//minWidth: 150,
		width:110,
		alignSelf:"center",
		//backgroundColor: "yellow",
	},
	TextInput: {
		backgroundColor:'#FFFFFF',
		borderColor: '#97D2FB', 
		borderWidth:1.5, 
		borderRadius:5,
		paddingHorizontal: 10,
		fontSize: 20,
		width: 200,
		height: 30,
		alignSelf:"center",
	},
	//ABORDAGEM PICKER
	picker:{
		width: 200,
		//backgroundColor: "grey"
	},
	//CHECK BOX EPSI
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
}) 