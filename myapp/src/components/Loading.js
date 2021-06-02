import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default () => {
  return(
    <View style={ styles.container }>
      <ActivityIndicator size="large" color="#97D2FB" />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#E1EFF6",
    alignItems: "center",
    justifyContent: "center",
  }
})