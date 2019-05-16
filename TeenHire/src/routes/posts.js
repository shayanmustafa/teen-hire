import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid } from 'react-native'
import firebase from '../common/firebase1'

export default class PostsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobTitle: '',
            jobDesc: ''
        }
    }
    handleJobTitle = (text) => {
        this.setState({jobTitle: text})
    }
    handleJobDesc = (text) => {
        this.setState({jobDesc: text})
    }
    handlePost = () => {
        var user;
        if(this.state.jobTitle != '' || this.state.jobDesc != '') {
            user = firebase.auth().currentUser;
            firebase.firestore().collection("posts").doc(user.uid).set({
                jobTitle: this.state.jobTitle,
                jobDescription: this.state.jobDesc
            }).then(function() {
                console.log("Document successfully written.")
                //this.props.navigation.navigate('Home');
            }).catch(function(){
                console.error("Error writing document: ", error)
            });
            this.props.navigation.navigate('Home');
        } else {
            ToastAndroid.show('One or more fields are missing', ToastAndroid.SHORT);
        }
    }
    render() {
        return(
            <View style={styles.container}>
                <Text style={{color: 'white', textAlign: 'center'}}>Post your job</Text>
                <TextInput style = {styles.input}
                        underlineColorAndroid = "transparent"
                        placeholder = "Job Title"
                        placeholderTextColor = "#3cc194"
                        autoCapitalize = "none"
                        value = {this.state.jobTitle}
                        onChangeText = {this.handleJobTitle}/>
                    <TextInput style = {styles.input}
                        underlineColorAndroid = "transparent"
                        placeholder = "Job Description"
                        placeholderTextColor = "#3cc194"
                        autoCapitalize = "none"
                        value = {this.state.jobDesc}
                        onChangeText = {this.handleJobDesc}/>
                    <Button title="Post" color = '#3cc194' onPress={this.handlePost} />
            </View>
        )
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