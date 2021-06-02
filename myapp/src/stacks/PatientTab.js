{/* IMPORT LIBS */}
import React, { useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

{/* IMPORT SCREENS */}
import Home from '../screens/patient/Home';
import Profile from '../screens/patient/Profile';
import Meet from '../screens/patient/Meet';

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
					} else if (route.name === 'Meet') {
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
				name="Meet"
				component={Meet}
				options={{title:"Encontrar"}} />

		</Tab.Navigator>
		);
}
