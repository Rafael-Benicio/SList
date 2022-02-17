import React, {useState} from 'react';
import { Text, TouchableOpacity } from 'react-native';

import globals from './../globals'
// Butão de adicionar item
// Button to add item
const AddButton=()=>{
  return(
  <TouchableOpacity activeOpacity={0.55} style={[globals.addButton,globals.alCenter]}>
    <Text>+</Text>
  </TouchableOpacity>
  )
}

export default AddButton;

