import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';

import styles from "./styles"

const List=function({navigation, route}){
  const parentData=route.params
  const data={img:require("./../../assets/icon.png"),name:'Nome',}

  function listElement(){
    return(
            <View>
            </View>
          )
  }

  return (
    <View style={styles.background}>
      <StatusBar backgroundColor="#000"/>
      {/*Cabeçalho*/}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
        <Text style={styles.headerText}>{parentData.name}</Text>
        </TouchableOpacity>
      </View>
      {
        listElement()
      }
      <View style={styles.listItem}>
        {/*Buttão de adicinar à lista*/}
        <TouchableOpacity activeOpacity={0.55} style={styles.addButton}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default List;