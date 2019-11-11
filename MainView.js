// Main.js
// illustra i gruppi di regalo in cui partecipa l'utente
import React from "react";
import { StyleSheet } from "react-native";
import {
  List,
  Form,
  Button,
  Container,
  Header,
  Title,
  Content,
  Body,
  Text,
  Footer,
  ListItem
} from "native-base";
// import firebase from 'react-native-firebase'
import GroupSummary from "./GroupSummary"; // we'll create this next

export default class Main extends React.Component {
  constructor() {
    super();
    //  this.ref = firebase.firestore().collection('gifts');
    this.unsubscribe = null;
    console.log("hello debug");
    this.state = { currentUser: null, textInput: "", loading: true, gifts: [] };
  }

  onCollectionUpdate = querySnapshot => {
    const gifts = [];
    querySnapshot.forEach(doc => {
      const { title, celebrated, endDate, person_fee } = doc.data();
      gifts.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        celebrated,
        endDate,
        person_fee,
        docId: doc.id
      });
      console.log(gifts);
    });
    this.setState({
      gifts,
      loading: false
    });
  };
  componentDidMount() {
    //const { currentUser } = this.state.currentUser
    var strPath =
      "guests." + firebase.auth().currentUser.uid.toString() + ".joined";
    this.unsubscribe = this.ref
      .where(strPath, "==", true)
      .onSnapshot(this.onCollectionUpdate);
    this.setState({ currentUser: firebase.auth(), textInput: "" });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    if (this.state.loading) {
      return null;
    }

    const { currentUser } = this.state.currentUser;

    return (
      <Container style={styles.container}>
        <Content>
          <Text>Hi {currentUser && currentUser.email}!</Text>
          <List
            dataArray={this.state.gifts}
            renderItem={({ item }) => (
              <GroupSummary navigation={this.props.navigation} {...item} />
            )}
          />
          <Button title={"Crea un nuovo Regalo"} />
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
