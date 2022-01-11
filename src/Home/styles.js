import React from 'react'
import {StyleSheet, Dimensions} from 'react-native'

const widthWi = Dimensions.get('window').width;
const heightHe = Dimensions.get('window').height;
const sISize= widthWi*0.8

const styles = StyleSheet.create({
	background:{
		backgroundColor:'#a0f',
		flex:1
	},
	header:{
		backgroundColor:'#b6f',
		height:heightHe*0.11,
		justifyContent:'center',
		paddingHorizontal:widthWi*0.05
	},
	headerText:{
		fontSize:30,
		fontWeight:'bold',
		color:'#fff'
	},
	listItem:{
		paddingVertical: heightHe*0.02,
		alignItems:'center'
	},
	itemList:{
		width:widthWi*0.9,
		height:heightHe*0.17,
		marginBottom:heightHe*0.02,
		backgroundColor:'#000',
		borderRadius:8,
	},
	itemImg:{
		width:widthWi*0.9,
		height:heightHe*0.17,
		borderRadius:8,
		opacity:0.8
	},
	itemText:{
		position:'absolute',
		bottom:0,
		fontSize:20,
		color:'#fff',
		fontWeight:'bold',
		marginLeft:widthWi*0.02
	},
	itemGear:{
		position:'absolute',
		width:widthWi*0.1,
		height:widthWi*0.1,
		bottom:heightHe*0.17-(widthWi*0.1),
		right:0,
		alignItems:'center',
		justifyContent:'center',
	},
	addButton:{
		backgroundColor:'#0f0',
		height: widthWi*0.14,
		width: widthWi*0.14,
		borderRadius:8,
		justifyContent:'center',
		alignItems:'center'
	},
	showSetItem:{
		position:'absolute',
		left:widthWi*0.5-sISize/2,
		top:heightHe*0.5-sISize/1.5,
		width:sISize,
		height:sISize,
		backgroundColor:'#fff',
		opacity:0.97,
		borderRadius:8,
		borderWidth:2,
		borderColor:'#000',
		padding:sISize*0.05,
	},
	setNameView:{
		flexDirection:'row',
		justifyContent:'space-between',
		height:sISize*0.2,
		alignItems:'center'
	},
	setNameInput:{
		backgroundColor:'#ddd',
		borderRadius:8,
		width:sISize*0.7,
		height:sISize*0.1,
		paddingHorizontal:10,
	},
	setNameBtn:{
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#0f0',
		width:sISize*0.1,
		height:sISize*0.1,
		borderRadius:8,
	},
	setImgHead:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		// backgroundColor:'#f00',
		height:sISize*0.15,
	},
	setImgDesc:{
		height:sISize*0.15,
		// backgroundColor:'#0f0',
	     justifyContent:'center'
	},
	setImgViewButtons:{
		// backgroundColor:'#000',
		flex:1,
		height:sISize*0.5,
	     justifyContent:'space-around'
	},
	setImgBtnTxt:{
		color:'#fff',
		fontWeight:'bold',
		fontSize:Math.floor(sISize/13),
	},
	setImgHeadTxt:{
		fontWeight:'bold',
		fontSize:Math.floor(sISize/9)
	},
	setImgButtons:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center'
	},
	setImgButton:{
		backgroundColor:'#a0f',
		borderRadius:4,
		width:sISize/2.3,
		height:sISize/8,
		alignItems:'center',
		justifyContent:'center'
	},
	setRadioView:{
		// flexDirection:'row',
		justifyContent:'space-between',
		height:sISize*0.3,
		alignItems:'flex-start',
	},
	setRadioBtn:{
		justifyContent:'center',
		width:sISize*0.7,
		height:sISize*0.14,
		borderRadius:8,
		paddingHorizontal:8,
		backgroundColor:'#ddd'

	},
	setRadioBtnok:{
		justifyContent:'center',
		width:sISize*0.7,
		height:sISize*0.14,
		borderRadius:8,
		paddingHorizontal:8,
		backgroundColor:'#ccffc4',
		borderWidth:1,
		borderColor:'#0a0',
	},
	saveBtnOK:{
		width:sISize*0.25,
		alignItems:'center',
		backgroundColor:'#ccffc4',
		borderRadius:8,
		borderWidth:2,
		borderColor:'#0a0',
		padding:8
	},
	saveBtnNot:{
		alignItems:'center',
		width:sISize*0.25,
		backgroundColor:'#ff7774',
		borderRadius:8,
		borderWidth:1,
		borderColor:'#a00',
		padding:8
	},
	saveSetView:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		// backgroundColor:'#f00',
		height:sISize*0.20,
	},
})

export default styles