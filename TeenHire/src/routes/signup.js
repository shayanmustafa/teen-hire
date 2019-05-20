import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { RadioGroup } from "react-native-btr";
//import {auth} from '../common/firebase'
import firebase from "../common/firebase1";
import Video from "react-native-video";
import GridVideo from "./PurpleGrid.mp4";

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      radioButtons: [
        {
          label: "Job Seeker",
          value: "Job Seeker",
          checked: false,
          color: "#3cc194",
          disabled: false,
          flexDirection: "row",
          size: 8
        },

        {
          label: "Employer",
          value: "Employer",
          checked: false,
          color: "#3cc194",
          disabled: false,
          flexDirection: "row",
          size: 8
        }
      ],
      selected: ""
    };
  }
  handleFirstName = text => {
    this.setState({ firstName: text });
  };
  handleLastName = text => {
    this.setState({ lastName: text });
  };
  handleEmail = text => {
    this.setState({ email: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };
  handleConfirmPassword = text => {
    this.setState({ confirmPassword: text });
  };

  handleSignUp = () => {
    var user;
    if (
      this.state.firstName != "" ||
      this.state.lastName != "" ||
      this.state.email != "" ||
      this.state.password != "" ||
      this.state.confirmPassword != ""
    ) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
              user = firebase.auth().currentUser;
              let selectedItem = this.state.radioButtons.find(
                e => e.checked == true
              );
              selectedItem = selectedItem
                ? selectedItem.value
                : this.state.radioButtons[0].value;
              this.setState({ selected: selectedItem });
              firebase
                .firestore()
                .collection("users")
                .doc(user.uid)
                .set({
                  firstName: this.state.firstName,
                  lastName: this.state.lastName,
                  email: this.state.email,
                  role: this.state.selected
                })
                .then(function() {
                  console.log("Document successfully written.");
                })
                .catch(function() {
                  console.error("Error writing document: ", error);
                });
            });
        })
        .then(() => {
          this.props.navigation.navigate("Home");
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    } else {
      ToastAndroid.show("One or more fields are missing", ToastAndroid.SHORT);
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Video
          repeat
          source={GridVideo}
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.overlay} />
        <View style={styles.title}>
          <Text
            style={{
              color: "#c1c1c1",
              textAlign: "center",
              fontSize: 55,
              fontFamily: "sans-serif-condensed"
            }}
          >
            TeenHire
          </Text>
          <Text
            style={{
              color: "#3cc194",
              textAlign: "center",
              fontSize: 18,
              textTransform: "uppercase",
              fontFamily: "sans-serif-condensed"
            }}
          >
            Register
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="First name"
            placeholderTextColor="#3cc194"
            autoCapitalize="none"
            value={this.state.firstName}
            onChangeText={this.handleFirstName}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Last name"
            placeholderTextColor="#3cc194"
            autoCapitalize="none"
            value={this.state.lastName}
            onChangeText={this.handleLastName}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Email"
            placeholderTextColor="#3cc194"
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={this.handleEmail}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor="#3cc194"
            autoCapitalize="none"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={this.handlePassword}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Confirm password"
            placeholderTextColor="#3cc194"
            autoCapitalize="none"
            secureTextEntry={true}
            value={this.state.confirmPassword}
            onChangeText={this.handleConfirmPassword}
          />
          <View
            style={{
              marginLeft: 150,
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <RadioGroup
              color="#c1c1c1"
              labelStyle={{ fontSize: 14 }}
              radioButtons={this.state.radioButtons}
              onPress={radioButtons => this.setState({ radioButtons })}
              style={{ paddingTop: 20, width: "85%" }}
            />
          </View>
        </View>

        <View>
          <TouchableOpacity onPress={this.handleSignUp} style={styles.btn}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignIn")}
          >
            <Text style={styles.signinText}>
              Already have an account? Login here
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  signinText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center"
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
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    opacity: 0.9
  },
  input: {
    borderRadius: 8,
    marginLeft: 25,
    marginBottom: 10,
    borderColor: "#c1c1c1",
    borderWidth: 1,
    color: "white",
    textAlign: "center",
    width: "85%"
  },
  buttonContainer: {
    justifyContent: "center",
    flexDirection: "row"
  }
});
