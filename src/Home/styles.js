import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import theme from "./../utils/themePalet";

const widthWi = Dimensions.get("window").width;
const heightHe = Dimensions.get("window").height;
const sISize = widthWi * 0.8;

const styles = StyleSheet.create({
  itemList: {
    width: widthWi * 0.9,
    height: heightHe * 0.17,
    marginBottom: heightHe * 0.02,
    backgroundColor: theme.groupCoverColorLayer,
    borderRadius: 8,
  },
  itemImg: {
    width: widthWi * 0.9,
    height: heightHe * 0.17,
    borderRadius: 8,
    opacity: 0.85,
  },
  itemText: {
    position: "absolute",
    bottom: 0,
    fontSize: 20,
    color: theme.textCoverGroupColor,
    fontWeight: "bold",
    marginLeft: widthWi * 0.02,
  },
  itemGear: {
    position: "absolute",
    width: widthWi * 0.1,
    height: widthWi * 0.1,
    bottom: heightHe * 0.17 - widthWi * 0.1,
    right: 0,
  },

  setNameView: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: sISize * 0.2,
    alignItems: "center",
  },
  setNameBtn: {
    backgroundColor: theme.okay,
    width: sISize * 0.1,
    height: sISize * 0.1,
    borderRadius: 8,
  },
  setImgViewButtons: {
    flex: 1,
    height: sISize * 0.5,
    justifyContent: "space-around",
  },
  setImgBtnTxt: {
    color: theme.textBtnGroup,
    fontWeight: "bold",
    fontSize: Math.floor(sISize / 13),
  },
  setImgButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  setImgButton: {
    backgroundColor: theme.base,
    borderRadius: 4,
    width: sISize / 2.3,
    height: sISize / 8,
  },
  setRadioView: {
    justifyContent: "space-between",
    height: sISize * 0.3,
    alignItems: "flex-start",
  },
  setDeleteBtn: {
    backgroundColor: theme.negate,
    width: sISize * 0.3,
    height: sISize * 0.15,
    borderRadius: 8,
  },
  setDeleteBtnText: {
    color: theme.textDeleteGroupBtn,
    fontWeight: "bold",
    fontSize: sISize * 0.05,
  },
  imageSets: {
    width: sISize * 0.7,
    height: sISize * 0.7,
  },
  test: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: sISize * 0.7,
    alignItems: "flex-start",
  },
  setBtnConfirmation: {
    width: sISize * 0.15,
    height: sISize * 0.15,
    borderRadius: 8,
  },
});

export default styles;
