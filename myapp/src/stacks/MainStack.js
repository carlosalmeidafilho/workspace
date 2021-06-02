{/* IMPORT LIBS */}
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

{/* IMPORT SCREENS */}
import Presentation from '../screens/Presentation';
import SignIn from '../screens/SignIn';
import SignUpPat from '../screens/patient/SignUpPat';
import SignUpPsy from '../screens/psychologist/SignUpPsy';

import EditProfile from '../screens/patient/EditProfile';
import EditPsyProfile from '../screens/psychologist/EditProfile';

{/* IMPORT SCREENS TABS */}
import PatientTab from './PatientTab';
import PsychologistTab from './PsychologistTab';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator 
      initialRouteName="Presentation"
    >
 
      <Stack.Screen 
        name="SignUpPsy" 
        component={SignUpPsy}
        options={{title: 'Cadastro do psicólogo'}}
      />

      <Stack.Screen 
        name="Presentation" 
        component={Presentation}
        options={{title: 'Apresentação', headerShown: false}}
      />

      <Stack.Screen 
        name="SignIn" 
        component={SignIn}
        options={{title: 'Entrar'}}
      />

      <Stack.Screen 
        name="SignUpPat" 
        component={SignUpPat}
        options={{title: 'Cadastro do paciente'}}
      />

      <Stack.Screen 
        name="PatientTab" 
        component={PatientTab}
        options={{title: 'Menu do paciente', headerShown: false}}
      />

      <Stack.Screen 
        name="PsychologistTab" 
        component={PsychologistTab}
        options={{title: 'Menu do psicologo', headerShown: false}}
      />

      <Stack.Screen 
        name="EditProfile" 
        component={EditProfile}
        options={{title: 'Editar perfil'}}
      />

      <Stack.Screen 
        name="EditPsyProfile" 
        component={EditPsyProfile}
        options={{title: 'Editar perfil'}}
      />
      
    </Stack.Navigator>
  );
}