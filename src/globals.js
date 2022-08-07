import React from 'react'
import {StyleSheet, Dimensions} from 'react-native'

const widthWi = Dimensions.get('window').width;
const heightHe = Dimensions.get('window').height;
const sISize= widthWi*0.9

const globals = StyleSheet.create({
	alCenter:{
		justifyContent:'center',
		alignItems:'center'
	},
	background:{
		backgroundColor:'#a0f',
		flex:1
	},
	header:{
		backgroundColor:'#b6f',
		height:heightHe*0.11,
		justifyContent:'space-between',
		alignItems:'center',
		paddingHorizontal:widthWi*0.05,
		flexDirection:'row',
	},
	headerText:{
		fontSize:30,
		fontWeight:'bold',
		color:'#fff'
	},
	addButton:{
		backgroundColor:'#0f0',
		height: widthWi*0.14,
		width: widthWi*0.14,
		borderRadius:8,
	},
	listItem:{
		paddingVertical: heightHe*0.02,
		alignItems:'center',
	},
	showSetItem:{
		position:'absolute',
		left:widthWi*0.5-sISize/2,
		top:heightHe*0.5-sISize/1.3,
		width:sISize,
		height:sISize,
		backgroundColor:'#fff',
		opacity:0.97,
		borderRadius:8,
		// borderWidth:0.1,
		// borderColor:'#000',
		padding:sISize*0.05,
		elevation:5
	},
	closeView:{
		position:'absolute',
		left:sISize*0.83,
		marginTop:sISize*0.02,
	},
	closeBtn:{
		width:sISize*0.14,
		height:sISize*0.14,
		backgroundColor:'#ff7774',
		borderRadius:8,
		borderWidth:1,
		borderColor:'#a00',
	},
	saveSetView:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		height:sISize*0.20,
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
	setImgHeadTxt:{
		fontWeight:'bold',
		fontSize:Math.floor(sISize/9)
	},
	setImgHead:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		height:sISize*0.15,
	},
	setImgDesc:{
		height:sISize*0.15,
	     justifyContent:'center'
	},
	setNameInput:{
		backgroundColor:'#ddd',
		borderRadius:8,
		width:sISize*0.7,
		height:sISize*0.1,
		paddingHorizontal:10,
	},
	itemBtn:{
		height:widthWi*0.12,
		width:widthWi*0.12,
	},
})

export default globals