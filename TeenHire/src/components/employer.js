import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid, FlatList, StatusBar } from 'react-native'
import { Container, Content, Card, CardItem, Body } from 'native-base';
import firebase from '../common/firebase1'

export default class Employer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobsPosted: ''
        }
    }
    componentDidMount() {
        var user = firebase.auth().currentUser;
        firebase.firestore().collection("posts").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.setState({
                    jobsPosted: [...this.state.jobsPosted, doc.data()]
                });
            });
        })
    }
    render() {
        return (
            <View>
                <Text style={{color: "white", textAlign: "center"}}>Employer Component</Text>
                <FlatList
                data={this.state.jobsPosted}
                renderItem={({item}) =>
                    <Container  style={styles.cardContainer}>
                        <Content>
                            <Card>
                                <CardItem header>
                                        <Text style={{color: "black", fontWeight: "bold", textAlign: "center"}}>{item.jobTitle}</Text>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text style={{color: "black"}}>{item.jobDescription}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem footer>
                                        <Text>Apply now</Text>
                                </CardItem>
                            </Card>
                        </Content>
                    </Container>
                }/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'column',
        backgroundColor: "#06152a"
    },
    titleContainer: {
        marginBottom: 2
    }
})