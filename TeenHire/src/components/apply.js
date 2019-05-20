import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid, FlatList, StatusBar } from 'react-native'
import { Container, Content, Card, CardItem, Body } from 'native-base';
import email from 'react-native-email'
import firebase from '../common/firebase1'

export default class ApplyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            CoverLetter: ''
        }
    }
    handleCoverLetter = (text) => {
        this.setState({ CoverLetter: text })
    }
    handleSubmit = () => {
        const to = ['mustafa.shayan97@outlook.com'] // string or array of email addresses
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
            <View style = {styles.container}>
                <View style = {styles.titleContainer}>
                    <Text style={{color: '#c1c1c1', textAlign: 'center', fontSize: 28, fontFamily: 'sans-serif-condensed', marginBottom: 20}}>Fill out the information</Text>
                </View>
                <View style = {styles.inputContainer}>
                    <TextInput style = {styles.input}
                        underlineColorAndroid = "transparent"
                        placeholder = "Cover letter"
                        placeholderTextColor = "#3cc194"
                        autoCapitalize = "none"
                        value = {this.state.CoverLetter}
                        onChangeText = {this.handleCoverLetter}/>
                </View>
                <View style= {styles.buttonContainer}>
                    <Button title="Apply" color = '#3cc194' onPress={this.handleSubmit} />
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