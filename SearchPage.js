'use sctrict';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';

export default class SearchPage extends Component<{}> {
  static navigationOptions = {
    title: 'Property Finder',
  };
 constructor(props) {
	 super(props);
	 this.state = {
					searchString:'london',
					isLoading: false,
	  };
	
 }
 
 _onSearchTextChanged = (event) => {
  console.log('_onSearchTextChanged');
  this.setState({ searchString: event.nativeEvent.text });
  console.log('Current: '+this.state.searchString+', Next: '+event.nativeEvent.text);
};

 
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for houses to buy!
        </Text>
        <Text style={styles.description}>
          Search by place-name or postcode.
        </Text>
		<View style={styles.flowRight}>
		  <TextInput
			underlineColorAndroid={'transparent'}
			style={styles.searchInput}
			value={this.state.searchString}
			onChange={this._onSearchTextChanged}
			placeholder='Search via name or postcode'/>
		  <Button
			onPress={() => {}}
			color='#48BBEC'
			title='Go'
		  />
		</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  alignSelf: 'stretch',
	},
  searchInput: {
	  height: 36,
	  padding: 4,
	  marginRight: 5,
	  flexGrow: 1,
	  fontSize: 18,
	  borderWidth: 1,
	  borderColor: '#48BBEC',
	  borderRadius: 8,
	  color: '#48BBEC',
	},
});
