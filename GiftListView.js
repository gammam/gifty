// GistListView.js
// componente che descrive nel dettaglio il gruppo regalo, con le varie proposte
import React from 'react'
import { StyleSheet, Text, ScrollView,TextInput, View, Button ,Image,Switch,FlatList} from 'react-native'
import GiftSummary from './GiftSummary'
//import firebase from 'react-native-firebase'

export default class GiftListView extends React.Component {
  state = {  imageUrl : null , groupId : null ,giftItem:null }
 
  constructor() {
	  super()
	  
	  this.ref = firebase.firestore().collection('gifts');
	  this.unsubscribe = null;
  }
  

    onPressAddGift = ()=>{
	   this.props.navigation.navigate('AddGiftView', {groupId:this.state.groupId})
	  
  }

  componentDidMount() {
   
   const groupId = this.props.navigation.getParam('groupId', '0');
   console.log('groupId:',groupId);
   this.setState({groupId:groupId});
   //var strPath = 'guests.'+firebase.auth().currentUser.uid.toString();
   // this.unsubscribe = this.ref.where('id','==',${groupId}).onSnapshot(this.onCollectionUpdate) 
   const docId =  this.ref.doc(groupId).id;
   console.log('doc ID: ',docId);
  this.ref.doc(groupId).get()
	.then((doc)=>{
		const itemList=[];
		 const items = doc.get('items');
		 
		 Object.keys(items).forEach(function(k){
			 
			 console.log(k + ' - ' + items[k]);
			
		     itemList.push({
					id : k,
					title : items[k].title,
					agreement :   items[k].agreement,
					imageURL :    items[k].imageURL,
					proposedBy :  items[k].proposedBy,
				});
			});
		 
		 
		 this.setState({giftItems: itemList});
			console.log('data items: ',itemList)
			})
			.catch((err)=>{console.log('err: ',err)}) ;;
   //console.log('item: ',items);
   
 // this.unsubscribe =  this.ref.doc(groupId).get('items').then((doc)=>{console.log('item: ',doc)}).catch((err)=>{console.log('err: ',err)}) ;
   
   const ref = firebase.storage().ref('warhammer_gift.jpg');
	 ref.getDownloadURL()
		.then((url)=>{
			this.setState({imageUrl : url})
		 })
		 .catch(function(e){console.log('getDownload error: ',e)})
}

  
  
componentWillUnmount() {
   // this.unsubscribe();
}
  
  
   _onPressItem = (id: string) => {
	    console.log('GiftListView _onPressItem this.state.groupId: ', this.state.groupId)
	   this.props.navigation.navigate('GiftView',{groupId:this.state.groupId, refId:id} )	   
   }
  
  
  render() {
	 
    return (
      <View style={styles.container}>
		<View >
			<Text> Le tue liste regalo </Text>
		</View>
		<ScrollView >
			<FlatList
			  data={this.state.giftItems}
			  renderItem={({ item}) => <GiftSummary   onPressItem={this._onPressItem}  {...item} />}
			/>
		</ScrollView>
		<View >
		  <Button
				title={'Crea un nuovo gruppo Regalo'}
				onPress={this.onPressAddGift}
			/>
		</View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  header:{
	  flex:1,
  },
  container: {
	//   display: flex;
	//  flex-direction:column,
	//  align-items:stretch,
    flex: 1,
	flexDirection:'column',
    // justifyContent: 'center',
    //alignItems: 'flex-start',
	backgroundColor: "#fff"
  },
  item:{
	  backgroundColor: "#00ff00"
  },
  footer:{
	  flex:1,
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})