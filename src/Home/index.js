import React, {useState} from 'react';
import { Text, View,TouchableOpacity,Image, AsyncStorage,StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from "./styles"

export default function App() {
  const [itemLista,setItemLista]=useState([{image:require('./../../assets/icon.png'),name:'Nome1',imageSet:1}])
  const [imageSet,setImageSet]=useState(['cover', 'contain', 'stretch', 'repeat', 'center'])
  const [showSMode,setShowSMode]=useState(true)

  function selectResizeMode(){
    if(showSMode){
    return(
          <View style={styles.showSetImg}>
              <View style={styles.setImgHead}>
                <Text style={styles.setImgHeadTxt}>CAPA</Text>
                <TouchableOpacity style={styles.setImgButton}>
                  <Text style={styles.setImgBtnTxt}>
                    Padrão
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.setImgDesc}>
                <Text>Configuração da imagem de capa</Text>
              </View>
              <View style={styles.setImgViewButtons}>
              <View style={styles.setImgButtons}>
                <TouchableOpacity style={styles.setImgButton}>
                  <Text style={styles.setImgBtnTxt}>
                    Conter
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.setImgButton}>
                  <Text style={styles.setImgBtnTxt}>
                    Esticar
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.setImgButtons}>
                <TouchableOpacity style={styles.setImgButton}>
                  <Text style={styles.setImgBtnTxt}>
                    Repetir
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.setImgButton}>
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
                <TouchableOpacity style={styles.itemGear} onPress={()=>(showSMode)? setShowSMode(false):setShowSMode(true)}>
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

