import React from 'react';
import { FlatList, TouchableOpacity, ScrollView, StyleSheet, Text, View, Button, TextInput, ListView, Image, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackNavigator } from 'react-navigation';
import NavBar from './NavBar.js';
import Details from './Details.js'

url = "http://1476ebd9.ngrok.io"

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
            goToNotifications={() => this.goToNotifications()}
            goToMine={() => this.goToMine()}
            goToPost={() => this.goToPost()}
            createMyPost={() => this.createMyPost()}/>
          </View>
          <View>
            <Text style={styles.major}>System Reward Notifications</Text>
            <FlatList
              renderItem={(item) => {
                const notification = item.item;
                console.log(notification)
                return (
                  <View>
                    <Text>{"\n"}</Text>
                    <Text style={styles.major}>Nice Post! Your post {notification.title} got over 5 likes. Show this notification instore to get 10% off on your next purchase at Home Depot:)</Text>
                  </View>
                )
              }}
              data = {this.state.notifications}
            />
          </View>
          <View>

            <FlatList
              renderItem={(item) => {
                const notification = item.item;
                console.log(notification)
                return (
                  <View>
                    <Text>{"\n"}</Text>
                    <Text style={styles.major}>Wow!{notification.username} like your post {notification.title}! Get more likes to get HomeDepot discount!</Text>
                  </View>
                )
              }}
              data = {this.state.notificationLikes}
            />
          </View>
          <View>

            <FlatList
              renderItem={(item) => {
                const notification = item.item;
                console.log(notification)
                return (
                  <View>
                    <Text>{"\n"}</Text>
                    <Text style={styles.major}>{notification.username} comments your post {notification.title}</Text>
                  </View>
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
    container:{
      flex:1,
      backgroundColor:'#E7792B',
      justifyContent:'center',
      alignItems:'flex-start'
    },
    major:{
      color:'#fff',
      fontSize: 18,
      marginLeft:10,
    }
  });



  export default Notifications;
