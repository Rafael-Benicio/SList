import React, {useState} from 'react';
import { Text, View,TouchableOpacity,Image, AsyncStorage,StatusBar, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from "./styles"

export default function App() {
  const [itemLista,setItemLista]=useState([])
  const [imageSet,setImageSet]=useState(['cover', 'contain', 'stretch', 'repeat', 'center'])
  const [tmpList,setTmpList]=useState({name:'',dataPos:0})
  const [showSMode,setShowSMode]=useState(false)
  const [showCrMo,setShowCrMo]=useState(true)
  // {name:'Nome1',image:require('./../../assets/icon.png'),imageSet:1}

  // Cria elementos da tela
  // Janela de configuração de item da lista
  function selectResizeMode(){
    const [tmp,setTmp]=useState('')
    // Is pra testar se o conteudo vai ou não ser exibido
    if(showSMode){
    return(
          // Configurador do item da lista
          <View style={styles.showSetItem}>
              <ScrollView>
                {/*Configurador do nome da Lista*/}
                <View>
                  <View style={styles.setImgHead}>
                    <Text style={styles.setImgHeadTxt}>NOME</Text>
                  </View>
                  <View style={styles.setImgDesc}>
                    <Text>Configura o nome de {tmpList.name}</Text>
                  </View>
                  <View style={styles.setNameView}>
                  <TextInput style={styles.setNameInput} value={tmp} onChangeText={tmp => setTmp(tmp)} maxLength={10} multiline={false}/>
                  <TouchableOpacity style={styles.setNameBtn} onPress={()=>setName(tmp)}>
                    <Icon name="check" color="#fff" size={20}/>
                  </TouchableOpacity>
                  </View>
                </View>
                {/*Configurador da imagen da lista*/}
                <View>
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
              {/*Configurador do nome da Lista*/}
                <View>
                  <View style={styles.setImgHead}>
                    <Text style={styles.setImgHeadTxt}>IMAGEM</Text>
                  </View>
                  <View style={styles.setImgDesc}>
                    <Text>Configura a imagem de {tmpList.name}</Text>
                  </View>
                  <View style={styles.setNameView}>
                  <TextInput style={styles.setNameInput} multiline={false}/>
                  <TouchableOpacity style={[styles.setNameBtn,{backgroundColor:'#a0f'}]} onPress={()=>setName(tmp)}>
                    <Icon name="gear" color="#fff" size={20}/>
                  </TouchableOpacity>
                  </View>
                </View>
            </ScrollView>
          </View>
      )
    }
  }
  // Lista de itens
  function showItemList(){
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
  // Exibi uma janela para criar e configurar uma lista
  function createItemList(){
    const [tmp,setTmp]=useState('')
    const [show,setShow]=useState(false)

    if(showCrMo){
    return(
     <View style={styles.showSetItem}>
              <ScrollView>
                {/*Configurador do nome da Lista*/}
                <View>
                  <View style={styles.setImgHead}>
                    <Text style={styles.setImgHeadTxt}>NOME</Text>
                  </View>
                  <View style={styles.setImgDesc}>
                    <Text>Escreva o nome da lista</Text>
                  </View>
                  <View style={styles.setNameView}>
                  <TextInput style={styles.setNameInput} value={tmp} onChangeText={tmp => setTmp(tmp)} maxLength={10} multiline={false}/>
                  </View>
                </View>
                {/*Configura o tipo de lista*/}
                <View>
                  <View style={styles.setImgHead}>
                    <Text style={styles.setImgHeadTxt}>TIPO</Text>
                  </View>
                  <View style={styles.setImgDesc}>
                    <Text>Qual é o tipo de lista?</Text>
                  </View>
                  <View style={styles.setNameView}>
                  <TextInput style={styles.setNameInput} value={tmp} onChangeText={tmp => setTmp(tmp)} maxLength={10} multiline={false}/>
                  </View>
                </View>
                {/*Configurador do nome da Lista*/}
                <View>
                  <View style={styles.setImgHead}>
                    <Text style={styles.setImgHeadTxt}>IMAGEM</Text>
                  </View>
                  <View style={styles.setImgDesc}>
                    <Text>Selecione uma capa da sua lista</Text>
                  </View>
                  <View style={styles.setNameView}>
                  <TextInput style={styles.setNameInput} multiline={false}/>
                  <TouchableOpacity style={[styles.setNameBtn,{backgroundColor:'#a0f'}]} onPress={()=>setName(tmp)}>
                    <Icon name="gear" color="#fff" size={20}/>
                  </TouchableOpacity>
                  </View>
                
                
              </View>
            </ScrollView>
          </View>
    )}
  }

  // funçãos de configuração
  // Configurar item da lista
  function setCapa(i){ 
    if(i!=itemLista[tmpList.dataPos].imageSet){
      itemLista[tmpList.dataPos].imageSet=i
      setShowSMode(false)
      saveData(itemLista)
    }
  }
  // Configurar o nome do item da lista
  function setName(i){ 
    if(i!='' && i!=itemLista[tmpList.dataPos].name){
      itemLista[tmpList.dataPos].name=i
      setShowSMode(false)
      saveData(itemLista)
    }
  }

  // Carrega os dados
  async function loadData(){
    try{      
        let i=await  AsyncStorage.getItem('i_List')
        let j=JSON.parse(i)       
        if (j==null) j=[]
        setItemLista(j)
    }catch(error){
      console.log('Erro ao Obter dados');
    }
  }
  // Salva os dados
  async function saveData(n=itemLista){
        try {
            await AsyncStorage.setItem('i_List',JSON.stringify(n))
            console.log('====================================');
            console.log('Dados Salvos');
            console.log('====================================');
        } catch (error) {
            console.log('Erro');
        }
  }

  loadData()

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
          showItemList()
        }
        {/*Buttão de adicinar à lista*/}
        <TouchableOpacity activeOpacity={0.55} style={styles.addButton}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      {
        selectResizeMode()
      }
      {
        createItemList()
      }
    </View>
  );
}

