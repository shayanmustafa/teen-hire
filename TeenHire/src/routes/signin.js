import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid } from 'react-native'
import {auth} from '../common/firebase'


export default class SignInScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
        handleEmail = (text) => {
            this.setState({ email: text })
        }
        handlePassword = (text) => {
            this.setState({ password: text })
        }
        /*handleSignIn = () => {
            auth.signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (this.state.email == '' || this.state.password == '') {
                    ToastAndroid.show('Email or password missing', ToastAndroid.SHORT);
                } else if (errorCode === 'auth/wrong-password') {
                    ToastAndroid.show('Wrong password', ToastAndroid.SHORT);
                    //this.props.navigation.navigate('Home');
                } else if (errorCode === 'auth/user-not-found') {
                    ToastAndroid.show('User does not exist', ToastAndroid.SHORT);
                } else if (errorCode === 'auth/invalid-email') {
                    ToastAndroid.show('Invalid email', ToastAndroid.SHORT);
                }
                else {
                    this.props.navigation.navigate('Home');
                }
            });
        }*/
        handleSignIn = () => {
            if (this.state.email != '' || this.state.password != '') {
                auth.signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        ToastAndroid.show('Wrong password', ToastAndroid.SHORT);
                        //this.props.navigation.navigate('Home');
                    } else if (errorCode === 'auth/user-not-found') {
                        ToastAndroid.show('User does not exist', ToastAndroid.SHORT);
                    } else if (errorCode === 'auth/invalid-email') {
                        ToastAndroid.show('Invalid email', ToastAndroid.SHORT);
                    } 
                });
                this.props.navigation.navigate('Home');
            }
            else {
                ToastAndroid.show('Email or password missing', ToastAndroid.SHORT);
            }
        }
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.title}>
                    <Text style={{color: '#c1c1c1', textAlign: 'center', fontSize: 55, fontFamily: 'sans-serif-condensed'}}>TeenHire</Text>
                    <Text style={{color: '#3cc194', textAlign: 'center', fontSize: 25, fontFamily: 'sans-serif-condensed'}}>Gets you hired.</Text>
                </View>
                <View style = {styles.signInBox}>
                    <Text style={{color: '#c1c1c1', textAlign: 'center', fontSize: 20, fontFamily: 'sans-serif-condensed', marginBottom: 20}}>Sign in</Text>
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
                    textContentType = 'password'
                    value = {this.state.password}
                    secureTextEntry={true}
                    onChangeText = {this.handlePassword}/>
                </View>
                <View style = {styles.buttonContainer}>
                    <Button title='Sign in' color = '#3cc194'
                    onPress={this.handleSignIn}/>
                    <Button title='Sign up' color = '#3cc194'
                    onPress={() => this.props.navigation.navigate('SignUp')}/>
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
        flexDirection: 'row',
        marginBottom: 40
    },
    signInBox: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'space-between'
    }
})