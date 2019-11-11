import React from "react";
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  ScrollView
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// import { Button, Card } from 'react-native-material-design';

//import SearchPage 	from './SearchPage';
import Loading from "./Loading";
import SignUp from "./SignUp";
import Login from "./Login";
import MainView from "./MainView";
//import GiftListView from './GiftListView';
//import GiftView 	from './GiftView';
//import AddGiftView 	from './AddGiftView'

//import firebase from 'react-native-firebase';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

export default createAppContainer(AppNavigator);

/*
const App= StackNavigator({
//	SearchPage,
	Loading,
	SignUp,
	Login,
	MainView,
//	GiftListView,
//	GiftView,
//	AddGiftView,
	},	
	{
    initialRouteName: 'Loading'
	}
)


export default App;
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  logo: {
    height: 80,
    marginBottom: 16,
    marginTop: 32,
    width: 80
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  modules: {
    margin: 20
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: "center"
  }
});
