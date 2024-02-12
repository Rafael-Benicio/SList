import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import theme from "./utils/themePalet";

const widthWi = Dimensions.get("window").width;
const heightHe = Dimensions.get("window").height;
const sISize = widthWi * 0.9;

const globals = StyleSheet.create({
  alCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    backgroundColor: theme.base,
    flex: 1,
  },
  header: {
    backgroundColor: theme.lightBase,
    height: heightHe * 0.11,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: widthWi * 0.05,
    flexDirection: "row",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: theme.headerText,
  },
  addButton: {
    backgroundColor: theme.okay,
    height: widthWi * 0.14,
    width: widthWi * 0.14,
    borderRadius: 8,
  },
  listItem: {
    paddingVertical: heightHe * 0.02,
    alignItems: "center",
  },
  showSetItem: {
    position: "absolute",
    left: widthWi * 0.5 - sISize / 2,
    top: heightHe * 0.5 - sISize / 1.3,
    width: sISize,
    height: sISize,
    backgroundColor: theme.windowBackground,
    opacity: 0.97,
    borderRadius: 8,
    padding: sISize * 0.05,
    elevation: 5,
  },
  closeView: {
    position: "absolute",
    left: sISize * 0.83,
    marginTop: sISize * 0.02,
  },
  closeBtn: {
    width: sISize * 0.14,
    height: sISize * 0.14,
    backgroundColor: theme.lightNegate,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.darkNegate,
  },
  saveSetView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: sISize * 0.2,
  },
  saveBtnOK: {
    width: sISize * 0.25,
    alignItems: "center",
    backgroundColor: theme.lightOkay,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.darkOkay,
    padding: 8,
  },
  saveBtnNot: {
    alignItems: "center",
    width: sISize * 0.25,
    backgroundColor: theme.lightNegate,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.darkNegate,
    padding: 8,
  },
  setImgHeadTxt: {
    fontWeight: "bold",
    fontSize: Math.floor(sISize / 9),
  },
  setImgHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: sISize * 0.15,
  },
  setImgDesc: {
    height: sISize * 0.15,
    justifyContent: "center",
  },
  setNameInput: {
    backgroundColor: theme.innerInputText,
    borderRadius: 8,
    width: sISize * 0.7,
    height: sISize * 0.1,
    paddingHorizontal: 10,
  },
  itemBtn: {
    height: widthWi * 0.12,
    width: widthWi * 0.12,
  },
});

export default globals;
