import React, {useState} from 'react';
import { Text, View,TouchableOpacity,Image, AsyncStorage,StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from "./styles"

export default function App() {
  const [itemLista,setItemLista]=useState([{name:'Nome1',image:require('./../../assets/icon.png'),imageSet:1}])
  const [imageSet,setImageSet]=useState(['cover', 'contain', 'stretch', 'repeat', 'center'])
  const [tmpList,setTmpList]=useState({name:'',dataPos:0})
  const [showSMode,setShowSMode]=useState(true)


  // Janela de configuração de item da lista
  function selectResizeMode(){
    if(showSMode){
    return(
          <View style={styles.showSetImg}>
              <View style={styles.setImgHead}>
                <Text style={styles.setImgHeadTxt}>CAPA</Text>
                <TouchableOpacity style={styles.setImgButton} onPress={()=>setCapa(0)}> 
                  <Text style={styles.setImgBtnTxt}>
                    Padrão
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.setImgDesc}>
                <Text>Configuração da imagem de capa de {tmpList.name}</Text>
              </View>
              <View style={styles.setImgViewButtons}>
              <View style={styles.setImgButtons}>
                <TouchableOpacity style={styles.setImgButton} onPress={()=>setCapa(1)}>
                  <Text style={styles.setImgBtnTxt}>
                    Conter
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.setImgButton} onPress={()=>setCapa(2)}>
                  <Text style={styles.setImgBtnTxt}>
                    Esticar
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.setImgButtons}>
                <TouchableOpacity style={styles.setImgButton} onPress={()=>setCapa(3)}>
                  <Text style={styles.setImgBtnTxt}>
                    Repetir
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.setImgButton} onPress={()=>setCapa(4)}>
                  <Text style={styles.setImgBtnTxt}>
                    Centralizar
                  </Text>
                </TouchableOpacity>
              </View>
          </View>
          </View>
      )
    }
  }

  // Configurar item da lista
  function setCapa(i){
    itemLista[tmpList.dataPos].imageSet=i
    setShowSMode(false)
    saveData(itemLista)
  }

  // Carrega os dados
  async function loadData(){
    try{      
        let i=await  AsyncStorage.getItem('iList')
        let j=JSON.parse(i)       
        setItemLista(j)
    
    }catch(error){
      console.log('Erro ao Obter dados');
    }
  }
  // Salva os dados
  async function saveData(n=itemLista){
        try {
            await AsyncStorage.setItem('iList',JSON.stringify(n))
            console.log('====================================');
            console.log('Dados Salvos');
            console.log('====================================');
        } catch (error) {
            console.log('Erro');
        }
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
                    <Image style={[styles.itemImg,{resizeMode:imageSet[i.imageSet]}]} source={i.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemGear} onPress={
                  ()=>{
                    setTmpList({name:i.name,dataPos:index});
                    (showSMode)? setShowSMode(false):setShowSMode(true);
                  }
                }>
                  <Icon name="gear" color="#fff" size={20}/>
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
      {
        selectResizeMode()
      }
    </View>
  );
}

