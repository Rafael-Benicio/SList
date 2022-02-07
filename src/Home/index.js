import React, {useState} from 'react';
import { Text, View,TouchableOpacity,Image,StatusBar, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./styles"
import globals from "./../globals"
import TextAviso from "./../components/TextAviso"

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
          <View style={globals.showSetItem}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {/*Configurador do nome da Lista*/}
                <View>
                  <View style={globals.setImgHead}>
                    <Text style={globals.setImgHeadTxt}>NOME</Text>
                  </View>
                  <View style={globals.setImgDesc}>
                    <Text>Configura o nome de {tmpList.name}</Text>
                  </View>
                  <View style={styles.setNameView}>
                  <TextInput style={globals.setNameInput} value={tmp} onChangeText={tmp => setTmp(tmp)} maxLength={10} multiline={false}/>
                  <TouchableOpacity style={[styles.setNameBtn,globals.alCenter]} onPress={()=>setName(tmp)}>
                    <Icon name="check" color="#fff" size={20}/>
                  </TouchableOpacity>
                  </View>
                </View>
                {/*Configurador da imagen da lista*/}
                <View>
                  <View style={globals.setImgHead}>
                    <Text style={globals.setImgHeadTxt}>CAPA</Text>
                    <TouchableOpacity style={[styles.setImgButton,globals.alCenter]} onPress={()=>setCapa(0)}> 
                      <Text style={styles.setImgBtnTxt}>
                        Padrão
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={globals.setImgDesc}>
                    <Text>Configuração da imagem de capa de {tmpList.name}</Text>
                  </View>
                  <View style={styles.setImgViewButtons}>
                  <View style={styles.setImgButtons}>
                    <TouchableOpacity style={[styles.setImgButton,globals.globals]} onPress={()=>setCapa(1)}>
                      <Text style={styles.setImgBtnTxt}>
                        Conter
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.setImgButton,globals.alCenter]} onPress={()=>setCapa(2)}>
                      <Text style={styles.setImgBtnTxt}>
                        Esticar
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.setImgButtons}>
                    <TouchableOpacity style={[styles.setImgButton,globals.alCenter]} onPress={()=>setCapa(3)}>
                      <Text style={styles.setImgBtnTxt}>
                        Repetir
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.setImgButton,globals.alCenter]} onPress={()=>setCapa(4)}>
                      <Text style={styles.setImgBtnTxt}>
                        Centralizar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/*Configurador do nome da Lista*/}
                <View>
                  <View style={globals.setImgHead}>
                    <Text style={globals.setImgHeadTxt}>IMAGEM</Text>
                  </View>
                  <View style={globals.setImgDesc}>
                    <Text>Configura a imagem de {tmpList.name}</Text>
                  </View>
                  <View style={styles.setNameView}>
                  <TextInput style={globals.setNameInput} multiline={false}/>
                  <TouchableOpacity style={[styles.setNameBtn,{backgroundColor:'#a0f'},globals.alCenter]} onPress={()=>setName(tmp)}>
                    <Icon name="gear" color="#fff" size={20}/>
                  </TouchableOpacity>
                  </View>
                </View>
              {/*Deletar item*/}
                <View>
                  <View style={globals.setImgHead}>
                    <Text style={globals.setImgHeadTxt}>DELETAR</Text>
                  </View>
                  <View style={globals.setImgDesc}>
                    <Text><Text style={{color:'#f00',fontWeight:'bold'}}>DELETAR</Text> o item {tmpList.name}</Text>
                  </View>
                  <View style={styles.setNameView}>
                  <TouchableOpacity style={[styles.setDeleteBtn,globals.alCenter]} onPress={()=>{DeleteOperations()}}>
                    <Text style={styles.setDeleteBtnText}>DELETAR</Text>
                  </TouchableOpacity>
                  </View>
                </View>
            </ScrollView>
            {/*But~ao para fechar tela*/}
            <View style={globals.closeView}>
              <TouchableOpacity style={[globals.closeBtn,globals.alCenter]} onPress={()=>{setTmp('');setShowSMode(false)}}>
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
        <TouchableOpacity style={[styles.itemGear,globals.alCenter]} onPress={
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
     <View style={globals.showSetItem}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {/*Configurador do nome da Lista*/}
                <View>
                  <View style={globals.setImgHead}>
                    <Text style={globals.setImgHeadTxt}>NOME</Text>
                  </View>
                  <View style={globals.setImgDesc}>
                    <Text><Text style={{color:'#f00'}}>*</Text> Escreva o nome do item</Text>
                  </View>
                  <View style={styles.setNameView}>
                  <TextInput style={globals.setNameInput} value={tmp} onChangeText={tmp => setTmp(tmp)} maxLength={10} multiline={false}/>
                  </View>
                </View>
                {/*Configura o tipo de lista*/}
                <View>
                  <View style={globals.setImgHead}>
                    <Text style={globals.setImgHeadTxt}>TIPO</Text>
                  </View>
                  <View style={globals.setImgDesc}>
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
                  <View style={globals.setImgHead}>
                    <Text style={globals.setImgHeadTxt}>IMAGEM</Text>
                  </View>
                  <View style={globals.setImgDesc}>
                    <Text>Selecione uma capa da sua lista</Text>
                  </View>
                  <View style={styles.setNameView}>
                  <TextInput style={globals.setNameInput} multiline={false}/>
                  <TouchableOpacity style={[styles.setNameBtn,{backgroundColor:'#a0f'},globals.alCenter]}>
                    <Icon name="gear" color="#fff" size={20}/>
                  </TouchableOpacity>
                  </View>
                <View>
                  <View style={globals.saveSetView}>
                    <TouchableOpacity style={(canSave)?globals.saveBtnOK:globals.saveBtnNot} onPress={()=>{
                        if(dataCanSave(tmp.trim(),tipo)){                  
                          setTmp('');
                          setTipo(true);
                          setShowCrMo(false)
                        }
                      }}>
                        <Icon name="check" color={(canSave)?'#0a0':'#600'} size={30}/>
                    </TouchableOpacity>
                    {
                      TextAviso(canSave)
                    }
                  </View>
                </View>
              </View>
            </ScrollView>
            {/*But~ao para fechar tela*/}
            <View style={globals.closeView}>
              <TouchableOpacity style={[globals.closeBtn,globals.alCenter]} onPress={()=>{setShowCrMo(false);setTmp('');setTipo(true)}}>
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
      return true
    }
  }

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
  // Chamar operações de detete
  function DeleteOperations(){
    DeleteInnerItemData()
    DeleteItem()
    setShowSMode(false)
  }
  // Função para deletar dados de dentro de um item item da lista
  async function DeleteInnerItemData(){
    try{
      await AsyncStorage.removeItem('@'+itemLista.data[tmpList.dataPos].id);
      console.log('====================================');
      console.log('Dados Deletados');
      console.log('====================================');
    }catch(err){
      console.log('rolou :'+err)
    }
  }
  // Funçao para deletar item da lista
  function DeleteItem(){
    let dt=[]

    for(let i=0;i<itemLista.data.length;i++){
      if(i!=tmpList.dataPos){
        dt.push(itemLista.data[i])
      }
    }

    itemLista.data=dt

    saveData(itemLista)
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
    <View style={globals.background}>
      <StatusBar backgroundColor="#000"/>
      {/*Cabeçalho*/}
      <View style={globals.header}>
        <Text style={globals.headerText}>SList</Text>
      </View>
      {/*Lista*/}
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={globals.listItem}>
        {/*Itens com listas*/}
        {
          showItemList()
        }
        {/*Buttão de adicinar à lista*/}
        <TouchableOpacity activeOpacity={0.55} style={[globals.addButton,globals.alCenter]} onPress={()=>{setShowCrMo(true);setCanSave(true)}}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
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
