import React from 'react'
import {StyleSheet, Dimensions} from 'react-native'

const widthWi = Dimensions.get('window').width;
const heightHe = Dimensions.get('window').height;
const sISize= widthWi*0.8

const styles = StyleSheet.create({
	itemView:{
		backgroundColor:'#dddd',
	},
	itemViewValues:{
		flexDirection:'row',
		backgroundColor:'#eeeeee',
		height: widthWi*0.12,
	},
	itemBtnText:{
		height: widthWi*0.12,
		width:widthWi*0.64,
		justifyContent:'center',
		paddingHorizontal:widthWi*0.05
	},
	itemText:{
		fontSize:widthWi*0.08
	},
	itemBtns:{
		height: widthWi*0.12,
		flexDirection:'row',
		alignItems:'center',
		width:widthWi*0.36,
	},
	itemBtn:{
		height: widthWi*0.12,
		justifyContent:'center',
		backgroundColor:'#0f0',
		width:widthWi*0.12,
		alignItems:'center'
	},
	itemInput:{
		height: widthWi*0.12,
		backgroundColor:'#fff',
		width:widthWi*0.12,
		fontSize:Math.floor(widthWi*0.05),
		textAlign:'center', 
	},
	itemDescView:{
		height: widthWi*0.11,
		paddingHorizontal:widthWi*0.05,
		paddingVertical:heightHe*0.005
	},
	itemDescText:{
		color:'#000'
	},
	setHeight:{
		height:sISize*0.3,
	},


})

export default styles