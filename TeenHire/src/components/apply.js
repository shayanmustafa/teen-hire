import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";
import email from "react-native-email";

export default class ApplyScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      CoverLetter: ""
    };
  }
  handleCoverLetter = text => {
    this.setState({ CoverLetter: text });
  };
  handleSubmit = () => {
    const { navigation } = this.props;
    const emailRecieve = navigation.getParam('emailID', 'NO-ID');
    const to = [emailRecieve] // string or array of email addresses
    email(to, {
        // Optional additional arguments
        cc: [''], // string or array of email addresses
        bcc: '', // string or array of email addresses
        subject: 'Job Application: Applied through TeenHire',
        body: this.state.CoverLetter
    }).catch(console.error)
}
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 18,
              textTransform: "uppercase",
              fontFamily: "sans-serif-condensed"
            }}
          >
            Apply to job
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            multiline={true}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Cover letter"
            placeholderTextColor="#3cc194"
            autoCapitalize="none"
            value={this.state.CoverLetter}
            onChangeText={this.handleCoverLetter}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.handleSubmit} style={styles.btn}>
            <Text style={styles.btnText}>Apply</Text>
          </TouchableOpacity>
        </View>
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
  }
});
