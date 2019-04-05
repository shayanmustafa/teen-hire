import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

export default class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        handleEmail = (text) => {
            this.setState({ email: text })
        }
        handlePassword = (text) => {
            this.setState({ password: text })
        }
    }
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.title}>
                    <Text style={{color: '#c1c1c1', textAlign: 'center', fontSize: 55, fontFamily: 'notoserif'}}>TeenHire</Text>
                    <Text style={{color: '#3cc194', textAlign: 'center', fontSize: 25}}>Gets you hired.</Text>
                </View>
                <View style = {styles.signInBox}>
                    <Text style={{color: '#c1c1c1', textAlign: 'center', fontSize: 20, marginBottom: 20}}>Sign in</Text>
                    <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Email"
                    placeholderTextColor = "#3cc194"
                    autoCapitalize = "none"
                    onChangeText = {this.handleEmail}/>
                    <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Password"
                    placeholderTextColor = "#3cc194"
                    autoCapitalize = "none"
                    onChangeText = {this.handlePassword}/>
                </View>
                <View style = {styles.buttonContainer}>
                    <Button title='Sign in' color = '#3cc194' style={{marginRight: 10}}/>
                    <Button title='Sign up' color = '#3cc194'/>
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
        borderColor: '#c1c1c1',
        borderWidth: 1,
        color: 'white'
    },
    buttonContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignContent: 'space-between',
        marginBottom: 40
    },
    signInBox: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'space-between'
    }
})