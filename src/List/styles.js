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

	}
})

export default styles