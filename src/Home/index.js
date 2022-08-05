import React, {useState} from 'react';
import { Text, View,TouchableOpacity,Image,StatusBar, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./styles"
import globals from "./../globals"
import TextAviso from "./../components/TextAviso"

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library'
import { StorageAccessFramework } from 'expo-file-system';


const Home=function({navigation, route}){
  const [data,setData]=useState({data:[]})
  const [imageSet,setImageSet]=useState(['cover', 'contain', 'stretch', 'repeat', 'center'])
  const [tmpList,setTmpList]=useState({name:'',dataPos:0})
  // Mostra Janela de configurar
  const [showSMode,setShowSMode]=useState(false)
  // Mostra Janela de criar
  const [showCrMo,setShowCrMo]=useState(false)
  // Mostra Janela de criar
  const [showConfW,setShowConfW]=useState(false)
  // Dis se pode ou não salvar os dados
  const [canSave,setCanSave]=useState(true)
  // Pergunta se realmente quer apagar o item
  const [ask,setAsk]=useState(false)
  // Faz com que os dados sejam carregados só uma vez
  const [ldData,setLdData]=useState(true)
  // A imagem que ira ser carregada pelo picker
  const [image, setImage] = useState(null);
  // Texto temporario
  const [tmp,setTmp]=useState('')

  // Cria elementos da tela 
  // Janela de configuração de item da lista
  const selectResizeMode=()=>{
    // Is pra testar se o conteudo vai ou não ser exibido
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
                  <TextInput 
                    style={globals.setNameInput} 
                    value={tmp} 
                    onChangeText={tmp => setTmp(tmp)} 
                    maxLength={25} 
                    multiline={false}/> 
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
                    <TouchableOpacity style={[styles.setImgButton,globals.alCenter]} onPress={()=>setCapa(1)}>
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
                  <View style={(image)?styles.test:styles.setNameView}>
                  {image &&<Image source={{ uri: image }} style={[styles.imageSets,{resizeMode:'contain',}]} />}
                  <TouchableOpacity 
                    style={[styles.setNameBtn,{backgroundColor:'#a0f'},globals.alCenter]} 
                    onPress={()=>pickImage()}>
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
                    <Text><Text style={{color:'#f00',fontWeight:'bold'}}>DELETAR</Text> o item {tmpList.name} </Text>
                    {ask && <Text style={{color:'#600'}}>Certeza  que quer <Text style={{color:'#f00',fontWeight:'bold'}}>DELETAR</Text> o item <Text style={{textDecorationLine: 'underline'}}>'{tmpList.name}'</Text></Text>}
                  </View>
                  <View style={styles.setNameView}>
                  <TouchableOpacity 
                    style={[styles.setDeleteBtn,globals.alCenter]} 
                    onPress={()=>setAsk(true)}>
                    <Text style={styles.setDeleteBtnText}>DELETAR</Text>
                  </TouchableOpacity>
                    { ask &&
                    <TouchableOpacity 
                      style={[styles.setBtnConfirmation,globals.alCenter,{backgroundColor:'#f00'}]}
                      onPress={()=>{setAsk(false)}}>
                      <Icon name="close" color="#600" size={20}/>
                    </TouchableOpacity>
                    }
                    { ask &&
                    <TouchableOpacity 
                      style={[styles.setBtnConfirmation,globals.alCenter,{backgroundColor:'#0f0'}]} 
                      onPress={()=>{DeleteOperations();setImage(null)}}>
                      <Icon name="check" color="#060" size={20}/>
                    </TouchableOpacity>
                    }
                  </View>
                </View>
            </ScrollView>
            {/*But~ao para fechar tela*/}
            <View style={globals.closeView}>
              <TouchableOpacity style={[globals.closeBtn,globals.alCenter]} onPress={()=>{setTmp('');setShowSMode(false);setImage(null);setImage(null);setAsk(false)}}>
                <Icon name="close" color="#600" size={20}/>
              </TouchableOpacity>
            </View>
          </View>
      )
  }
  // Lista de itens
  const showItemList=()=>{
    return(
    data.data.map((i,index)=>(
      <View key={index} style={styles.itemList}>
          <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('List',{id:i.id,name:i.name})}>
              <Image style={[styles.itemImg,{resizeMode:imageSet[i.imageSet]}]} source={{uri:i.image}}/>
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
  const createItemList=()=>{
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
                  <TextInput 
                    style={globals.setNameInput} 
                      value={tmp} 
                      onChangeText={tmp => setTmp(tmp)} 
                      maxLength={25} 
                      multiline={false}/>        
                  </View>
                </View>
                {/*Configura o tipo de lista*/}

                {/*Configurador do nome da Lista*/}
                <View>
                  <View style={globals.setImgHead}>
                    <Text style={globals.setImgHeadTxt}>IMAGEM</Text>
                  </View>
                  <View style={globals.setImgDesc}>
                    <Text>Selecione uma capa da sua lista</Text>
                  </View>
                  <View style={(image)?styles.test:styles.setNameView}>
                  {image &&<Image source={{ uri: image }} style={[styles.imageSets,{resizeMode:'contain',}]} />}
                  <TouchableOpacity 
                    style={[styles.setNameBtn,{backgroundColor:'#a0f'},globals.alCenter]} 
                    onPress={()=>pickImage(false)}>
                    <Icon name="gear" color="#fff" size={20}/>
                  </TouchableOpacity>
                  </View>
                <View>
                  <View style={globals.saveSetView}>
                    <TouchableOpacity 
                      style={(canSave)?globals.saveBtnOK:globals.saveBtnNot} 
                      onPress={()=>{
                        if(dataCanSave(tmp.trim(),image)){                  
                          setTmp('');                    
                          setImage(null);
                          setShowCrMo(false);
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
              <TouchableOpacity 
                style={[globals.closeBtn,globals.alCenter]} 
                onPress={()=>{setShowCrMo(false);setTmp('');setImage(null)}}>
                <Icon name="close" color="#600" size={20}/>
              </TouchableOpacity>
            </View>
          </View>
    )
  }  
  // Exibi uma janela para Configuara
  const configWindow=()=>{
    return(
     <View style={globals.showSetItem}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {/*Exportação dos dados do app*/}
                <View>
                  <View style={globals.setImgHead}>
                    <Text style={globals.setImgHeadTxt}>EXPORTAR</Text>
                  </View>

                  <View style={globals.setImgDesc}>
                    <Text><Text style={{color:'#f00'}}>*</Text> Click no botão abaixo para <Text style={{color:'#f00'}}>EXPORTAR</Text> os dados do seu app</Text>
                  </View>

                  <TouchableOpacity 
                    style={[globals.saveBtnOK,{backgroundColor:'#a0f',borderWidth:0},globals.alCenter]} 
                    onPress={()=>generateDataBase()}>
                    <Text style={{color:'#fff',fontWeight:'bold'}}>Exportar</Text>
                  </TouchableOpacity>

                </View>
                {/*Importar dos dados pro app*/}
                <View>
                  <View style={globals.setImgHead}>
                    <Text style={globals.setImgHeadTxt}>IMPORTAR</Text>
                  </View>

                  <View style={globals.setImgDesc}>
                    <Text><Text style={{color:'#f00'}}>*</Text> Click no botão abaixo para <Text style={{color:'#f00'}}>IMPORTAR</Text> dados para seu app</Text>
                  </View>

                  <TouchableOpacity 
                    style={[globals.saveBtnOK,{backgroundColor:'#a0f',borderWidth:0},globals.alCenter]} 
                    onPress={()=>createJsonArchive()}>
                    <Text style={{color:'#fff',fontWeight:'bold'}}>Importar</Text>
                  </TouchableOpacity>

                </View>
                

            
            </ScrollView>
            {/*But~ao para fechar tela*/}
            <View style={globals.closeView}>
              <TouchableOpacity 
                style={[globals.closeBtn,globals.alCenter]} 
                onPress={()=>{setShowConfW(false)}}>
                <Icon name="close" color="#600" size={20}/>
              </TouchableOpacity>
            </View>
          </View>
    )
  }
  // Checa se pode salvar
  const dataCanSave=(name,uri)=>{
    if(name==''){
      setCanSave(false)
    }else{
      setShowCrMo(false)
      // [id]=nome
      let key=(Math.floor(Math.random()*8999)+1000).toString(16)
      data.data.push({id:key,name,imageSet:0,image:(uri!=null)?uri:"./../../assets/icon.png"})
      console.log(data)
      saveData(data)
      return true
    }
  }
  // funçãos de configuração
  // Configurar item da lista
  const setCapa=(i)=>{ 
    if(i!=data.data[tmpList.dataPos].imageSet){
      data.data[tmpList.dataPos].imageSet=i
      saveData(data)
    }
  }
  // Configurar o nome do item da lista
  const setName=(i)=>{ 
    if(i!='' && i!=data.data[tmpList.dataPos].name){
      data.data[tmpList.dataPos].name=i
      setTmpList({name:i,dataPos:0})
      saveData(data)
    }
  }
  // consfigura nova imagem capa
  const setNewImage=(i)=>{
      console.log(data)
      // if(i!='' && i!=itemLista.data[tmpList.dataPos].name){
      data.data[tmpList.dataPos].image=i
      saveData(data) 
  }
  // Chamar operações de detete
  const DeleteOperations=()=>{
    DeleteInnerItemData()
    DeleteItem()
    setShowSMode(false)
  }
  // Funçao para deletar item da lista
  const DeleteItem=()=>{
    let dt=[]

    for(let i=0;i<data.data.length;i++){
      if(i!=tmpList.dataPos){
        dt.push(data.data[i])
      }
    }

    data.data=dt

    saveData(data)
  }
  // Escolher imagem
  const pickImage=async(can=true)=>{
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Você negou o acesso a galeria");
      return;
    }
    
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      if(can) setNewImage(result.uri)
    }
  };

  // Gera Arquivo de Banco de dados
  const generateDataBase=async()=>{
    let db=data
    db.data.AppCompatibility="1"
    // console.log(data)
    for(let i=0;i<db.data.length;i++){
      let x=JSON.parse(await AsyncStorage.getItem('@'+db.data[i].id))
      db.data[i].GData=x
      db.data[i].image="./../../assets/icon.png"

    }
    console.log(db)
    createJsonArchive(JSON.stringify(db))
  }

  // Cria um arquivo json
  const createJsonArchive=async(Content)=>{
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
        return;
    }
 
    try {
        await StorageAccessFramework.createFileAsync(permissions.directoryUri, "Data_SList", 'aplication/json')
            .then(async(uri) => {
                await FileSystem.writeAsStringAsync(uri, Content, { encoding: FileSystem.EncodingType.UTF8 });
                alert("Dados Salvos Com Sucesso")
            })
            .catch((e) => {
                console.log(e);
            });
    } catch (e) {
        throw new Error(e);
    }
  }
  // Carrega os dados
  const loadData=async()=>{
    try{      
        const i=await  AsyncStorage.getItem('@i_List')
        setData((i!=null)?JSON.parse(i):{data:[]})
    }catch(error){
      console.log('Erro ao Obter dados');
      RDados()
    }
  }
  // Salva os dados
  const saveData=async(n)=>{
        try {
            await AsyncStorage.setItem('@i_List',JSON.stringify(n))
            console.log('====================================');
            console.log('Dados Salvos');
            console.log('====================================');
        } catch (error) {
            console.log('Erro');
        }
  }
  // Função para deletar dados de dentro de um item item da lista
  const DeleteInnerItemData=async()=>{
    try{
      await AsyncStorage.removeItem('@'+data.data[tmpList.dataPos].id);
      console.log('====================================');
      console.log('Dados Deletados');
      console.log('====================================');
    }catch(err){
      console.log('rolou :'+err)
    }
  }
  // Configurar os dados para o estado inicial
  const RDados=async()=>{
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
        <TouchableOpacity 
          style={[globals.alCenter,globals.itemBtn]}
          onPress={()=>setShowConfW(true)}>
          <Icon name="bars" color="#fff" size={30}/>
        </TouchableOpacity>
      </View>
      {/*Lista*/}
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={globals.listItem}>
        {/*Itens com listas*/}
        {
          showItemList()
        }
        {/*Buttão de adicinar à lista*/}
        <TouchableOpacity 
          activeOpacity={0.55} 
          style={[globals.addButton,globals.alCenter]}
          onPress={()=>{setShowCrMo(true);setCanSave(true)}}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      {
        showSMode && selectResizeMode()
      }
      {
        showCrMo && createItemList()
      }
      {
        showConfW && configWindow()
      }
    </View>
  );
}

export default Home;
