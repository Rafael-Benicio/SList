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
		// resizeMode: 'stretch',
	},
	itemText:{
		position:'absolute',
		bottom:0,
		fontSize:20,
		color:'#fff',
		fontWeight:'bold',
		marginLeft:widthWi*0.02
	},
	addButton:{
		backgroundColor:'#0f0',
		height: widthWi*0.14,
		width: widthWi*0.14,
		borderRadius:8,
		justifyContent:'center',
		alignItems:'center'
	},
})

export default styles