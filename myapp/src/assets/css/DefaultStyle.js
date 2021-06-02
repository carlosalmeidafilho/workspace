import { StyleSheet, Dimensions } from 'react-native'

const screenWidth = Math.round(Dimensions.get('window').width);

const DefaultStyle = StyleSheet.create({
	header:{
		backgroundColor: '#97D2FB'
	},
	headerTitle:{
		fontSize: 25,
		fontWeight: "bold",
		color: "#FFFFFF",
		textShadowRadius: 1,
		textShadowColor: "#000000",
	},
	scrollViewContainer:{
		flexGrow: 1,
		alignItems: "center"
	},
	mainContainer:{
		flex: 1,
		backgroundColor: "#E1EFF6",
	},
	defaultContainer:{
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	rowContainer:{
		flexDirection: "row",
		justifyContent: "center",
		width: screenWidth - 30,
	},
	colContainer:{
		backgroundColor: "#e4fbff",
		flexDirection: "column",
		justifyContent: "center",
		marginVertical: 5,
		borderRadius: 20,
		width: screenWidth - 30,
		borderWidth: 0.5,
    borderColor: "#97D2FB",
	},
	imageLogo:{
		margin: 5,
		resizeMode: "contain",
		width:150,
		height:150,
	},
	button: {
		borderRadius: 6,
		backgroundColor: '#97D2FB',
		margin: 5,
		padding: 5,
		minWidth: 170,
		maxWidth: 250,
		alignSelf: "center",
	},
	buttonText: {
		textAlign: "center",
		fontSize: 18,
		fontWeight: "bold",
		color: "#FFFFFF",
		textShadowRadius: 1,
		textShadowColor: "#000000",
	},
	containerText: {
		textAlign: "center",
		fontSize: 18,
		textAlign: "justify"
	},
	input:{
		backgroundColor: "#FFFFFF",
		borderColor: '#97D2FB',
		borderWidth: 1.5,
		borderRadius: 5,
		marginVertical: 5,
		padding: 2,
		alignSelf: "center",
		width: screenWidth - 150
	},
	formText: {
		paddingTop: 5,
		paddingHorizontal: 60,
		fontWeight: "300"
	},
	picker:{
		width: screenWidth - 150,
		alignSelf: "center",
	},
	checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
		alignSelf: "center",
  },
  checkbox: {
    alignSelf: "center",
  },
})

export default DefaultStyle;