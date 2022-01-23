import React, {useState} from 'react';
import { View, Text, TouchableOpacity, TextInput,StatusBar, ScrollView } from 'react-native';
import styles from "./styles"
import Icon from 'react-native-vector-icons/FontAwesome'

const List=function({navigation, route}){
  const parentData=route.params  
  const [showCrMo,setShowCrMo]=useState(true)
  const [data,setData]=useState({data:[
          {name:'Souso',record:0,desc:'Um pequeno texto da minha parte para falar algo e descrever essa x obra'},
          {name:'João',record:1,desc:'Um pequeno texto da minha parte para falar algo e descrever essa x obra'}]})
  // {data:[{name:'Souso',record:0,desc:'Um pequeno texto da minha '}]}
  // img:require("./../../assets/icon.png"),name:'Nome'


  // Cria elemento da lista
  function listElement(index){
    const [tmp,setTmp]=useState(data.data[index].record)
    const [descShow,setDescShow]=useState(false)
    // Adiciona 1 em record
    const addUm=()=>{
      data.data[index].record+=1
      setTmp(tmp+1)
      setData(data)
    }
    // Subtrai 1 de record
    const subUm=()=>{
      data.data[index].record-=1
      setTmp(tmp-1)
      setData(data)
    }
    // Trata o valor passado por onChangeText
    const filterValue=(x)=>{
      data.data[index].record=parseInt(x)
      setData(data)
      return parseInt(x)
    }
    // Elemento description
    const description=()=>{
      if(descShow){

      return(
          <View style={styles.itemDescView}>
            <Text style={styles.itemDescText}>{data.data[index].desc}</Text>
          </View>
        )
      }
    } 

    return(
            <View style={styles.itemView}>
              <View style={styles.itemViewValues}>
                <TouchableOpacity style={styles.itemBtnText} onPress={()=>setDescShow((descShow)?false:true)}>
                  <Text style={styles.itemText}>{data.data[index].name}</Text>
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

  // Exibi uma janela para criar e configurar uma lista
  function createItemList(){
    const [tmp,setTmp]=useState('')
    const [tmpText,setTmpText]=useState('')
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
                    <TouchableOpacity style={(true)?styles.saveBtnOK:styles.saveBtnNot}>
                        <Icon name="check" color={(true)?'#0a0':'#600'} size={30}/>
                    </TouchableOpacity>
                    {
                      // TextAviso()
                    }
                  </View>
            </ScrollView>
            {/*But~ao para fechar tela*/}
            <View style={styles.closeView}>
              <TouchableOpacity style={styles.closeBtn}>
                <Icon name="close" color="#600" size={20}/>
              </TouchableOpacity>
            </View>
          </View>
    )}
  }

  // // Carrega os dados
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
        data.data.map((i,index)=>listElement(index))
      }
      <View style={styles.listItem}>
        {/*Buttão de adicinar à lista*/}
        <TouchableOpacity activeOpacity={0.55} style={styles.addButton}>
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