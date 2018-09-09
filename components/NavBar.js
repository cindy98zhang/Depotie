import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text, View, TextInput, ListView, Image, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Main from './Main.js';
import Mine from './Mine.js';
import CreateMyPost from './CreateMyPost.js'

class NavBar extends React.Component {
  constructor() {
    super()
  }

  render() {
      return (
        <View style={{backgroundColor:'#E7792B',marginTop:5,marginBottom: 10, width: "100%", height: 45, flexDirection: "row", justifyContent: "space-between"}}>

          <View style={styles.block}>
            <TouchableOpacity onPress= {() => this.props.goToPost()}>
              <Text style={styles.texxt}>Feeds</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.block}>
            <TouchableOpacity onPress={() => this.props.goToMine()}>
              <Text style={styles.texxt}>Me</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.block}>
            <TouchableOpacity onPress={() => this.props.goToNotifications()}>
              <Text style={styles.texxt}>News</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.block}>
            <TouchableOpacity onPress={() => this.props.goToNotifications()}>
              <Text style={styles.texxt}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  block:{
    marginTop:5,
    marginLeft:7,
    marginRight:7,
    marginBottom:5,
    height: 40,
    width:87,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center',
  },
  texxt:{
    color:"#E7792B",
    fontSize: 18,
    fontWeight:'bold'
  }
});

export default NavBar;
