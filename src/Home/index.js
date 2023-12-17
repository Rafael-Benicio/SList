import React, {useState,useEffect} from 'react';
import { Text, View,TouchableOpacity,Image,StatusBar, ScrollView, TextInput, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./styles"
import globals from "./../globals"
import TextAviso from "./../components/TextAviso"

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library'
import { StorageAccessFramework } from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';


const Home=function({navigation, route}){
  const [data,setData]=useState({data:[]})
  const IMAGESET=['cover', 'contain', 'stretch', 'repeat', 'center']
  const [tmpList,setTmpList]=useState({name:'',dataPos:0})
  // Mostra Janela de configurar
  const [showGroupConfigWindow,setShowGroupConfigWindow]=useState(false)
  // Mostra Janela de criar
  const [showCreatWindow,setShowCreatWindow]=useState(false)
  // Mostra Janela de criar
  const [showConfigWindow,setShowConfigWindow]=useState(false)
  // Dis se pode ou não salvar os dados
  const [canSaveGroup,setCanSaveGroup]=useState(true)
  // Pergunta se realmente quer apagar o item
  const [eraseConfirmation,setEraseConfirmation]=useState(false)
  // A imagem que ira ser carregada pelo picker
  const [image, setImage] = useState(null);
  // Texto temporario
  const [tmp,setTmp]=useState('')

  // Carregar dados na entrada
  useEffect(()=>{
    loadData()
    console.log("Carrega")
  },[])

  // Cria elementos da tela 
  // Janela de configuração de item da lista
  const windowToGroupConfig=()=>{
    // Is pra testar se o conteudo vai ou não ser exibido
    return(
          // Configurador do item da lista
          <Modal animationType={"fade"} visible={showGroupConfigWindow} transparent={true}>
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
                      <TouchableOpacity style={[styles.setImgButton,globals.alCenter]} onPress={()=>setCover(0)}> 
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
                      <TouchableOpacity style={[styles.setImgButton,globals.alCenter]} onPress={()=>setCover(1)}>
                        <Text style={styles.setImgBtnTxt}>
                          Conter
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.setImgButton,globals.alCenter]} onPress={()=>setCover(2)}>
                        <Text style={styles.setImgBtnTxt}>
                          Esticar
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.setImgButtons}>
                      <TouchableOpacity style={[styles.setImgButton,globals.alCenter]} onPress={()=>setCover(3)}>
                        <Text style={styles.setImgBtnTxt}>
                          Repetir
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.setImgButton,globals.alCenter]} onPress={()=>setCover(4)}>
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
                      {eraseConfirmation && <Text style={{color:'#600'}}>Certeza  que quer <Text style={{color:'#f00',fontWeight:'bold'}}>DELETAR</Text> o item <Text style={{textDecorationLine: 'underline'}}>'{tmpList.name}'</Text></Text>}
                    </View>
                    <View style={styles.setNameView}>
                    <TouchableOpacity 
                      style={[styles.setDeleteBtn,globals.alCenter]} 
                      onPress={()=>setEraseConfirmation(true)}>
                      <Text style={styles.setDeleteBtnText}>DELETAR</Text>
                    </TouchableOpacity>
                      { eraseConfirmation &&
                      <TouchableOpacity 
                        style={[styles.setBtnConfirmation,globals.alCenter,{backgroundColor:'#f00'}]}
                        onPress={()=>{setEraseConfirmation(false)}}>
                        <Icon name="close" color="#600" size={20}/>
                      </TouchableOpacity>
                      }
                      { eraseConfirmation &&
                      <TouchableOpacity 
                        style={[styles.setBtnConfirmation,globals.alCenter,{backgroundColor:'#0f0'}]} 
                        onPress={()=>{DeleteOperations();setImage(null);setEraseConfirmation(false)}}>
                        <Icon name="check" color="#060" size={20}/>
                      </TouchableOpacity>
                      }
                    </View>
                  </View>
              </ScrollView>
              {/*But~ao para fechar tela*/}
              <View style={globals.closeView}>
                <TouchableOpacity style={[globals.closeBtn,globals.alCenter]} onPress={()=>{setTmp('');setShowGroupConfigWindow(false);setImage(null);setEraseConfirmation(false)}}>
                  <Icon name="close" color="#600" size={20}/>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
      )
  }
  
  const renderGroupList=()=>{
    return(
    data.data.map((group,index)=>(
      <View key={index} style={styles.itemList}>
          <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('List',{id:group.id,name:group.name})}>
              <Image style={[styles.itemImg,{resizeMode:IMAGESET[group.imageSet]}]} source={{uri:group.image}}/>
          </TouchableOpacity>
        {/*Engrenagem de configuração  */}
        <TouchableOpacity style={[styles.itemGear,globals.alCenter]} onPress={
          ()=>{
            setTmpList({name:group.name,dataPos:index});
            (showGroupConfigWindow)? setShowGroupConfigWindow(false):setShowGroupConfigWindow(true);
          }
          }>
          <Icon name="gear" color="#fff" size={20}/>
        </TouchableOpacity>
        {/*Texto com nome da lista*/}
        <Text style={styles.itemText}>{group.name}</Text>
      </View>
    ))
    )
  }
  // Exibi uma janela para criar e configurar uma lista
  const windowToCreateGroupList=()=>{
    return(
      <Modal animationType={"fade"} visible={showCreatWindow} transparent={true}>
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
                    style={(canSaveGroup)?globals.saveBtnOK:globals.saveBtnNot} 
                    onPress={()=>{
                      if(dataCanSaveGroup(tmp.trim(),image)){                  
                        setTmp('');                    
                        setImage(null);
                        setShowCreatWindow(false);
                      }
                    }}>
                      <Icon name="check" color={(canSaveGroup)?'#0a0':'#600'} size={30}/>
                  </TouchableOpacity>
                  {
                    TextAviso(canSaveGroup)
                  }
                </View>
              </View>
            </View>

            </ScrollView>
            {/*But~ao para fechar tela*/}
              <View style={globals.closeView}>
                <TouchableOpacity 
                  style={[globals.closeBtn,globals.alCenter]} 
                  onPress={()=>{setShowCreatWindow(false);setTmp('');setImage(null)}}>
                  <Icon name="close" color="#600" size={20}/>
                </TouchableOpacity>
              </View>
          </View>
        </Modal>
    )
  }  
  // Exibi uma janela para Configuara
  const windowToConfig=()=>{
    return(
    <Modal animationType={"fade"} visible={showConfigWindow} transparent={true}>
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
                    onPress={()=>getDataBaseAndCreateJSON()}>
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
                    onPress={()=>getImportDataBase()}>
                    <Text style={{color:'#fff',fontWeight:'bold'}}>Importar</Text>
                  </TouchableOpacity>

                </View>
                

            
            </ScrollView>
            {/*But~ao para fechar tela*/}
            <View style={globals.closeView}>
              <TouchableOpacity 
                style={[globals.closeBtn,globals.alCenter]} 
                onPress={()=>{setShowConfigWindow(false)}}>
                <Icon name="close" color="#600" size={20}/>
              </TouchableOpacity>
            </View>
          </View>
    </Modal>
    )
  }
  // Checa se pode salvar
  const dataCanSaveGroup=(name,uri)=>{
    if(name==''){
      setCanSaveGroup(false)
    }else{
      setShowCreatWindow(false)
      // [id]=nome
      let key=(Math.floor(Math.random()*899999)).toString(16)
      data.data.push({id:key,name,imageSet:0,image:(uri!=null)?uri:"./../../assets/icon.png"})
      console.log(data)
      saveData(data)
      return true
    }
  }
  // funçãos de configuração
  // Configurar item da lista
  const setCover=(img)=>{ 
    if(img!=data.data[tmpList.dataPos].imageSet){
      data.data[tmpList.dataPos].imageSet=img
      saveData(data)
    }
  }
  // Configurar o nome do item da lista
  const setName=(newName)=>{ 
    if(newName!='' && newName!=data.data[tmpList.dataPos].name){
      data.data[tmpList.dataPos].name=i
      setTmpList({name:newName,dataPos:0})
      saveData(data)
    }
  }
  // consfigura nova imagem capa
  const setNewCoverImage=(img)=>{
      console.log(data)

      data.data[tmpList.dataPos].image=img
      saveData(data) 
  }
  // Chamar operações de detete
  const DeleteOperations=()=>{
    DeleteInnerItemData()
    DeleteItem()
    setShowGroupConfigWindow(false)
  }
  // Funçao para deletar item da lista
  const DeleteItem=()=>{
    let newData=[]

    for(let index=0;index<data.data.length;index++){
      if(index!=tmpList.dataPos){
        newData.push(data.data[index])
      }
    }

    data.data=newData

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
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      if(can) setNewCoverImage(result.assets[0].uri)
    }
  };

  // Gera Arquivo de Banco de dados
  const getDataBaseFromStorage=async()=>{
    let dataBase=data

    for(let index=0;index<dataBase.data.length;index++){
      let x=JSON.parse(await AsyncStorage.getItem('@'+dataBase.data[index].id))
      dataBase.data[index].GData=x
      dataBase.data[index].image="./../../assets/icon.png"

    }

    return dataBase
  }

  const getDataBaseAndCreateJSON=(dataBase)=>{
    getDataBaseFromStorage().then(JSONContent=>createJSONArchive(JSONContent))
  }

  // Ler conteudo do banco de dados importado e retorna um json
  const getImportDataBase=async()=>{
    const uri = await DocumentPicker.getDocumentAsync().then(obj=> obj.assets[0].uri);
    
    let importedDataBase=null;

    try {
      importedDataBase = JSON.parse(await FileSystem.readAsStringAsync(uri));
    } catch (e) {
      console.log("Error reading as string", e);
      return 0;
    }
    
    let dataBase=data
    dataBase.data=dataBase.data.concat(importedDataBase.data)
    saveData(dataBase)
    
    for(let i=0;i<importedDataBase.data.length;i++){
      try{
        await AsyncStorage.setItem(
          '@'+importedDataBase.data[i].id,
          JSON.stringify(importedDataBase.data[i].GData)
          )
      }catch(e){
        alert("erro ao carregar o conteudo do grupo")
        console.log(e)
      }
    }
    data.data.forEach((element,index,arr)=> {
      element.GData=[]
    })
    saveData(data)
  }
  
  const createJSONArchive=async(JSONContent)=>{
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
        return;
    }
    try {
        await StorageAccessFramework.createFileAsync(permissions.directoryUri, "Data_SList", 'aplication/json')
            .then(async(uri) => {
                await FileSystem.writeAsStringAsync(uri, JSON.stringify(JSONContent), { encoding: FileSystem.EncodingType.UTF8 });
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
        const dataBaseFromStorage=await  AsyncStorage.getItem('@i_List')
        setData((dataBaseFromStorage!=null)?JSON.parse(dataBaseFromStorage):{data:[]})
    }catch(error){
      console.log('Erro ao Obter dados');
      rezetData()
    }
  }
  // Salva os dados
  const saveData=async(modifiedDataBase)=>{
        try {
            await AsyncStorage.setItem('@i_List',JSON.stringify(modifiedDataBase))
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
  const rezetData=async()=>{
    await AsyncStorage.setItem('@i_List',JSON.stringify({data:[]}))
    alert("Dados Resetados")
  } 

  return (
    <View style={globals.background}>
      <StatusBar backgroundColor="#000"/>
      {/*Cabeçalho*/}
      <View style={globals.header}>
        <Text style={globals.headerText}>SList</Text>
        <TouchableOpacity 
          style={[globals.alCenter,globals.itemBtn]}
          onPress={()=>setShowConfigWindow(true)}>
          <Icon name="bars" color="#fff" size={30}/>
        </TouchableOpacity>
      </View>
      {/*Lista*/}
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={globals.listItem}>
        {/*Itens com listas*/}
        {
          renderGroupList()
        }
        {/*Buttão de adicinar à lista*/}
        <TouchableOpacity 
          activeOpacity={0.55} 
          style={[globals.addButton,globals.alCenter]}
          onPress={()=>{setShowCreatWindow(true);setCanSaveGroup(true)}}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      {
        windowToGroupConfig()
      }
      {
        windowToCreateGroupList()
      }
      {
        windowToConfig()
      }
    </View>
  );
}

export default Home;
