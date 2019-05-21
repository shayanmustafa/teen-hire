import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ToastAndroid,
  FlatList,
  StatusBar
} from "react-native";
import { Container, Content, Card, CardItem, Body } from "native-base";
import firebase from "../common/firebase1";

export default class Employer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsPosted: "",
      applyCount: 0
    };
  }
  componentDidMount() {
    var user = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("posts")
      .where("employerID", "==", user)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({
            jobsPosted: [...this.state.jobsPosted, doc.data()]
          });
        });
      });
  }
  render() {
    return (
      <FlatList
        data={this.state.jobsPosted}
        renderItem={({ item }) => (
          <Card>
            <CardItem
              header
              style={{
                backgroundColor: "#3cc194"
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "800",
                  color: "#116d4e",
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                {item.jobTitle}
              </Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={{ color: "black" }}>{item.jobDescription}</Text>
              </Body>
            </CardItem>
          </Card>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#06152a"
  },
  titleContainer: {
    marginBottom: 2
  },
  buttonContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 30
  }
});
