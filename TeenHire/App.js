import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SignUpScreen from "./src/routes/signup";
import SignInScreen from "./src/routes/signin";
import HomeScreen from "./src/routes/home";
import PostsScreen from "./src/routes/posts";
import ApplyScreen from "./src/components/apply";
import JobSeeker from "./src/components/jobseeker";

const RootStack = createStackNavigator(
  {
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        title: "SignIn",
        header: null //this will hide the header
      }
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: {
        header: null
      }
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Home",
        header: null
      }
    },
    Posts: {
      screen: PostsScreen,
      navigationOptions: {
        title: "Posts",
        header: null
      }
    },
    Apply: {
      screen: ApplyScreen,
      navigationOptions: {
        title: "Apply",
        header: null
      }
    },
    JobSeeker: {
      screen: JobSeeker,
      navigationOptions: {
        title: "JobSeeker",
        header: null
      }
    }
  },
  {
    initialRouteName: "SignIn"
  },
  { headerMode: "none" }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
