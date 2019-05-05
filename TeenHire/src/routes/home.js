import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid } from 'react-native'
import firebase from '../common/firebase1'

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        //this.user = firebase.auth().currentUser;
        //this.userRef = firebase.firestore().collection("users");
    }
    handleSignOut = () => {
        firebase.auth().signOut().then(() => {
            this.props.navigation.navigate('SignIn');
            ToastAndroid.show('Signed out', ToastAndroid.SHORT);
        }).catch(function(error){
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }
    render() {
        return (
            <View>
                <Text>Home Screen</Text>
                <Text></Text>
                <View style = {styles.buttonContainer}>
                        <Button title='Sign out' color = '#3cc194'
                        onPress={this.handleSignOut}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 40
    }
})