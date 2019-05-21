import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ToastAndroid,
  FlatList
} from "react-native";
import { Container, Content, Card, CardItem, Body } from "native-base";
import firebase from "../common/firebase1";

export default class JobSeeker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobAvailable: ""
    };
  }
  componentDidMount() {
    firebase
      .firestore()
      .collection("posts")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({
            jobAvailable: [...this.state.jobAvailable, doc.data()]
          });
        });
      });
  }
  render() {
    return (
      <FlatList
        data={this.state.jobAvailable}
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
            <CardItem footer>
              <Button
                title="Apply now"
                color="#3cc194"
                style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate('Apply', {
                  emailID: item.emailTo
              })}/>
            </CardItem>
          </Card>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
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
