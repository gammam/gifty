// AddGiftView.js
// illustra i gruppi di regalo in cui partecipa l'utente 
import React from 'react'
import { StyleSheet, Platform, Image, Text, View,ActivityIndicator,FlatList,TextInput,Button } from 'react-native'
import firebase from 'react-native-firebase'
import ImagePicker from 'react-native-image-crop-picker';

export default class Main extends React.Component {
	// state={imageURL :null, imageMime:null , text:'testo di prova', description:'descrizione'}
	state = {description:null, imageURL :null,price:null,title:null, imageMimeType:null}
	
	componentDidMount() {
		const { navigation } = this.props;
        const groupId = navigation.getParam('groupId', 'NO-ID');
	}
	
	
	onPressUploadImage= () =>{
		const { navigation } = this.props;
        const groupId = navigation.getParam('groupId', 'NO-ID');
		const imageRef =  firebase.storage().ref(groupId+'.jpg')
		ImagePicker.openPicker({
			  width: 300,
			  height: 400,
			  cropping: true
			}).then(image => {
			  console.log('acquired image',image.path);
			  this.setState({imageURL : image.path,
							imageMimeType : image.mime})
//			 imageRef.putFile(image.path)
//			  .then(()=>{console.log('succesful added to storage')
//			    imageRef.getDownloadURL().then((url)=>{  this.setState({imageURL : url}) 
//				console.log('succesful taken URL')} )
//				
//			  })
//			  .catch( (err)=>{ console.log('err storage add',err)} )
			})
			
	}
	
	onPressSaveGift = () =>{
		const type = this.state.imageMimeType.split("/")[1];
const { navigation } = this.props;		
		const groupId = navigation.getParam('groupId', 'NO-ID');
		
		console.log('Save Gift Image : ', this.state.title+'.'+type)
		const imageRef =  firebase.storage().ref(this.state.title+'.'+type)
		const ref = firebase.firestore().collection('gifts')
		const gifts = firebase.firestore().collection('ideas')
		
		
		imageRef.putFile(this.state.imageURL)
		.then(()=>{console.log('successful added to storage')})
		.then(()=>{return imageRef.getDownloadURL()
				 .then((url)=>{ return url })
		})
		.then((url)=>{
			var item = this.state;
			item['imageURL']=url;
			console.log('this.state: ',this.state);
			gifts.add(this.state)
			.then( (documentReference)=>{return documentReference.id} )
			.then ((id)=>{
					strPath='items.'+ id.toString();
					console.log('gift id: ',id)
					console.log('item element id: ',strPath)
					//aggiungo i valori dell'item all'interno della collezione gifts
					item['subscriptions']={};
					item['agreement']=0;
					item['proposedBy']=firebase.auth().currentUser.uid.toString();
					ref.doc(groupId).update(strPath,item)
			})
			
		})
			
		.catch((err)=>{console.log('errore storage',err)})
		
		navigation.goBack();
		 
	}
	
	
	 
	
	render(){
		const {goBack} = this.props.navigation;
		
		return(
		<View>
			<Image
			  style={{width: 50, height: 50}}
			  source={{uri: this.state.imageURL}}
			/>
		
		  <Text> Titolo
		  </Text>
		  <TextInput 
			onChangeText={(title) => this.setState({title})}
			value={this.state.title}
		  />
		  <Button 
		  onPress={this.onPressUploadImage}
		  title="Upload Image"
		  color="#841584"		  
		  />
		
		<Text> Description </Text>
		 <TextInput 
			onChangeText={(description) => this.setState({description})}
			value={this.state.description}
		  />
		  
		 <Text> Price </Text>
		 <TextInput 
			onChangeText={(price) => this.setState({price})}
			value={this.state.price}
		  /> 
		   <Button 
		  onPress={this.onPressSaveGift}
		  title="Save"
		  color="#841584"		  
		  />
		   <Button 
		  onPress={()=>{goBack()}}
		  title="Cancel"		  
		  />
		</View>
		
		
		)
	}
}