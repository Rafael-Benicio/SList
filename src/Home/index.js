import React, {useState} from 'react';
import { Text, View,TouchableOpacity,Image, AsyncStorage,StatusBar } from 'react-native';

import styles from "./styles"

export default function App() {
  const [itemLista,setItemLista]=useState([{image:require('./../../assets/icon.png'),name:'Nome1',imageSet:'cover'}])
  const [imageSet,setImageSet]=useState(['cover', 'contain', 'stretch', 'repeat', 'center'])

  // Checar se já existe dados no App ou se tem que criar uma nova base
  async function loadData (){
    try{
        let i=await  AsyncStorage.getItem('Key')
        if (i==null){
          throw new Error('dados são Null')
        }
    }catch(err){
      console.log('Erro: Check');
            RDados()
    }
  }

  // Salva dados
    async function saveDataDefault(n){
        try {
            await AsyncStorage.setItem('defa',JSON.stringify(n))
            console.log('====================================');
            console.log('Dados Salvos');
            console.log('====================================');
        } catch (error) {
            console.log('Erro');
        }
  }

  // Carregar Listas padrões 
  async function loadDataDef(){
    try{
        let i=await  AsyncStorage.getItem('defa')
      let j
        j=JSON.parse(i)
        if(j==null || j==undefined) 
          saveDataDefault({dia:[{check:[],tf:[],dia:''}]}) 
        else{
          setData(j)
        } 
    }catch(err){
      console.log('Erro: Check');
            // RDados()
    }
  }

  // Configurar os dados para o estado inicial
  async function RDados (){
    await AsyncStorage.setItem('Key',JSON.stringify({mes:[[],[],[],[],[],[],[],[],[],[],[],[]]}))
        alert("Dados Resetados")
        setReset(false)
  } 

  return (
    <View style={styles.background}>
      <StatusBar backgroundColor="#000"/>
      {/*Cabeçalho*/}
      <View style={styles.header}>
        <Text style={styles.headerText}>SList</Text>
      </View>
      {/*Lista*/}
      <View style={styles.listItem}>
        {/*Itens com listas*/}
        {
          itemLista.map((i,index)=>(
            <View key={index} style={styles.itemList}>
                <TouchableOpacity activeOpacity={0.8}>
                    <Image style={[styles.itemImg,{resizeMode:i.imageSet}]} source={i.image}/>
                </TouchableOpacity>
                <Text style={styles.itemText}>{i.name}</Text>
            </View>
          ))
        }
        {/*Buttão de adicinar à lista*/}
        <TouchableOpacity activeOpacity={0.95} style={styles.addButton}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

