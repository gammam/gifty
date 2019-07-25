// GiftView.js
// componente che descrive nel dettaglio il gruppo regalo, con le varie proposte
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button ,Image,Switch,FlatList} from 'react-native'
import GiftSummary from './GiftSummary'
import firebase from 'react-native-firebase'

export default class GiftView extends React.Component {
	state= {refId:null, groupId:null, imageUrl : null ,proposedByImgUrl : null , description:null ,canSetPreference:false, toggled:false }	
	
	_setPreference= (value)=>{
		console.log('value switch: ',value)
		console.log('setPreference , item: ',this.state.item)
		this.state.item.subscriptions[this.currentUserId] =value;
        this.setState({toggled:value})
	    strPath='items.'+this.state.refId.toString();
		firebase.firestore().collection('gifts').doc(this.state.groupId).update(strPath,this.state.item)
		.then(()=>{console.log('updated')})
		.catch((err)=>{console.log('upload error',err)})
	}
	
	constructor(){
		super();
		this.giftRef = firebase.firestore().collection('gifts');
		this.currentUserId = firebase.auth().currentUser.uid.toString();
		this.unsubscribe=null;
	}
	
	
	
	_onDocumentUpdate = (documentSnapshot) => {
		const item = documentSnapshot.get('items.'+this.state.refId)
			
			console.log('_onDocumentUpdate refId: ',this.state.refId)
		
		console.log('_onDocumentUpdate this.props.navigation: ',this.props.navigation)
		this.props.navigation.setParams({ title: item.title })
		
		console.log('_onDocumentUpdate item: ',item)
		// set ImageURL
		const imageRef = firebase.storage().ref(item.imageURL); 
			this.setState({imageUrl : item.imageURL})
		
		
		
		// set proposedByImgUrl and description ,canSetPreference
		const proposedImgRef = firebase.firestore().collection('users').doc(item.proposedBy).get('photoURL');
		var strPath = 'guests.'+this.currentUserId+'.delegateTo';
		var strPath2 = 'items.'+this.state.refId+'.subscriptions.'+this.currentUserId;
		
		console.log('_onDocumentUpdate subscriptions user : ', strPath2 );
		console.log('_onDocumentUpdate get toggled : ', documentSnapshot.get(strPath2) )
		
		
        this.setState({	
			item : item,
			proposedByImgUrl : proposedImgRef,
			description: item.description,
			canSetPreference : documentSnapshot.get(strPath),
			toggled : 	documentSnapshot.get(strPath2),
		}) 		
		
		console.log('_onDocumentUpdate toggled: ', this.state.toggled)
	
		
	}
	
	componentDidMount() {
		const { navigation } = this.props;
        const groupId = navigation.getParam('groupId', 'NO-ID');
		 const refId = navigation.getParam('refId', 'NO-ID');
		console.log('group to view: ',groupId )
		this.setState({groupId:groupId,
						refId:refId})
		 this.unsubscribe = this.giftRef.doc(groupId).onSnapshot(this._onDocumentUpdate); 

	}
	
	
	render(){
		//nome da inserire nella barra di stato
		//
		return (
		<View>
		<View>
			<Image
			  style={{width: 50, height: 50}}
			  source={{uri: this.state.imageUrl}}
			/>
			<Text>{this.state.description}</Text>
				
					
			 
		</View>
		<View>
		<Switch 
									 onValueChange={ this._setPreference} 
										value={this.state.toggled} 
								/>		
		</View>
		</View>
		)
	}
}