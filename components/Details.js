import React from 'react';
import { FlatList, ScrollView,TouchableOpacity, StyleSheet, Text, View, TextInput, ListView, Image, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import NavBar from './NavBar.js';

url = "http://413ac210.ngrok.io"

class Details extends React.Component {
  static navigationOptions = {
    title: 'Details'
  };

  constructor() {
    super();
    console.log("Deatils");
    this.state = {
      post: undefined
    }
  }

  componentDidMount() {
    var post = this.props.navigation.getParam('detailOfPost', {});
    console.log(post);
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
        <View style={{flex: 1,}}>
          <View style={styles.container}>
            <Text style={styles.major}>Author: {post.owner}</Text>
            <Text style={styles.major}>Post date: {post.date}</Text>
            <Text style={styles.major}>Title: {post.body.title}</Text>
            <Text style={styles.major}>Style: {post.body.class}</Text>
            <Text style={styles.major}>Description: {post.body.introduction}</Text>
            <Image source={{uri: post.body.image}}
              style={{marginLeft:30, width: 350, height: 350}}
            />
            <Text style={styles.major}>Likes: {post.likes.length}</Text>
            <View>
              <Text style={{color:'#fff',fontSize: 18,marginLeft:10,fontWeight:'bold'}}>Comments: </Text>
              {post.comments.map(p => {
                return <Text style={{color:'#fff',marginLeft:40,fontSize:14}}>{p.comment}</Text>
              })}
            </View>
            <View>
              <Text style={{color:'#fff',fontSize: 18,marginLeft:10,fontWeight:'bold'}}>All the things: </Text>
              {post.detail.map(d => {
                return <Text style={{color:'#fff',marginLeft:40,fontSize:14}}>{d.item} {d.num} {d.price}</Text>
              })}
            </View>
          </View>
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
