import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Picker, ToastAndroid } from 'react-native'
import { RadioGroup } from 'react-native-btr';
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
            radioButtons: [
                {
                  label: 'Job Seeker',
                  value: 'Job Seeker',
                  checked: false,
                  color: '#3cc194',
                  disabled: false,
                  flexDirection: 'row',
                  size: 8
         
                },
         
                {
                  label: 'Employer',
                  value: 'Employer',
                  checked: false,
                  color: '#3cc194',
                  disabled: false,
                  flexDirection: 'row',
                  size: 8
         
                }
            ],
            selected: '' 
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
                    let selectedItem = this.state.radioButtons.find(e => e.checked == true);
                    selectedItem = selectedItem ? selectedItem.value : this.state.radioButtons[0].value;
                    this.setState({selected: selectedItem})
                    firebase.firestore().collection("users").doc(user.uid).set({
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        email: this.state.email,
                        role: this.state.selected
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
                <View style = {styles.titleContainer}>
                    <Text style={{color: '#c1c1c1', textAlign: 'center', fontSize: 28, fontFamily: 'sans-serif-condensed', marginBottom: 20}}>Register yourself</Text>
                </View>
                <View style = {styles.inputContainer}>
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
                        <View style={{marginLeft: 150, flexDirection: 'row', justifyContent: 'center'}}>
                            <RadioGroup
                                color='#0277BD'
                                labelStyle={{ fontSize: 14, }}
                                radioButtons={this.state.radioButtons}
                                onPress={radioButtons => this.setState({ radioButtons })}
                                style={{ paddingTop: 20 }}/>
                        </View>
                </View>
                <View style= {styles.buttonContainer}>
                    <Button title="Register" color = '#3cc194' onPress={this.handleSignUp} />
                </View>
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
    },
    buttonContainer: {
        justifyContent: 'center',
        flexDirection: 'row'
    }
})