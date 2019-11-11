// SignUp.js
import React from "react";
import { StyleSheet } from "react-native";
import {
  Form,
  Item,
  Input,
  Button,
  Container,
  Header,
  Title,
  Content,
  Body,
  Text,
  Footer
} from "native-base";
// import firebase from "react-native-firebase";
export default class SignUp extends React.Component {
  state = { email: "", password: "", errorMessage: null };
  handleSignUp = () => {
    // TODO: Firebase stuff...
    console.log("handleSignUp");
    /*   firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(
        this.state.email,
        this.state.password
      )
      .then(() => {
        console.log("email:" + this.state.email);
        this.props.navigation.navigate("MainView");
      })
      .catch(error => {
        console.log("error; " + error);
        this.setState({ errorMessage: error.message });
      });*/
  };
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Text>Sign Up</Text>
          <Form>
            <Item>
              <Input
                placeholder="Username"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
            </Item>
            <Item last>
              <Input
                placeholder="Password"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
            </Item>
          </Form>
          <Button title="Sign Up" onPress={this.handleSignUp}>
            <Text>Sign Up</Text>
          </Button>
        </Content>
        <Footer>
          <Button
            title="Already have an account? Login"
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text>Login</Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  }
});
