// ProposedGift.js
// Componente che descrive il riassunto di un gruppo regalo 

import React from 'react';

import moment from 'moment';
import 'moment-timezone'; 
import firebase from 'react-native-firebase'
import { StyleSheet,TouchableHighlight, View, Text,Image,Switch } from 'react-native';
import { Button, Card } from 'native-base';
// import { Button, Card } from 'react-native-material-design';
export default class GiftSummary extends React.PureComponent {
 state = {  imageUrl : null ,proposedByImgUrl : null , groupId:null , refId : null}	
	 constructor(){
	  super();
	  }
	  
    // toggle a todo as completed or not via update()
    
	
	_onPress = () => {
		console.log('this.props item: ', this.props)
    this.props.onPressItem(this.props.id);
  };
  

	componentDidMount() {
		
		
		
		const ref = firebase.storage().ref(this.props.imageURL); 
		this.setState({imageUrl : this.props.imageURL})
		
		
		
		
		firebase.firestore().collection('users').doc(this.props.proposedBy).get()   // bisogna parametrizza l'id utente prendendolo da chi ha fatto la proposta
		.then( (documentSnapshot)=>{ const storageUrl = documentSnapshot.get('photoURL');
										this.setState({proposedByImgUrl : storageUrl})}
		).catch(function(e){console.log('get photo proposed user error: ',e)})
    
	
	}
    render() {
		
		 
        return (
	
      
            
		  <View style={styles.container}>
		   <Card>
			   <Card.Media
							image={<Image source={{uri: this.state.imageUrl}} />}
							overlay
						/>
						<Card.Body>
							  <Text>{JSON.stringify(this.props.title)}</Text>
							  <Text>{JSON.stringify(this.props.agreement)}</Text>
						</Card.Body>
						<Card.Actions position="right">
							<Button value="ACTION" onPress={this._onPress}  />
						</Card.Actions>
		   </Card>
			 
		  </View>
		
		
         
        );
    }
}

const styles = StyleSheet.create({
  item:{
	  flex:1,
  },
  container :{
	   backgroundColor: "#00ff00",
	  flex:1,
	  flexDirection:'row',
	  justifyContent:'flex-start',
  }
})
  