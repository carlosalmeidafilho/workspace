import React from 'react'
import { View, Text, FlatList } from 'react-native'
import api from "../services/api"

const FlatListPsicologo = () => {
  const[cars,setCars] = React.useState([]);

  React.useEffect(() => {
    api.get("/psicologo").then((response) => {
      setCars(response.data);
    });
  }, []);
  
  var Psicologo = ({id, name}) => {
    return(
      <Text>{id} - {name}</Text>
    )
  }

  return(
    <View>
      <FlatList 
        data={cars}
        renderItem={({item}) => <Psicologo id={item.id} name={item.nome} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

export default FlatListPsicologo;