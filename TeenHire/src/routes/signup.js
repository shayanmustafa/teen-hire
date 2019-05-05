import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Picker, ToastAndroid } from 'react-native'
//import {auth} from '../common/firebase'
import firebase from '../common/firebase1'

export default class SignUpScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }
    handleFirstName = (text) => {
        this.setState({ firstName: text })
    }
    handleLastName = (text) => {
        this.setState({ lastName: text })
    }
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }
    handleConfirmPassword = (text) => {
        this.setState({ confirmPassword: text })
    }

    handleSignUp = () => {
        var user; 
        if (this.state.firstName != '' || this.state.lastName != '' || this.state.email != '' || this.state.password != '' || this.state.confirmPassword != '') {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
                firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
                    user = firebase.auth().currentUser;
                    firebase.firestore().collection("users").doc(user.uid).set({
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        email: this.state.email
                    }).then(function() {
                        console.log("Document successfully written.")
                    }).catch(function() {
                        console.error("Error writing document: ", error);
                    });
                })
            }).then(() => {
                this.props.navigation.navigate('Home');
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
        }
        else {
            ToastAndroid.show('One or more fields are missing', ToastAndroid.SHORT);
        }
    }

    render() {
        return(
            <View style = {styles.container}>
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "First name"
                    placeholderTextColor = "#3cc194"
                    autoCapitalize = "none"
                    value = {this.state.firstName}
                    onChangeText = {this.handleFirstName}/>
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Last name"
                    placeholderTextColor = "#3cc194"
                    autoCapitalize = "none"
                    value = {this.state.lastName}
                    onChangeText = {this.handleLastName}/>
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Email"
                    placeholderTextColor = "#3cc194"
                    autoCapitalize = "none"
                    value = {this.state.email}
                    onChangeText = {this.handleEmail}/>
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Password"
                    placeholderTextColor = "#3cc194"
                    autoCapitalize = "none"
                    secureTextEntry={true}
                    value = {this.state.password}
                    onChangeText = {this.handlePassword}/>
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Confirm password"
                    placeholderTextColor = "#3cc194"
                    autoCapitalize = "none"
                    secureTextEntry={true}
                    value = {this.state.confirmPassword}
                    onChangeText = {this.handleConfirmPassword}/>
                <Button title="Register" onPress={this.handleSignUp} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: "#06152a",
    },
    input: {
        borderRadius: 8,
        marginLeft: 25,
        marginBottom: 10,
        borderColor: '#c1c1c1',
        borderWidth: 1,
        color: 'white',
        textAlign: 'center',
        width: '85%'
    }
})