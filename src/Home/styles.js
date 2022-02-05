import React from 'react'
import {StyleSheet, Dimensions} from 'react-native'

const widthWi = Dimensions.get('window').width;
const heightHe = Dimensions.get('window').height;
const sISize= widthWi*0.8

const styles = StyleSheet.create({
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
		opacity:0.7
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
	},

	setNameView:{
		flexDirection:'row',
		justifyContent:'space-between',
		height:sISize*0.2,
		alignItems:'center'
	},
	setNameBtn:{
		backgroundColor:'#0f0',
		width:sISize*0.1,
		height:sISize*0.1,
		borderRadius:8,
	},
	setImgViewButtons:{
		flex:1,
		height:sISize*0.5,
	     justifyContent:'space-around'
	},
	setImgBtnTxt:{
		color:'#fff',
		fontWeight:'bold',
		fontSize:Math.floor(sISize/13),
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
	},
	setRadioView:{
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
	setDeleteBtn:{
		backgroundColor:'#f00',
		width:sISize*0.3,
		height:sISize*0.15,
		borderRadius:8,
	},
	setDeleteBtnText:{
		color:'#fff',
		fontWeight:'bold',
		fontSize:sISize*0.05,
	},

})

export default styles