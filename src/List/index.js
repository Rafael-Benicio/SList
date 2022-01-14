import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';

import styles from "./styles"

const List=function({navigation, route}){
  const parentData=route.params
  const [data,setData]=useState([])
  // img:require("./../../assets/icon.png"),name:'Nome'

  function listElement(){
    return(
            <View>
            </View>
          )
  }

    // Carrega os dados
  async function loadData(){
    try{      
        const i=await  AsyncStorage.getItem('@'+parentData.id)
        setData((i!=null)?JSON.parse(i):[])
    }catch(error){
      console.log('Erro ao Obter dados');
      RDados()
    }
  }
  // Salva os dados
  async function saveData(n){
        try {
            await AsyncStorage.setItem('@'+parentData.id,JSON.stringify(n))
            console.log('====================================');
            console.log('Dados Salvos');
            console.log('====================================');
        } catch (error) {
            console.log('Erro');
        }
  }

  // Configurar os dados para o estado inicial
  async function RDados (){
    await AsyncStorage.setItem('@'+parentData.id,JSON.stringify({data:[]}))
        console.log("Dados Resetados")
  } 

  loadData()

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