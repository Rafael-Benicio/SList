import React from 'react';
import { Text, View,TouchableOpacity,TouchableHighlight ,Image} from 'react-native';

import styles from "./styles"

export default function App() {
  return (
    <View style={styles.background}>
      {/*Cabeçalho*/}
      <View style={styles.header}>
        <Text style={styles.headerText}>SList</Text>
      </View>
      {/*Lista*/}
      <View style={styles.listItem}>
        {/*Itens com listas*/}
        <View style={styles.itemList}>
            <TouchableOpacity activeOpacity={0.8}>
                <Image style={styles.itemImg} source={require('./../../assets/icon.png')}/>
            </TouchableOpacity>
            <Text style={styles.itemText}>Nome 1</Text>
        </View>
        {/*Buttão de adicinar à lista*/}
        <TouchableOpacity activeOpacity={0.95} style={styles.addButton}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

