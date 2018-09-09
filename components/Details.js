import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text, View, TextInput, ListView, Image, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import NavBar from './NavBar.js';

url = "http://2f5caa14.ngrok.io"

class Details extends React.Component {
  static navigationOptions = {
    title: 'Details'
  };

  constructor() {
    super();
    console.log("Deatilsssssssssssssssss");
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
    // const post = this.props.navigation.getParam('detailOfPost', {}); //this.state.post;
    // console.log(post.owner);
    const post = this.state.post;
    if (!post) {
      return <View><Text>hello</Text></View>
    }
    return (
      <View style={{
        flex: 1,
      }}>
        <View style={{
          flex: 1,
        }}>
          <View style={styles.container}>
            <Text>{post.owner}</Text>
            <Text>{post.date}</Text>
            <Text>{post.body.title}</Text>
            <Text>{post.body.class}</Text>
            <Text>{post.body.introduction}</Text>
            <Image source={{uri: post.body.image}}
              style={{width: 100, height: 100}}
            />
            <Text>Likes: {post.likes.length}</Text>
            <View>
              <Text>Comments: </Text>
              {post.comments.map(p => {
                return <Text>{p.comment}</Text>
              })}
            </View>
            <View>
              <Text>All the things: </Text>
              {post.detail.map(d => {
                return <Text>{d.item} {d.num} {d.price}</Text>
              })}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 50,
  },
  main: {
    flex: 1
  }
});

export default Details;
