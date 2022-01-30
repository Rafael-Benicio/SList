import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, TextInput,StatusBar, ScrollView } from 'react-native';
import styles from "./styles"
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';

const List=function({navigation, route}){
  const parentData=route.params  
  const [showCrMo,setShowCrMo]=useState(false)
  const [data,setData]=useState({data:[]})
  const [ldData,setLdData]=useState(true)
  // {id:'wkjwk',name:'Souso',record:0,desc:'Um pequea',showDesc:false},

  // Descobre o index do elemento com base no id
  function getIndex(id){
    let key=0
    data.data.map((i,index)=>{
      if(i.id==id) key=index
    })
    return key
  }

  // Trata o valor passado por onChangeText
  function filterValue(x,id){
    setData({...data,...data.data[getIndex(id)].record=parseInt(x)})
  }

  function listElement(){
    // Elemento description
    return(
      data.data.map((i,index)=>{

        function description(){
          if(!(i.desc=='')&& i.showDesc){
            return(
              <View style={styles.itemDescView}>
                <Text style={styles.itemDescText}>{i.desc}</Text>
              </View>
            )
          }
        } 

        return(
          <View key={i.id} style={styles.itemView}>
            <View style={styles.itemViewValues}>
              <TouchableOpacity 
                style={styles.itemBtnText}  
                onPress={()=>setData(dt=>{return{...dt,...dt.data[getIndex(i.id)].showDesc=(i.showDesc)?false:true}})}>
                <Text style={styles.itemText}>{i.name}</Text>
              </TouchableOpacity>
            <View style={styles.itemBtns}>
            <TouchableOpacity 
              style={styles.itemBtn} 
              onPress={()=>setData(dt=>{return{...dt,...dt.data[getIndex(i.id)].record=i.record+1}})}
              ><Text style={{fontSize:25}}>+</Text>
            </TouchableOpacity>
            <TextInput 
              style={styles.itemInput} 
              value={`${i.record}`} 
              onChangeText={tmp =>filterValue(tmp,i.id)} 
              maxLength={4} 
              multiline={false}
              keyboardType={"phone-pad"}
              selectionColor={"#fff"}
            />
            <TouchableOpacity 
              style={styles.itemBtn}
              onPress={()=>setData(dt=>{return{...dt,...dt.data[getIndex(i.id)].record=i.record-1}})}
              ><Text style={{fontSize:35}}>-</Text>
            </TouchableOpacity>
            </View>
            </View>
            {
              description()
            }
          </View>
          )
        }
      )
    )
  }

  // Exibi uma janela para criar e configurar uma lista
  function createItemList(){
    const [tmp,setTmp]=useState('')
    const [tmpText,setTmpText]=useState('')

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
                    <Text><Text style={{color:'#f00'}}>*</Text> Escreva o nome da lista</Text>
                  </View>
                  <View style={styles.setNameView}>
                    <TextInput style={styles.setNameInput} value={tmp} onChangeText={tmp => setTmp(tmp)} maxLength={10} multiline={false}/>
                  </View>
                </View>
                {/*Configura o tipo de lista*/}
                <View>
                  <View style={styles.setImgHead}>
                    <Text style={styles.setImgHeadTxt}>COMENTÁRIO</Text>
                  </View>
                  <View style={styles.setImgDesc}>
                    <Text>Escreva um comentário</Text>
                  </View>
                  <View style={styles.setNameView}>
                    <TextInput style={[styles.setNameInput,styles.setHeight]} value={tmpText} onChangeText={tmp => setTmpText(tmp)} maxLength={500} multiline={true}/>
                  </View>
                </View>
                <View style={styles.saveSetView}>
                    <TouchableOpacity 
                      style={(true)?styles.saveBtnOK:styles.saveBtnNot} 
                      onPress={()=>{setShowCrMo(!(createNewData(tmp,tmpText)))}}>
                        <Icon name="check" color={(true)?'#0a0':'#600'} size={30}/>
                    </TouchableOpacity>
                    {
                      // TextAviso()
                    }
                  </View>
            </ScrollView>
            {/*But~ao para fechar tela*/}
            <View style={styles.closeView}>
              <TouchableOpacity style={styles.closeBtn} onPress={()=>{setShowCrMo(false);setTmp('')}}>
                <Icon name="close" color="#600" size={20}/>
              </TouchableOpacity>
            </View>
          </View>
    )}
  }

  // Checa se os dados passado são minimos pra criar um novo item
  function createNewData(name,desc){
    if(name!=''){
      // {id:'wkjwk',name:'',record:0,desc:''},
      let key=(Math.floor(Math.random()*8999)+1000).toString(16)
      data.data.push({id:key,name,record:0,desc,showDesc:false})
      console.log(data.data)
      saveData(data)
      return true
    }else{
      return false
    }
  }

  // Carrega os dados
  async function loadData(){
    try{      
        const i=await  AsyncStorage.getItem('@'+parentData.id)
        setData((i!=null)?JSON.parse(i):{data:[]})
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

  if(ldData){
    loadData()
    setLdData(false)
  }

  return (
    <View style={styles.background}>
      <StatusBar backgroundColor="#000"/>
      {/*Cabeçalho*/}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>{saveData(data);navigation.navigate('Home')}}>
        <Text style={styles.headerText}>{parentData.name}</Text>
        </TouchableOpacity>
      </View>
      {
        listElement()
      }
      <View style={styles.listItem}>
        {/*Buttão de adicinar à lista*/}
        <TouchableOpacity activeOpacity={0.55} style={styles.addButton} onPress={()=>setShowCrMo(true)}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      {
        createItemList()
      }
    </View>
  );
}

export default List;