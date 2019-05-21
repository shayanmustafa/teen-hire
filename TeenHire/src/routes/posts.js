import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ToastAndroid,
  TouchableOpacity
} from "react-native";
import firebase from "../common/firebase1";

export default class PostsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobTitle: "",
      jobDesc: "",
      jobID: "",
      email: ""
    };
  }
  handleJobTitle = text => {
    this.setState({ jobTitle: text });
  };
  handleJobDesc = text => {
    this.setState({ jobDesc: text });
  };
  handleJobID = text => {
    this.setState({ jobID: text });
  };
  handleEmail = text => {
    this.setState({ email: text });
  };
  handlePost = () => {
    var user;
    if (this.state.jobTitle != "" || this.state.jobDesc != "") {
      user = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection("posts")
        .doc(this.state.jobID)
        .set({
          jobTitle: this.state.jobTitle,
          jobDescription: this.state.jobDesc,
          employerID: user.uid
        })
        .then(function() {
          console.log("Document successfully written.");
          //this.props.navigation.navigate('Home');
        })
        .catch(function() {
          console.error("Error writing document: ", error);
        });
      this.props.navigation.navigate("Home");
    } else {
      ToastAndroid.show("One or more fields are missing", ToastAndroid.SHORT);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 18,
            textTransform: "uppercase",
            fontFamily: "sans-serif-condensed"
          }}
        >
          Add new job
        </Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Job Title"
            placeholderTextColor="#3cc194"
            autoCapitalize="none"
            value={this.state.jobTitle}
            onChangeText={this.handleJobTitle}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Job Description"
            placeholderTextColor="#3cc194"
            autoCapitalize="none"
            value={this.state.jobDesc}
            onChangeText={this.handleJobDesc}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Job ID"
            placeholderTextColor="#3cc194"
            autoCapitalize="none"
            value={this.state.jobID}
            onChangeText={this.handleJobID}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Applicatoin recieving email"
            placeholderTextColor="#3cc194"
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={this.handleEmail}
          />
        </View>

        <TouchableOpacity onPress={this.handlePost} style={styles.btn}>
          <Text style={styles.btnText}>Post</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "#06152a"
  },
  input: {
    borderRadius: 8,
    marginLeft: 25,
    padding: 10,
    marginBottom: 10,
    borderColor: "#c1c1c1",
    borderWidth: 1,
    color: "white",
    textAlign: "center",
    width: "85%"
  },
  btn: {
    borderRadius: 8,
    marginLeft: 25,
    padding: 20,
    marginVertical: 20,
    backgroundColor: "#3cc194",
    width: "85%"
  },
  btnText: {
    color: "#116d4e",
    fontSize: 16,
    fontWeight: "800",
    textTransform: "uppercase",
    textAlign: "center"
  },
  inputBox: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "space-between"
  }
});
