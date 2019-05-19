import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid, FlatList, StatusBar} from 'react-native'
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import firebase from '../common/firebase1'
import { YellowBox } from 'react-native';
import JobSeeker from '../components/jobseeker';
import Employer from '../components/employer';

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
            YellowBox.ignoreWarnings(['Setting a timer']);
        this.state = {
            profileInfo: '',
            jobsPosted: '',
        }
    }

    componentDidMount() {
        StatusBar.setHidden(true);
        var user = firebase.auth().currentUser;
        var docRef1 = firebase.firestore().collection("users").doc(user.uid);
        docRef1.get().then((doc) =>{
            if(doc.exists){
                this.setState({profileInfo: doc.data()});
            } else {
                ToastAndroid.show('No such doc', ToastAndroid.SHORT);
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
        let MainComponent;
        if(this.state.profileInfo.role == 'Employer') {
            MainComponent = 
            <View>
                <View style = {styles.headerContainer}>
                    <View style = {styles.titleContainer}>
                        <Text style={{color: "white", textAlign: "center"}}>Welcome {this.state.profileInfo.lastName}</Text>
                        <Text style={{color: "white", textAlign: "center"}}>{this.state.profileInfo.role}</Text>
                    </View>
                    <View style = {styles.buttonContainer}>
                        <Button
                        title='Add Posts' color = '#3cc194'
                        onPress={() => this.props.navigation.navigate('Posts')}/>
                        <Button 
                        title='Sign out' color = '#3cc194'
                        onPress={this.handleSignOut}/>
                    </View>
                </View>
                <Employer /> 
            </View>
        } else {
            MainComponent = 
            <View>
                <View style = {styles.headerContainer}>
                    <View style = {styles.titleContainer}>
                        <Text style={{color: "white", textAlign: "center"}}>Welcome {this.state.profileInfo.lastName}</Text>
                        <Text style={{color: "white", textAlign: "center"}}>{this.state.profileInfo.role}</Text>
                    </View>
                    <View style = {styles.buttonContainer}>
                        <Button 
                        title='Sign out' color = '#3cc194'
                        onPress={this.handleSignOut}/>
                    </View>
                </View>
                <JobSeeker />
            </View>
        }
        return (
            <View style = {styles.container}>
                {MainComponent}
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
    headerContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 30,
    },
    titleContainer: {
        marginBottom: 2
    }
})