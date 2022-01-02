import React from 'react'
import {StyleSheet, Dimensions} from 'react-native'

const widthWi = Dimensions.get('window').width;
const heightHe = Dimensions.get('window').height;

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
	showSetImg:{
		position:'absolute',
		left:widthWi*0.5-widthWi*0.8/2,
		top:heightHe*0.5-widthWi*0.8/2,
		width:widthWi*0.8,
		height:widthWi*0.8,
		backgroundColor:'#fff',
		opacity:0.97,
		borderRadius:8,
		borderWidth:2,
		borderColor:'#000',
		padding:widthWi*0.8*0.05,
	},
	setImgHead:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		// backgroundColor:'#f00',
		height:widthWi*0.8*0.15,
	},
	setImgDesc:{
		height:widthWi*0.8*0.15,
		// backgroundColor:'#0f0',
	     justifyContent:'center'
	},
	setImgViewButtons:{
		// backgroundColor:'#000',
		flex:1,
	     justifyContent:'space-around'
	},
	setImgBtnTxt:{
		color:'#fff',
		fontWeight:'bold',
		fontSize:Math.floor(widthWi*0.8/13),
	},
	setImgHeadTxt:{
		fontWeight:'bold',
		fontSize:Math.floor(widthWi*0.8/9)
	},
	setImgButtons:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center'
	},
	setImgButton:{
		backgroundColor:'#a0f',
		borderRadius:4,
		width:widthWi*0.8/2.3,
		height:widthWi*0.8/8,
		alignItems:'center',
		justifyContent:'center'
	},
})

export default styles