import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ToastAndroid,
  FlatList,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { Container, Header, Content, Card, CardItem, Body } from "native-base";
import firebase from "../common/firebase1";
import { YellowBox } from "react-native";
import JobSeeker from "../components/jobseeker";
import Employer from "../components/employer";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(["Setting a timer"]);
    this.state = {
      profileInfo: "",
      jobsPosted: ""
    };
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    var user = firebase.auth().currentUser;
    var docRef1 = firebase
      .firestore()
      .collection("users")
      .doc(user.uid);
    docRef1
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({ profileInfo: doc.data() });
        } else {
          ToastAndroid.show("No such doc", ToastAndroid.SHORT);
        }
      })
      .catch(function(error) {
        console.log("Error getting document", error);
      });
  }

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("SignIn");
        ToastAndroid.show("Signed out", ToastAndroid.SHORT);
      })
      .catch(function(error) {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };
  render() {
    let MainComponent;
    if (this.state.profileInfo.role == "Employer") {
      MainComponent = (
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                Welcome,{" "}
                <Text style={{ color: "#3cc194" }}>
                  {this.state.profileInfo.lastName}
                </Text>
              </Text>
              <Text style={{ ...styles.titleText, fontSize: 16 }}>
                {this.state.profileInfo.role} Account
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Posts")}
                style={{ ...styles.btn, width: "55%", marginRight: "5%" }}
              >
                <Text style={styles.btnText}>Add New</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.handleSignOut}
                style={{ ...styles.btn, width: "25%" }}
              >
                <Text style={styles.btnText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ ...styles.titleText, marginVertical: 20 }}>
                Posts
              </Text>
            </View>
          </View>
          <Employer />
        </View>
      );
    } else {
      MainComponent = (
        <View>
          <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
              <Text style={{ color: "white", textAlign: "center" }}>
                Welcome, {this.state.profileInfo.lastName}
              </Text>
              <Text style={{ color: "white", textAlign: "center" }}>
                {this.state.profileInfo.role}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Sign out"
                color="#3cc194"
                onPress={this.handleSignOut}
              />
            </View>
          </View>
          <JobSeeker navigation={this.props.navigation} />
        </View>
      );
    }
    return <View style={styles.container}>{MainComponent}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 0.3,
    borderColor: "#3cc194"
  },
  container: {
    flex: 1,
    backgroundColor: "#06152a"
  },
  btn: {
    // marginLeft: 25,
    borderRadius: 8,
    padding: 10,
    width: "40%",
    backgroundColor: "#3cc194"
  },
  btnText: {
    color: "#116d4e",
    fontSize: 16,
    fontWeight: "800",
    textTransform: "uppercase",
    textAlign: "center"
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center"
  },
  headerContainer: {
    backgroundColor: "#020a16",
    borderWidth: 0.3,
    borderColor: "#3cc194"
    // paddingVertical: 30
  },
  titleContainer: {
    marginVertical: 30
    // width: "85%"
  },
  titleText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "800",
    textAlign: "center",
    textTransform: "uppercase"
  }
});
