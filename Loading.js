// Loading.js
import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Body,
  Text,
  Spinner
} from "native-base";

// import firebase from 'react-native-firebase'

export default class Loading extends React.Component {
  componentDidMount() {
    console.log("loading: componentDidMount");
    // firebase.auth().onAuthStateChanged(user => {
    //   this.props.navigation.navigate(user ? 'MainView' : 'SignUp')
    // })
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Text>Loading...</Text>
          <Spinner color="red" size="large" />
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
