import React from 'react';
import { FlatList, ScrollView,TouchableOpacity, StyleSheet, Text, View, TextInput, ListView, Image, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import NavBar from './NavBar.js';

url = "http://c16b4460.ngrok.io"

class Details extends React.Component {
  static navigationOptions = {
    title: 'Details'
  };

  constructor() {
    super();
    this.state = {
      post: undefined
    }
  }

  componentDidMount() {
    var post = this.props.navigation.getParam('detailOfPost', {});
    this.setState({post: post})
  }


  render() {
    const post = this.state.post;
    if (!post) {
      return <View><Text>hello</Text></View>
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.major, {marginRight: 10,marginLeft: 10, fontSize: 18, color: 'white'}}>Author: {post.owner}</Text>
          <Text style={styles.major, {marginRight: 10,marginLeft: 10,fontSize: 12, color: 'white'}}>Post date: {post.date}</Text>
          <Text style={styles.major, {marginRight: 10,marginLeft: 10,fontSize: 24, color: 'white',textAlign:"center"}}>Title: {post.body.title}</Text>
          <Text style={styles.major, {marginRight: 10,marginLeft: 10,fontSize: 16, color: 'white', textAlign:"right"}}>Style: {post.class}</Text>
          <Text style={styles.major, {marginRight: 10,marginLeft: 10,fontSize: 16, color: 'white',textAlign:"justify"}}>Description: {post.body.introduction}</Text>
          <Image source={{uri: post.body.image}}
            style={{marginLeft:30, width: 350, height: 350}}
          />
          <Text style={styles.major}>Likes: {post.likes.length}</Text>
          <View>
            <Text style={{color:'#fff',fontSize: 18,marginLeft:10,fontWeight:'bold'}}>Comments: </Text>
            {post.comments.map(p => {
              return <Text style={{color:'#fff',marginLeft:40,fontSize:14}}>{p.username}: {p.comment}</Text>
            })}
          </View>
          <View>
            <Text style={{color:'#fff',fontSize: 18,marginLeft:10,fontWeight:'bold'}}>All the things: </Text>
            {post.detail.map(d => {
              return <Text style={{color:'#fff',marginLeft:40,fontSize:14}}>{d.item} {d.num} {d.price}</Text>
            })}
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

export default Details;
