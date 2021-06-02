import React from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

//ESTILO
import DefaultStyle from '../assets/css/DefaultStyle'

export default ({ navigation }) => {
  return (   
      <View style={ DefaultStyle.mainContainer }>
        <ScrollView contentContainerStyle={ DefaultStyle.scrollViewContainer }>

          {/* LOGO ENTRAR */}
          <View style={ DefaultStyle.rowContainer }>
            <View style={ DefaultStyle.defaultContainer }>
              <Image
                source={require('../assets/img/react-native.png')}
                style={ DefaultStyle.imageLogo }
              />
              <TouchableOpacity style={ DefaultStyle.button } onPress={() => navigation.navigate('SignIn')}>
                <Text style={ DefaultStyle.buttonText }>Entrar</Text>
              </TouchableOpacity>
            </View>

            <View style={ DefaultStyle.defaultContainer }>
              <Text style={ DefaultStyle.containerText }>{'Seu Psicólogo a \nqualquer hora, em\nqualquer lugar.'}</Text>
            </View>
          </View>

          {/* CADASTRO DE PACIENTES */}
          <View style={ DefaultStyle.colContainer }>
            <View style={ DefaultStyle.defaultContainer }>
              <Text style={ DefaultStyle.containerText }>{'Nosso objetivo é conectar você aos psicólogos das mais diversas especialidades, unindo tecnologia e saúde mental a seu favor.'}</Text>
            </View>

            <TouchableOpacity style={ DefaultStyle.button } onPress={() => navigation.navigate('SignUpPat')}>
              <Text style={ DefaultStyle.buttonText }>Cadastro Paciente</Text>
            </TouchableOpacity>
          </View>

          {/* CADASTRO DE PSICOLOGOS */}
          <View style={ DefaultStyle.colContainer }>
            <View style={ DefaultStyle.defaultContainer }>
              <Text style={ DefaultStyle.containerText }>{'Faça parte do time de profissionais do PsicoMeet, uma ferramenta segura para agendamento de consultas.'}</Text>
            </View>

            <TouchableOpacity style={ DefaultStyle.button } onPress={() => navigation.navigate('SignUpPsy')}>
              <Text style={ DefaultStyle.buttonText }>Cadastro Psicologo</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>

  );
}
