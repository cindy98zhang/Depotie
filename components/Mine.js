import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, TextInput, ListView, AsyncStorage, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { ImagePicker } from 'expo';
import NavBar from './NavBar.js';

url = "http://1476ebd9.ngrok.io"

class Mine extends React.Component {
  static navigationOptions = {
    title: 'My posts'
  };

  constructor() {
    super();
    this.state = {
      myposts: [],
      username: "",
      // currentPage: "Mine"
    }
  }

  async componentDidMount() {
    var username = this.props.navigation.getParam("username", "");
    await this.setState({username: username});
    console.log(this.state.username);
    fetch(url+'/myposts', {
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
      if (json.posts.length >= 0) {
        this.setState({myposts: json.posts})
      }
      if (json.notify.length > 0) {
        let str = " ";
        str += json.notify[0].body.title + " ";
        for (var i = 1; i < json.notify.length; i++) {
          str += "and " + json.notify[i].body.title + " "
        }
        alert("Your post" + str + "got over 5 likes");
      }
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

  showDetail(post) {
    this.props.navigation.navigate('Details', {detailOfPost: post});
  }

  goToNotifications() {
    this.props.navigation.navigate('Notifications', {username: this.state.username});
  }

  likes(index) {

    fetch(url+'/likes', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        id: index
      })
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.success) {
        for (var i = 0; i < this.state.myposts.length; i++) {
          if (index === this.state.myposts[i]._id) {
            for (var j = 0; j < this.state.myposts[i].likes.length; j++) {
              if (this.state.myposts[i].likes[j] === this.state.username) return;
            }

            this.setState({
              myposts: this.state.myposts.map((post, ind) => (ind === i ? Object.assign({}, post, {likes: post.likes.concat([this.state.username])}) : post))
            })
          }
        }
      }
    })
    .catch((err) => {
      console.log('error', err)
    });
  }

  sendComment(index) {
    fetch(url+'/sendcomment', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        id: index,
        comment: this.state.comment
      })
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.success) {

        this.setState({
          myposts: this.state.myposts.map((post) => (
            post._id === index ?
            Object.assign({}, post, {
              comments: post.comments.concat([{
                username: this.state.username,
                comment: this.state.comment
              }])
            })
            :
            post
          ))
        });
        this.setState({comment: ""});

      }
    })
    .catch((err) => {
      console.log('error', err)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View >
          <NavBar
            // currentPage={this.state.currentPage}
            goToNotifications={() => this.goToNotifications()}
            goToMine={() => this.goToMine()}
          goToPost={() => this.goToPost()}
          createMyPost={() => this.createMyPost()}/>
        </View>
        <View>
          <FlatList
            renderItem={(item) => {
              const post = item.item;
              return (
                <View style={styles.container}>
                  <Text style={{fontSize:5}}>{"\n"}</Text>
                  <Text style={{color:"#E7792B",fontSize: 20,marginLeft: 20}}>User: {post.owner}</Text>
                  <Text style={{color:"#E7792B",fontSize: 20,marginLeft: 20}}>{post.body.title}</Text>
                  <Text style={{color:"#E7792B",fontSize: 20,marginLeft: 20}}>{post.body.introduction}</Text>
                  <Text style={{fontSize:5}}>{"\n"}</Text>
                  <View style={{alignItems: "center"}}><Image
                    source={{uri: post.body.image}}
                    style={styles.postImage}
                  /></View>

                  <Text style={{color:"#E7792B",fontSize: 12, marginTop:3}}>    Date Posted: {post.date}{"\n"}</Text>

                  <View style={{flexDirection: "row", justifyContent: "space-between"}}>

                    <TouchableOpacity
                      style={[styles.button]}
                      onPress={(i) => this.likes(post._id)}>
                      <Text style={{color:"#fff",fontSize: 18,fontWeight:'bold'}}>Likes: {post.likes.length}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.button]}
                      onPress={(i) => this.showDetail(post)}>
                      <Text style={{color:"#fff",fontSize: 16,fontWeight:'bold'}}>Details</Text>
                    </TouchableOpacity>
                  </View>
                  <View>

                    <Text style={{color:"#E7792B",fontSize: 18,marginTop: 10,marginLeft: 20}}>Comments: </Text>
                    {post.comments.map(p => {
                      return <Text style={{color:"#E7792B",fontSize: 15, marginLeft:50,marginRight:20, borderRadius:10}}>{p.username}: {p.comment}</Text>
                    })}
                  </View>
                  <Text style={{color:"#E7792B",fontSize: 15,marginTop: 4,marginLeft: 20}}>Add Reply: </Text>
                  <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                  <TextInput
                    style={styles.inputfield}
                    placeholder='  Add a comment...'
                    onChangeText={(comment) => this.setState({comment: comment})}
                  />
                  <TouchableOpacity
                    style={[styles.buttonPost]}
                    onPress={(i) => this.sendComment(post._id)}>
                    <Text style={{color:"#fff",fontSize: 16}}>Post</Text>
                  </TouchableOpacity>
                  </View>
                  <Text style={{fontSize:20}}>{"\n"}</Text>
                </View>
              )}}
              data = {this.state.myposts}
            />
          </View>

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


export default Mine;
