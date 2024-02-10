import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const widthWi = Dimensions.get("window").width;
const heightHe = Dimensions.get("window").height;
const sISize = widthWi * 0.8;
const wW12 = widthWi * 0.12;

const styles = StyleSheet.create({
  itemView: {
    backgroundColor: "#dddd",
  },
  itemViewValues: {
    flexDirection: "row",
    backgroundColor: "#eeeeee",
    height: wW12,
  },
  itemBtnText: {
    height: wW12,
    width: widthWi * 0.64,
    justifyContent: "center",
    paddingHorizontal: widthWi * 0.05,
  },
  itemTrash: {
    backgroundColor: "#a0f",
    height: wW12,
    width: wW12,
  },
  itemText_1: {
    fontSize: widthWi * 0.08,
  },
  itemText_2: {
    fontSize: widthWi * 0.055,
  },
  itemText_3: {
    fontSize: widthWi * 0.052,
  },
  itemText_4: {
    fontSize: widthWi * 0.04581,
  },
  itemBtns: {
    height: wW12,
    flexDirection: "row",
    alignItems: "center",
    width: widthWi * 0.36,
  },
  itemInput: {
    height: wW12,
    backgroundColor: "#fff",
    width: wW12,
    fontSize: Math.floor(widthWi * 0.05),
    textAlign: "center",
  },
  itemInputE: {
    textAlign: "center",
    position: "absolute",
    right: wW12,
    width: wW12,
    height: wW12,
    backgroundColor: "#fff",
    fontSize: Math.floor(widthWi * 0.05),
  },
  itemDescText: {
    color: "#000",
  },
  setHeight: {
    height: sISize * 0.3,
  },
  backBtnView: {
    width: widthWi * 0.5,
  },
  innertPadding:{
    padding: widthWi * 0.01,
  }
});

export default styles;
