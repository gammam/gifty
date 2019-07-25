// GroupSummary.js
// Componente che descrive il riassunto di un gruppo regalo (all'interno di una FlatList)

import React from 'react';

import moment from 'moment';
import 'moment-timezone'; 
import { TouchableHighlight, View, Button } from 'react-native';
import { Text,ListItem} from 'native-base';
export default class GroupSummary extends React.PureComponent {
	
	 constructor(){
	  super();
	  }
    // toggle a todo as completed or not via update()
    toggleComplete() {
		this.props.navigation.navigate('GiftListView',{groupId:this.props.docId});
        this.props.doc.ref.update({
            complete: !this.props.complete,
        });
    }

    render() {
		 const dateToFormat = moment(this.props.endDate).format('MM/DD/YYYY').toString();
		 
        return (
          <ListItem thumbnail
            onPress={() => this.toggleComplete()}
          >
            
                      <Text>{this.props.title}</Text>
					  <Text>{dateToFormat}</Text>
                      <Text>{this.props.test}</Text>
					  <Text>{this.props.person_fee}</Text>
                
          </ListItem>
        );
    }
}