import React, {useState} from 'react';
import { Text, View,TouchableOpacity,Image, AsyncStorage,StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from "./styles"

export default function App() {
  const [itemLista,setItemLista]=useState([{image:require('./../../assets/icon.png'),name:'Nome1',imageSet:1}])
  const [imageSet,setImageSet]=useState(['cover', 'contain', 'stretch', 'repeat', 'center'])
  const [showSMode,serShowSMode]=useState(true)

  function selectResizeMode(){
    if(showSMode){
    return(
        <View style={styles.showSetImg}>
            <View>
              <Text>Capa</Text>
              <TouchableOpacity>
                <Text>
                  Padrão
                </Text>
              </TouchableOpacity>
            </View>
            <View>
            <Text>Configuração da imagem de capa</Text>
            </View>
            <View>
            <TouchableOpacity>
              <Text>
                Conter
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>
                Esticar
              </Text>
            </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity>
              <Text>
                Repetir
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>
                Centralizar
              </Text>
            </TouchableOpacity>
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
                <TouchableOpacity style={styles.itemGear}>
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

