import React, {useState} from 'react';
import { Text } from 'react-native';
// Mansagem de aviso
const TextAviso=(cSave=true)=>{
  if(!cSave) return <Text style={{color:'#f00',fontSize:15}}>Por favor, coloque um{"\n"}nome em sua lista</Text>
}

export default TextAviso;

