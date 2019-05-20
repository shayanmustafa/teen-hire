import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
//import {auth} from '../common/firebase'
import firebase from "../common/firebase1";
import { YellowBox } from "react-native";
import Video from "react-native-video";
import GridVideo from "./PurpleGrid.mp4";

export default class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "user4@gmail.com",
      password: "user4123"
    };
    YellowBox.ignoreWarnings(["Setting a timer"]);
  }
  componentDidMount() {
    StatusBar.setHidden(true);
  }
  handleEmail = text => {
    this.setState({ email: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };
  handleSignIn = () => {
    if (this.state.email != "" || this.state.password != "") {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          this.props.navigation.navigate("Home");
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            ToastAndroid.show("Wrong password", ToastAndroid.SHORT);
          } else if (errorCode === "auth/user-not-found") {
            ToastAndroid.show("User does not exist", ToastAndroid.SHORT);
          } else if (errorCode === "auth/invalid-email") {
            ToastAndroid.show("Invalid email", ToastAndroid.SHORT);
          }
        });
    } else {
      ToastAndroid.show("Email or password missing", ToastAndroid.SHORT);
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
            Gets you hired.
          </Text>
        </View>
        <View style={styles.signInBox}>
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
            textContentType="password"
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={this.handlePassword}
          />
          <View>
            <TouchableOpacity onPress={this.handleSignIn} style={styles.btn}>
              <Text style={styles.btnText}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignUp")}
            >
              <Text style={styles.signupText}>Or, Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  signupText: {
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
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "#06152a"
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
  text: {
    width: "20%",
    fontSize: 15,
    color: "black",
    fontWeight: "bold"
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
  buttonContainer: {
    justifyContent: "center",
    flexDirection: "column",
    marginBottom: 40
  },
  signInBox: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "space-between"
  }
});
