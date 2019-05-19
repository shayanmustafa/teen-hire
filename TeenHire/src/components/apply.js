import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid, FlatList, StatusBar } from 'react-native'
import { Container, Content, Card, CardItem, Body } from 'native-base';
import firebase from '../common/firebase1'

export default class ApplyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            CoverLetter: ''
        }
    }
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handleCoverLetter = (text) => {
        this.setState({ CoverLetter: text })
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
                        placeholder = "Email address"
                        placeholderTextColor = "#3cc194"
                        autoCapitalize = "none"
                        value = {this.state.email}
                        onChangeText = {this.handleEmail}/>
                    <TextInput style = {styles.input}
                        underlineColorAndroid = "transparent"
                        placeholder = "Cover letter"
                        placeholderTextColor = "#3cc194"
                        autoCapitalize = "none"
                        value = {this.state.CoverLetter}
                        onChangeText = {this.handleCoverLetter}/>
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