import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid } from 'react-native'
import firebase from '../common/firebase1'

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            profileInfo: ''
        }
    }

    componentDidMount() {
        var user = firebase.auth().currentUser;
        var docRef = firebase.firestore().collection("users").doc(user.uid);
        docRef.get().then((doc) =>{
            if(doc.exists){
                this.setState({profileInfo: doc.data()});
            } else {
                console.log("No such doc");
            }
        }).catch(function(error){
            console.log("Error getting document", error);
        });
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
                <Text>Welcome {this.state.profileInfo.email}</Text>
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