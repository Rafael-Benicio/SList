import React, {useState} from 'react';
import { View, Text, TouchableOpacity, TextInput,StatusBar } from 'react-native';

import styles from "./styles"

const List=function({navigation, route}){
  const parentData=route.params
  const [data,setData]=useState({data:[{name:'Souso',record:0,desc:'Um pequeno texto da minha parte para falar algo e descrever essa x obra'}]})
  // img:require("./../../assets/icon.png"),name:'Nome'


  // Cria elemento da lista
  function listElement(){
    const [tmp,setTmp]=useState(data.data[0].record)
    const [descShow,setDescShow]=useState(false)
    // Adiciona 1 em record
    const addUm=()=>{
      data.data[0].record+=1
      setTmp(tmp+1)
      setData(data)
    }
    // Subtrai 1 de record
    const subUm=()=>{
      data.data[0].record-=1
      setTmp(tmp-1)
      setData(data)
    }
    // Trata o valor passado por onChangeText
    const filterValue=(x)=>{
      data.data[0].record=parseInt(x)
      setData(data)
      return parseInt(x)
    }
    // Elemento description
    const description=()=>{
      if(descShow){

      return(
          <View style={styles.itemDescView}>
            <Text style={styles.itemDescText}>{data.data[0].desc}</Text>
          </View>
        )
      }
    } 

    return(
            <View style={styles.itemView}>
              <View style={styles.itemViewValues}>
                <TouchableOpacity style={styles.itemBtnText} onPress={()=>setDescShow((descShow)?false:true)}>
                  <Text style={styles.itemText}>{data.data[0].name}</Text>
                </TouchableOpacity>
              <View style={styles.itemBtns}>
              <TouchableOpacity 
                style={styles.itemBtn} 
                onPress={()=>addUm()}
                ><Text style={{fontSize:25}}>+</Text>
              </TouchableOpacity>
              <TextInput 
                style={styles.itemInput} 
                value={`${tmp}`} 
                onChangeText={tmp =>setTmp(filterValue(tmp))} 
                maxLength={4} 
                multiline={false}
                keyboardType={"phone-pad"}
                selectionColor={"#fff"}
              />
              <TouchableOpacity 
                style={styles.itemBtn}
                onPress={()=>subUm()}
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


  //   // Carrega os dados
  // async function loadData(){
  //   try{      
  //       const i=await  AsyncStorage.getItem('@'+parentData.id)
  //       setData((i!=null)?JSON.parse(i):[])
  //   }catch(error){
  //     console.log('Erro ao Obter dados');
  //     RDados()
  //   }
  // }
  // // Salva os dados
  // async function saveData(n){
  //       try {
  //           await AsyncStorage.setItem('@'+parentData.id,JSON.stringify(n))
  //           console.log('====================================');
  //           console.log('Dados Salvos');
  //           console.log('====================================');
  //       } catch (error) {
  //           console.log('Erro');
  //       }
  // }

  // // Configurar os dados para o estado inicial
  // async function RDados (){
  //   await AsyncStorage.setItem('@'+parentData.id,JSON.stringify({data:[]}))
  //       console.log("Dados Resetados")
  // } 

  // loadData()

  return (
    <View style={styles.background}>
      <StatusBar backgroundColor="#000"/>
      {/*Cabeçalho*/}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
        <Text style={styles.headerText}>{parentData.name}</Text>
        </TouchableOpacity>
      </View>
      {
        listElement()
      }
      <View style={styles.listItem}>
        {/*Buttão de adicinar à lista*/}
        <TouchableOpacity activeOpacity={0.55} style={styles.addButton}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default List;