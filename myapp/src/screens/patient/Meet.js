import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image } from 'react-native';

import Loading from '../../components/Loading';

const screenWidth = Math.round(Dimensions.get('window').width);

{/* IMPORT API */}
import Api from '../../Api';

export default () => {

	const[psychologist, setPsychologist] = useState([]);
	const [loading, setLoading] = useState(true);

	const loadPsychologist = async () => {
		let results = await Api.getAllpsychologist();
		setPsychologist(results.psychologists)
		setLoading(false);
	}

	var Psicologo = ({name, crp, sex, city, state, age, approach, yearofformation}) => {
    return(
			<View style={styles.colContainer}>
				<Image
					source={require('../../assets/img/perfil.jpg')}
					style={ styles.avatar }
				/>

				<Text>Nome: {name}</Text>
				<Text>Sexo: {sex}</Text>
				<Text>Idade: {age}</Text>
				<Text>Abordagem: {approach}</Text>
				<Text>Ano de formação: {yearofformation}</Text>
				<Text>CRP: {crp}</Text>
				<Text>Localização: {city} - {state}</Text>
			</View> 	
    )
  }

	useEffect(()=>{
		loadPsychologist();
	}, []); 

	return(
		<View>
			<FlatList 
				data={psychologist}
				renderItem={({item}) => 
					<Psicologo 
						name={item.name} 
						crp={item.crp} 
						sex={item.sex} 
						city={item.city} 
						state={item.state} 
						approach={item.approach} 
						yearofformation={item.yearofformation}
						age={item.age} />}
				keyExtractor={(item) => item.id.toString()}
			/>	
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
		width: 40,
		height: 40, 
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
		marginHorizontal: 50
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
		maxWidth: 200
	},
	textArea: {
		fontSize:18, 
		fontWeight:"300", 
		paddingRight:10,
		minWidth: 80,
		textAlign: "center"
	},
})