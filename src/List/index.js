import React, { useState, useEffect } from "react";
import {
  AppState,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

import globals from "./../globals";
import styles from "./styles";
import theme from "./../utils/themePalet";

import TextAviso from "./../components/TextAviso";
import Description from "./../components/Description";

const List = function ({ navigation, route }) {
  // Parametro passados por Home
  const parentData = route.params;
  // Informações carregadas do storage
  const [data, setData] = useState({ data: [] });
  // Janela para criação de item
  const [showCreateItemWindow, setShowCreateItemWindow] = useState(false);
  // Janela para adiministração dos items
  const [showConfigList, setShowConfigList] = useState(false);
  // Checa se o elemento pode ou não ser salvo
  const [canSaveItem, setCanSaveItem] = useState(true);
  // Exibição dos botões de apagar item
  const [showTrashButton, setShowTrashButton] = useState(false);
  // Caixas de texto da janela
  const [tmp, setTmp] = useState("");
  const [tmpText, setTmpText] = useState("");

  // salva os dados caso usuario saia do app
  useEffect(() => {
    AppState.addEventListener("change", (state) => {
      if (state === "background") {
        console.log("background");
        saveData(data);
      } else if (state === "inactive") {
        console.log("inactive");
        saveData(data);
      }
    });
  });

  // Carregar dados na entrada
  useEffect(() => {
    loadData();
    console.log("Carrega");
  }, []);

  // Retorna o estilo de i.name
  const getNameStyle = (name) => {
    if (name.length <= 7) {
      return "itemText_1";
    } else if (name.length <= 11) {
      return "itemText_2";
    } else if (name.length <= 20) {
      return "itemText_3";
    } else if (name.length <= 25) {
      return "itemText_4";
    }
  };

  // Checa se os dados passado são minimos pra criar um novo item
  const createNewItemInList = (name, desc) => {
    if (name != "") {
      // {id:'',name:'',record:0,desc:'',lastUpdate:[],created:[]},
      let key = (Math.floor(Math.random() * 899999) + 1000).toString(16);
      data.data.push({
        id: key,
        name,
        record: 0,
        desc,
        showDesc: false,
        lastUpdate: currentData(),
        created: currentData(),
      });
      saveData(data);
      return true;
    } else {
      return false;
    }
  };

  // delete itens da lista
  const deleteItemInList = (id) => {
    let modifiedDataBase = [];
    for (let index = 0; index < data.data.length; index++) {
      if (index != getIndex(id)) modifiedDataBase.push(data.data[index]);
    }
    data.data = modifiedDataBase;
    // console.log(data)
    saveData(data);
    loadData();
  };

  //Ordenar os dados
  const orderRegisters = (i = true, NoR = true) => {
    let reordedRegisters;
    if (NoR) {
      reordedRegisters = data.data.sort((a, b) => {
        if (a.name < b.name) return i ? -1 : 1;
        else if (a.name > b.name) return i ? 1 : -1;
      });
    } else {
      reordedRegisters = data.data.sort((a, b) => {
        if (a.record < b.record) return i ? -1 : 1;
        else if (a.record > b.record) return i ? 1 : -1;
      });
    }
    data.data = reordedRegisters;
    saveData(data);
    loadData();
  };

  // Descobre o index do elemento com base no id
  const getIndex = (id) => {
    let key = 0;
    data.data.map((itemObject, index) => {
      if (itemObject.id == id) key = index;
    });
    return key;
  };

  // Trata o valor passado por onChangeText
  const updateRecordByKeyboard = (stringValue, id) => {
    let intValeu = parseInt(stringValue);
    setData({
      ...data,
      ...(data.data[getIndex(id)].record = isNaN(intValeu) ? 0 : intValeu),
    });
  };
  // Retorna a Data atual
  const currentData = () => {
    let today = new Date();
    return [today.getDate(), today.getMonth(), today.getFullYear()];
  };

  // Atualiza o dado de lastUpdate
  const registLastUpdadeOfItem = (id) => {
    let today = new Date();
    data.data[getIndex(id)].lastUpdate = currentData();
    setData(data);
    // console.log(data.data[getIndex(id)].record)
  };

  // Carrega os dados
  const loadData = async () => {
    try {
      const dataBaseFromStorage = await AsyncStorage.getItem("@" + parentData.id);
      setData(
        dataBaseFromStorage != null ? JSON.parse(dataBaseFromStorage) : { data: [] },
      );
    } catch (error) {
      console.log("Erro ao Obter dados");
      resetDataFromList();
    }
  };

  // Salva os dados
  const saveData = async (modifiedDataBase) => {
    try {
      await AsyncStorage.setItem("@" + parentData.id, JSON.stringify(modifiedDataBase));
      console.log("====================================");
      console.log("Dados Salvos");
      console.log("====================================");
    } catch (error) {
      console.log("Erro");
    }
  };

  // Configurar os dados para o estado inicial
  const resetDataFromList = async () => {
    await AsyncStorage.setItem("@" + parentData.id, JSON.stringify({ data: [] }));
    console.log("Dados Resetados");
  };

  // Gera lista de elementos
  const renderItemsList = () => {
    return data.data.map((i) => {
      return (
        <View key={i.id} style={styles.itemView}>
          <View style={styles.itemViewValues}>
            {/* Lixeira */}
            {showTrashButton && (
              <TouchableOpacity
                style={[globals.alCenter, styles.itemTrash]}
                onPress={() => deleteItemInList(i.id)}
              >
                <Icon name="trash" color={theme.iconColor} size={30} />
              </TouchableOpacity>
            )}
            {/* Butão com o nome do item */}
            <TouchableOpacity
              style={styles.itemBtnText}
              // disabled={(i.desc=='')}
              onPress={() =>
                setData((dt) => {
                  return {
                    ...dt,
                    ...(dt.data[getIndex(i.id)].showDesc = i.showDesc ? false : true),
                  };
                })
              }
            >
              <Text style={styles[getNameStyle(i.name)]}>{i.name.substring(0, 34)}</Text>
            </TouchableOpacity>
            <View style={styles.itemBtns}>
              {/* Botão de '-' */}
              {!showTrashButton && (
                <TouchableOpacity
                  style={[
                    globals.itemBtn,
                    globals.alCenter,
                    { backgroundColor: theme.okay },
                  ]}
                  disabled={showTrashButton}
                  onPress={() => {
                    registLastUpdadeOfItem(i.id);
                    setData((dt) => {
                      return {
                        ...dt,
                        ...(dt.data[getIndex(i.id)].record =
                          i.record == 0 ? 0 : i.record - 1),
                      };
                    });
                  }}
                >
                  <Text style={{ fontSize: 35 }}>-</Text>
                </TouchableOpacity>
              )}
              {/* Input de texto e exição */}
              <TextInput
                style={showTrashButton ? styles.itemInputE : styles.itemInput}
                value={`${i.record}`}
                onChangeText={(tmp) => {
                  registLastUpdadeOfItem(i.id);
                  updateRecordByKeyboard(tmp, i.id);
                }}
                maxLength={4}
                multiline={false}
                keyboardType={"phone-pad"}
                editable={!showTrashButton}
              />
              {/* Botão de '+' */}
              {!showTrashButton && (
                <TouchableOpacity
                  style={[
                    globals.itemBtn,
                    globals.alCenter,
                    { backgroundColor: theme.okay },
                  ]}
                  disabled={showTrashButton}
                  onPress={() => {
                    registLastUpdadeOfItem(i.id);
                    setData((dt) => {
                      return {
                        ...dt,
                        ...(dt.data[getIndex(i.id)].record = i.record + 1),
                      };
                    });
                  }}
                >
                  <Text style={{ fontSize: 25 }}>+</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {i.showDesc && Description(i)}
        </View>
      );
    });
  };

  // Exibi uma janela para criar e configurar uma lista
  const windowToCreateNewItem = () => {
    return (
      <Modal animationType={"fade"} visible={showCreateItemWindow} transparent={true}>
        <View style={globals.showSetItem}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/*Configurador do nome da Lista*/}
            <View>
              <View style={globals.setImgHead}>
                <Text style={globals.setImgHeadTxt}>NOME</Text>
              </View>
              <View style={globals.setImgDesc}>
                <Text>
                  <Text style={{ color: theme.negate }}>*</Text> Escreva o nome da lista
                </Text>
              </View>
              <View style={styles.setNameView}>
                <TextInput
                  style={globals.setNameInput}
                  value={tmp}
                  onChangeText={(tmp) => setTmp(tmp)}
                  multiline={false}
                />
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
                  style={[globals.setNameInput, styles.setHeight]}
                  value={tmpText}
                  onChangeText={(tmp) => setTmpText(tmp)}
                  maxLength={100}
                  multiline={true}
                />
              </View>
            </View>
            {/*Botão de salvar dados*/}
            <View style={globals.saveSetView}>
              <TouchableOpacity
                style={canSaveItem ? globals.saveBtnOK : globals.saveBtnNot}
                onPress={() => {
                  let t = createNewItemInList(tmp, tmpText);
                  setShowCreateItemWindow(!t);
                  setTmp(t ? "" : tmp);
                  setTmpText(t ? "" : tmpText);
                  setCanSaveItem(t ? true : false);
                }}
              >
                <Icon
                  name="check"
                  color={canSaveItem ? theme.darkOkay : theme.darkNegate}
                  size={30}
                />
              </TouchableOpacity>
              {TextAviso(canSaveItem)}
            </View>
          </ScrollView>
          {/*But~ao para fechar tela*/}
          <View style={globals.closeView}>
            <TouchableOpacity
              style={[globals.closeBtn, globals.alCenter]}
              onPress={() => {
                setShowCreateItemWindow(false);
                setTmp("");
              }}
            >
              <Icon name="close" color={theme.darkNegate} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  // Administração dos item da lista
  const windowToConfigureItemsList = () => {
    return (
      <Modal animationType={"fade"} visible={showConfigList} transparent={true}>
        <View style={globals.showSetItem}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/*Configurador a ordem da lista*/}
            <View>
              <View style={globals.setImgHead}>
                <Text style={globals.setImgHeadTxt}>ORDENAR</Text>
              </View>
              <View>
                <Text>Ordena os itens da lista por:</Text>
                <Text style={styles.itemText_2}>NOME:</Text>
                <View style={[{ justifyContent: "space-around" }, styles.setHeight]}>
                  <TouchableOpacity
                    onPress={() => orderRegisters(true, true)}
                    style={globals.saveBtnOK}
                  >
                    <Icon name="angle-double-up" color={theme.darkOkay} size={25} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => orderRegisters(false, true)}
                    style={globals.saveBtnOK}
                  >
                    <Icon name="angle-double-down" color={theme.darkOkay} size={25} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemText_2}>VALOR:</Text>
                <View style={[{ justifyContent: "space-around" }, styles.setHeight]}>
                  <TouchableOpacity
                    onPress={() => orderRegisters(false, false)}
                    style={globals.saveBtnOK}
                  >
                    <Icon name="angle-double-up" color={theme.darkOkay} size={25} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => orderRegisters(true, false)}
                    style={globals.saveBtnOK}
                  >
                    <Icon name="angle-double-down" color={theme.darkOkay} size={25} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/*Deletar itens da lista*/}
            <View>
              <View style={globals.setImgHead}>
                <Text style={globals.setImgHeadTxt}>DELETAR</Text>
              </View>
              <View style={globals.setImgDesc}>
                <Text>Poderá apagar os itens de seu desejo</Text>
              </View>
              <View style={styles.setNameView}>
                <TouchableOpacity
                  onPress={() => {
                    setShowTrashButton(true);
                    setShowConfigList(false);
                  }}
                  style={globals.saveBtnNot}
                >
                  <Text style={{ color: theme.negate, fontWeight: "bold" }}>Deletar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          {/*But~ao para fechar tela*/}
          <View style={globals.closeView}>
            <TouchableOpacity
              style={[globals.closeBtn, globals.alCenter]}
              onPress={() => {
                setShowConfigList(false);
              }}
            >
              <Icon name="close" color={theme.darkNegate} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  console.log("Renderizou");

  return (
    <View style={globals.background}>
      <StatusBar backgroundColor="#000" />
      {/*Cabeçalho*/}
      <View style={globals.header}>
        <TouchableOpacity
          onPress={() => {
            saveData(data);
            navigation.navigate("Home");
          }}
          style={[styles.backBtnView]}
        >
          <Text style={globals.headerText}>{parentData.name}</Text>
        </TouchableOpacity>
        {/*Botão para mostrar botões de apagar*/}
        <TouchableOpacity
          onPress={() =>
            showTrashButton ? setShowTrashButton(false) : setShowConfigList(true)
          }
          style={[globals.alCenter, globals.itemBtn]}
        >
          <Icon
            name="bars"
            color={showTrashButton ? theme.darkNegate : theme.iconColor}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderItemsList()}
        <View style={globals.listItem}>
          {/*Buttão de adicinar à lista*/}
          <TouchableOpacity
            activeOpacity={0.55}
            style={[globals.addButton, globals.alCenter]}
            onPress={() => {
              setShowCreateItemWindow(true);
              setCanSaveItem(true);
              setShowTrashButton(false);
              // console.log(data);
            }}
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {windowToCreateNewItem()}
      {windowToConfigureItemsList()}
    </View>
  );
};

export default List;
