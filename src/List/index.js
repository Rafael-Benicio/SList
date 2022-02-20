import React, {useState, useEffect} from 'react';
import {AppState ,View, Text, TouchableOpacity, TextInput,StatusBar, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'

import globals from "./../globals"
import styles from "./styles"

import TextAviso from "./../components/TextAviso"

const List=function({navigation, route}){
  // Parametro passados por Home
  const parentData=route.params  
  // Informações carregadas do storage
  const [data,setData]=useState({data:[]})
  // Janela para criação de item
  const [showCrMo,setShowCrMo]=useState(false)
  // Controla o carregamento da pagina
  const [ldData,setLdData]=useState(true)
  // Checa se o elemento pode ou não ser salvo
  const [canSave,setCanSave]=useState(true)
  // Exibição dos botões de apagar item
  const [erase,setErase]=useState(false)
  // Caixas de texto da janela
  const [tmp,setTmp]=useState('')
  const [tmpText,setTmpText]=useState('')

  // salva os dados caso usuario saia do app
  useEffect(()=>{
    AppState.addEventListener('change', state => {
    if (state === 'background') {
      console.log('back')
      saveData(data)
    } else if (state === 'inactive') {
      console.log('inactive')
      saveData(data)
    }
    });
  })

  // Retorna o estilo de i.name
  const nameSize=(i)=>{
    if(i.length<=7){
      return "itemText_1"
    }else if(i.length<=11){
      return "itemText_2"
    }
    else if(i.length<=20){
      return "itemText_3"
    }
    else if(i.length<=25){
      return "itemText_4"
    }
  }

  // Checa se os dados passado são minimos pra criar um novo item
  const createNewData=(name,desc)=>{
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

  // delete itens da lista
  const deleteItem=(id)=>{
    let dt=[]
    for(let i=0;i<data.data.length;i++){
      if(i!=getIndex(id)) dt.push(data.data[i])
    }
    data.data=dt
    console.log(data)
    saveData(data)
    setLdData(true)
  }

  //Ordenar os dados pelo record
  const orderRecord=()=>{    
    let x=data.data.sort((a,b)=>{
      if(a.record<b.record) return -1
      else if(a.record>b.record) return 1
    })

    data.data=x
    setData(data)
    setLdData(true)
  }
    //Ordenar os dados pelo nome
  const orderName=()=>{    
    let x=data.data.sort((a,b)=>{
      if(a.name<b.name) return -1
      else if(a.name>b.name) return 1
    })

    data.data=x
    setData(data)
    setLdData(true)
  }

  // Descobre o index do elemento com base no id
  const getIndex=(id)=>{
    let key=0
    data.data.map((i,index)=>{
      if(i.id==id) key=index
    })
    return key
  }

  // Trata o valor passado por onChangeText
  const filterValue=(x,id)=>{setData({...data,...data.data[getIndex(id)].record=parseInt(x)})}

  // Carrega os dados
  const loadData=async()=>{
    try{      
        const i=await  AsyncStorage.getItem('@'+parentData.id)
        setData((i!=null)?JSON.parse(i):{data:[]})
    }catch(error){
      console.log('Erro ao Obter dados');
      RDados()
    }
  }

  // Salva os dados
  const saveData=async(n)=>{
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
  const RDados=async()=>{
    await AsyncStorage.setItem('@'+parentData.id,JSON.stringify({data:[]}))
        console.log("Dados Resetados")
  } 

  // Gera lista de elementos
  const listElement=()=>{
    return(
      data.data.map(i=>{

        // Elemento description
        const description=()=>{
            return(
              <View style={styles.itemDescView}>
                <Text style={styles.itemDescText}>{i.desc}</Text>
              </View>
            )
        } 

        return(
          <View key={i.id} style={styles.itemView}>
            <View style={styles.itemViewValues}>
              {/* Lixeira */}
              { erase &&
              <TouchableOpacity 
                style={[globals.alCenter,styles.itemTrash]}
                onPress={()=>deleteItem(i.id)}>
                <Icon name="trash" color={'#fff'} size={30}/>
              </TouchableOpacity>}
              {/* Butão com o nome do item */}
              <TouchableOpacity 
                style={styles.itemBtnText} 
                disabled={(i.desc=='')} 
                onPress={()=>setData(dt=>{return{...dt,...dt.data[getIndex(i.id)].showDesc=(i.showDesc)?false:true}})}
                ><Text style={styles[nameSize(i.name)]}>{i.name}</Text>
              </TouchableOpacity>
              <View style={styles.itemBtns}>
              {/* Botão de '-' */}
              { !erase &&
              <TouchableOpacity 
                style={[styles.itemBtn,globals.alCenter,{backgroundColor:'#0f0'}]}
                disabled={erase}
                onPress={()=>setData(dt=>{return{...dt,...dt.data[getIndex(i.id)].record=i.record-1}})}
                ><Text style={{fontSize:35}}>-</Text>
              </TouchableOpacity>
              }
              {/* Input de texto e exição */}
              <TextInput 
                style={(erase)?styles.itemInputE:styles.itemInput} 
                value={`${i.record}`} 
                onChangeText={tmp =>filterValue(tmp,i.id)} 
                maxLength={4} 
                multiline={false}
                keyboardType={"phone-pad"}
                selectionColor={"#fff"}
                editable={!erase}
              />            
              {/* Botão de '+' */}
              {!erase && 
                <TouchableOpacity 
                  style={[styles.itemBtn,globals.alCenter,{backgroundColor:'#0f0'}]} 
                  disabled={erase}
                  onPress={()=>setData(dt=>{return{...dt,...dt.data[getIndex(i.id)].record=i.record+1}})}
                  ><Text style={{fontSize:25}}>+</Text>
                </TouchableOpacity>
              }
              </View>
            </View>
            {
              i.showDesc && description()
            }
          </View>
          )
        }
      )
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
                    <Text><Text style={{color:'#f00'}}>*</Text> Escreva o nome da lista</Text>
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
                <View>
                  <View style={globals.setImgHead}>
                    <Text style={globals.setImgHeadTxt}>COMENTÁRIO</Text>
                  </View>
                  <View style={globals.setImgDesc}>
                    <Text>Escreva um comentário</Text>
                  </View>
                  <View style={styles.setNameView}>
                    <TextInput 
                      style={[globals.setNameInput,styles.setHeight]} 
                      value={tmpText} 
                      onChangeText={tmp => setTmpText(tmp)} 
                      maxLength={100} 
                      multiline={true}/>
                  </View>
                </View>
                {/*Botão de salvar dados*/}
                <View style={globals.saveSetView}>
                    <TouchableOpacity 
                      style={(canSave)?globals.saveBtnOK:globals.saveBtnNot} 
                      onPress={()=>{
                        let t=createNewData(tmp,tmpText)
                        setShowCrMo(!t)
                        setTmp((t)?'':tmp)
                        setTmpText((t)?'':tmpText)
                        setCanSave((t)?true:false)
                      }}>
                        <Icon name="check" color={(canSave)?'#0a0':'#600'} size={30}/>
                    </TouchableOpacity>
                    {
                      TextAviso(canSave)
                    }
                  </View>
            </ScrollView>
            {/*But~ao para fechar tela*/}
            <View style={globals.closeView}>
              <TouchableOpacity style={[globals.closeBtn,globals.alCenter]} onPress={()=>{setShowCrMo(false);setTmp('')}}>
                <Icon name="close" color="#600" size={20}/>
              </TouchableOpacity>
            </View>
          </View>
    )
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
        <TouchableOpacity 
          onPress={()=>{saveData(data);navigation.navigate('Home')}}
          style={[styles.backBtnView,]}
          >
        <Text style={globals.headerText}>{parentData.name}</Text>
        </TouchableOpacity>
        {/*Botão para mostrar botões de apagar*/}
        <TouchableOpacity 
          onPress={()=>orderName()}
          // onPress={()=>setErase((erase)?false:true)}
          style={[globals.alCenter,styles.itemBtn]}
          >
        <Icon name="gear" color={(erase)?"#900":'#fff'} size={30}/>
        {/*<Icon name="trash" color={(erase)?"#900":'#fff'} size={30}/>*/}
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      {
        listElement()
      }
      <View style={globals.listItem}>
        {/*Buttão de adicinar à lista*/}
        <TouchableOpacity activeOpacity={0.55} style={[globals.addButton,globals.alCenter]} onPress={()=>{setShowCrMo(true);setCanSave(true)}}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      {
        showCrMo && createItemList()
      }
    </View>
  );
}

export default List;