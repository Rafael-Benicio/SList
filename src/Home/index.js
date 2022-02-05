import React, {useState} from 'react';
import { Text, View,TouchableOpacity,Image,StatusBar, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./styles"

 const Home=function({navigation, route}){
  const [itemLista,setItemLista]=useState({data:[]})
  const [imageSet,setImageSet]=useState(['cover', 'contain', 'stretch', 'repeat', 'center'])
  const [tmpList,setTmpList]=useState({name:'',dataPos:0})
  const [showSMode,setShowSMode]=useState(false)
  const [showCrMo,setShowCrMo]=useState(false)
  const [canSave,setCanSave]=useState(true)
  const [ldData,setLdData]=useState(true)
  

  // Cria elementos da tela
  // Janela de configuração de item da lista
  function selectResizeMode(){
    const [tmp,setTmp]=useState('')
    // Is pra testar se o conteudo vai ou não ser exibido
    if(showSMode){
    return(
          // Configurador do item da lista
          <View style={styles.showSetItem}>
              <ScrollView showsVerticalScrollIndicator={false}>
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
            {/*But~ao para fechar tela*/}
            <View style={styles.closeView}>
              <TouchableOpacity style={styles.closeBtn} onPress={()=>{setTmp('');setShowSMode(false)}}>
                <Icon name="close" color="#600" size={20}/>
              </TouchableOpacity>
            </View>
          </View>
      )
    }
  }
  // Lista de itens
  function showItemList(){
    return(
    itemLista.data.map((i,index)=>(
      <View key={index} style={styles.itemList}>
          <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('List',{id:i.id,name:i.name,tipo:i.tipo})}>
              <Image style={[styles.itemImg,{resizeMode:imageSet[i.imageSet]}]} source={i.image}/>
          </TouchableOpacity>
        {/*Engrenagem deconfiguração  */}
        <TouchableOpacity style={styles.itemGear} onPress={
          ()=>{
            setTmpList({name:i.name,dataPos:index});
            (showSMode)? setShowSMode(false):setShowSMode(true);
          }
          }>
          <Icon name="gear" color="#fff" size={20}/>
        </TouchableOpacity>
        {/*Texto com nome da lista*/}
        <Text style={styles.itemText}>{i.name}</Text>
      </View>
    ))
    )
  }
  // Exibi uma janela para criar e configurar uma lista
  function createItemList(){
    const [tmp,setTmp]=useState('')
    const [tipo,setTipo]=useState(true)

    if(showCrMo){
    return(
     <View style={styles.showSetItem}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {/*Configurador do nome da Lista*/}
                <View>
                  <View style={styles.setImgHead}>
                    <Text style={styles.setImgHeadTxt}>NOME</Text>
                  </View>
                  <View style={styles.setImgDesc}>
                    <Text><Text style={{color:'#f00'}}>*</Text> Escreva o nome do item</Text>
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
                  <View style={styles.setRadioView}>
                    <TouchableOpacity style={(tipo)?styles.setRadioBtnok:styles.setRadioBtn} onPress={()=>setTipo(true)}>
                      <Text>
                        Número
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={(!tipo)?styles.setRadioBtnok:styles.setRadioBtn} onPress={()=>setTipo(false)}>
                      <Text>
                        Sim/Não
                      </Text>
                    </TouchableOpacity>
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
                  <TouchableOpacity style={[styles.setNameBtn,{backgroundColor:'#a0f'}]}>
                    <Icon name="gear" color="#fff" size={20}/>
                  </TouchableOpacity>
                  </View>
                <View>
                  <View style={styles.saveSetView}>
                    <TouchableOpacity style={(canSave)?styles.saveBtnOK:styles.saveBtnNot} onPress={()=>{
                        dataCanSave(tmp.trim(),tipo);
                        setTmp('');
                        setTipo(true);
                        setShowCrMo(false)
                      }}>
                        <Icon name="check" color={(canSave)?'#0a0':'#600'} size={30}/>
                    </TouchableOpacity>
                    {
                      TextAviso()
                    }
                  </View>
                </View>
              </View>
            </ScrollView>
            {/*But~ao para fechar tela*/}
            <View style={styles.closeView}>
              <TouchableOpacity style={styles.closeBtn} onPress={()=>{setShowCrMo(false);setTmp('');setTipo(true)}}>
                <Icon name="close" color="#600" size={20}/>
              </TouchableOpacity>
            </View>
          </View>
    )}
  }

  function dataCanSave(name,tipo){
    if(name==''){
      setCanSave(false)
    }else{
      setShowCrMo(false)
      // [id]=nome
      let key=(Math.floor(Math.random()*8999)+1000).toString(16)
      itemLista.data.push({id:key,name,imageSet:0,image:require("./../../assets/icon.png"),tipo})
      console.log(itemLista)
      saveData(itemLista)
    }
  }

  // Mansagem de aviso
  function TextAviso(){if(!canSave) return <Text style={{color:'#f00',fontSize:15}}>Por favor, coloque um{"\n"}nome em sua lista</Text>}

  // funçãos de configuração
  // Configurar item da lista
  function setCapa(i){ 
    if(i!=itemLista.data[tmpList.dataPos].imageSet){
      itemLista.data[tmpList.dataPos].imageSet=i
      saveData(itemLista)
    }
  }
  // Configurar o nome do item da lista
  function setName(i){ 
    if(i!='' && i!=itemLista.data[tmpList.dataPos].name){
      itemLista.data[tmpList.dataPos].name=i
      saveData(itemLista)
    }
  }

  // Carrega os dados
  async function loadData(){
    try{      
        const i=await  AsyncStorage.getItem('@i_List')
        setItemLista((i!=null)?JSON.parse(i):[])
    }catch(error){
      console.log('Erro ao Obter dados');
      RDados()
    }
  }
  // Salva os dados
  async function saveData(n){
        try {
            await AsyncStorage.setItem('@i_List',JSON.stringify(n))
            console.log('====================================');
            console.log('Dados Salvos');
            console.log('====================================');
        } catch (error) {
            console.log('Erro');
        }
  }

  // Configurar os dados para o estado inicial
  async function RDados (){
    await AsyncStorage.setItem('@i_List',JSON.stringify({data:[]}))
        alert("Dados Resetados")
  } 

  if(ldData){
    loadData()
    setLdData(false)
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
          showItemList()
        }
        {/*Buttão de adicinar à lista*/}
        <TouchableOpacity activeOpacity={0.55} style={styles.addButton} onPress={()=>setShowCrMo(true)}>
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

export default Home;
