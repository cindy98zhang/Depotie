import React from 'react';
import { FlatList, TouchableOpacity, ScrollView, StyleSheet, Text, View, Button, TextInput, ListView, Image, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackNavigator } from 'react-navigation';
import NavBar from './NavBar.js';
import Details from './Details.js'

url = "http://929f8ad5.ngrok.io"

class Notifications extends React.Component {
  static navigationOptions = {
    title: 'Main'
  };

  constructor() {
    super();
    this.state = {
      notifications: null,
      notificationLikes: null,
      notificationComments: null,
      username: "",
      // currentPage: "Main"
    }
  }

  async componentDidMount() {
    let username = this.props.navigation.getParam('username', "no-name");
    await this.setState({username: username})
    fetch(url+'/notifications', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username
      })
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      this.setState({
        notifications: json.notifications,
        notificationLikes: json.notificationLikes,
        notificationComments: json.notificationComments
      })
    })
    .catch((err) => {
      console.log('error', err)
    });
  }

  createMyPost() {
    this.props.navigation.navigate('CreateMyPost', {username: this.state.username});
  }

  goToPost() {
    this.props.navigation.navigate('Main');
  }

  goToMine() {
    this.props.navigation.navigate('Mine', {username: this.state.username});
  }

  goToNotifications() {
    this.props.navigation.navigate('Notifications', {username: this.state.username});
  }

  render() {
console.log(this.state)
    return (
      <View style={styles.container}>
        <ScrollView>
        <View >
          <NavBar
            // currentPage={this.state.currentPage}
            goToNotifications={() => this.goToNotifications()}
            goToMine={() => this.goToMine()}
            goToPost={() => this.goToPost()}
            createMyPost={() => this.createMyPost()}/>
          </View>
          <View>
            <Text>怎么写</Text>
            <FlatList
              renderItem={(item) => {
                const notification = item.item;
                console.log(notification)
                return (
                  <View><Text>Your post {notification.title} got over 5 likes</Text></View>
                )
              }}
              data = {this.state.notifications}
            />
          </View>
          <View>
            <Text>不会写</Text>
            <FlatList
              renderItem={(item) => {
                const notification = item.item;
                console.log(notification)
                return (
                  <View><Text>{notification.username} likes your post {notification.title}</Text></View>
                )
              }}
              data = {this.state.notificationLikes}
            />
          </View>
          <View>
            <Text>你来写</Text>
            <FlatList
              renderItem={(item) => {
                const notification = item.item;
                console.log(notification)
                return (
                  <View><Text>{notification.username} comments your post {notification.title}</Text></View>
                )
              }}
              data = {this.state.notificationComments}
            />
          </View>
        </ScrollView>
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#fff'
    },
    main: {
      flex: 1
    },
    postImage:{
      width: 350,
      height: 350,
    },
    postInfo:{
      color:"#E7792B",
      fontSize: 23,
    },
    inputfield:{
      marginLeft:20,
      margin: 3,
      width: 300,
      height: 40,
      borderRadius: 10,
      backgroundColor:'#E7792B',
    },
    date:{
      color:"#E7792B",
      fontSize: 10,
    },
    button: {
      marginLeft:20,
      marginRight:20,
      alignItems: 'center',
      justifyContent:'center',
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#E7792B',
      width: 100
    },
    buttonPost: {
      marginRight:20,
      alignItems: 'center',
      justifyContent:'center',
      borderRadius: 10,
      backgroundColor: '#E7792B',
      width: 70
    },
  });


  export default Notifications;
