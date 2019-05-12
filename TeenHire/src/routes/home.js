import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid } from 'react-native'
import firebase from '../common/firebase1'
import { YellowBox } from 'react-native';
import { declaredPredicate } from '@babel/types';

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
            YellowBox.ignoreWarnings(['Setting a timer']);
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
            <View style = {styles.container}>
                <View style = {styles.titleContainer}>
                    <Text style={{color: "white", textAlign: "center"}}>Welcome {this.state.profileInfo.lastName}</Text>
                    <Text style={{color: "white", textAlign: "center"}}>Job Seeker</Text>
                </View>
                <View style = {styles.buttonContainer}>
                        <Button title='Sign out' color = '#3cc194'
                        onPress={this.handleSignOut}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#06152a"
    },
    buttonContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 40
    },
    titleContainer: {
        marginBottom: 2
    }
})