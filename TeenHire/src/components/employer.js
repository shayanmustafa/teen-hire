import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid } from 'react-native'
import firebase from '../common/firebase1'

export default class Employer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }
    render() {
        return (
            <View>
                <Text style={{color: "white", textAlign: "center"}}>Employer Component</Text>
            </View>
        )
    }
}