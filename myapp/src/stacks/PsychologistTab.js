{/* IMPORT LIBS */}
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

{/* IMPORT SCREENS */}
import Home from '../screens/psychologist/Home';
import Profile from '../screens/psychologist/Profile';
import MeetPatient from '../screens/psychologist/MeetPatient';

const Tab = createBottomTabNavigator();

export default () => {
	return (
		<Tab.Navigator 
			initialRouteName="Profile"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if(route.name === 'Profile') {
						iconName = focused ? 'person' : 'person';
					} else if (route.name === 'Home') {
						iconName = focused ? 'home' : 'home';
					} else if (route.name === 'MeetPatient') {
						iconName = focused ? 'star' : 'star';
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
			})}
			>
			<Tab.Screen
			 name="Profile"
			  component={Profile}
				options={{title:"Perfil"}} />
			<Tab.Screen
				name="Home"
				component={Home}
				options={{title:"Inicio"}} />
			<Tab.Screen
				name="MeetPatient"
				component={MeetPatient}
				options={{title:"Pacientes"}} />

		</Tab.Navigator>
		);
}