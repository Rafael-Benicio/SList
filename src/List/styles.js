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
	addButton:{
		backgroundColor:'#0f0',
		height: widthWi*0.14,
		width: widthWi*0.14,
		borderRadius:8,
		justifyContent:'center',
		alignItems:'center'
	},
	listItem:{
		paddingVertical: heightHe*0.02,
		alignItems:'center',
	},
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
		// backgroundColor:'#f00',
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
		// backgroundColor:'#0f0',
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
		alignItems:'center',
		justifyContent:'center',
	},
	setNameInput:{
		backgroundColor:'#ddd',
		borderRadius:8,
		width:sISize*0.7,
		height:sISize*0.1,
		paddingHorizontal:10,
	},
	setHeight:{
		height:sISize*0.3,
	},
	setImgDesc:{
		height:sISize*0.15,
		// backgroundColor:'#0f0',
	     justifyContent:'center'
	},
	setImgHead:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		// backgroundColor:'#f00',
		height:sISize*0.15,
	},
	setImgHeadTxt:{
		fontWeight:'bold',
		fontSize:Math.floor(sISize/9)
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