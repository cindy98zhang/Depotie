import React from 'react';
import { ScrollView,TouchableOpacity, StyleSheet, Text, View, TextInput, ListView, AsyncStorage, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { ImagePicker } from 'expo';

url = "http://c16b4460.ngrok.io"

class CreateMyPost extends React.Component {
  static navigationOptions = {
    title: 'New Post'
  };

  constructor() {
    super();
    this.state = {
      username: "",
      title: "",
      introduction: "",
      image: "",
      item: "",
      num: "",
      price: "",
      things: [],
      class: "",
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('user')
    .then(result => {
      var parsedResult = JSON.parse(result);
      var username = parsedResult.username;
      this.setState({username: username})
    })
    .catch(err => {alert(err)})
  }

  addDetail() {
    this.setState({
      things: this.state.things.concat([{
        item: this.state.item,
        num: this.state.num,
        price: this.state.price
      }])
    });
    this.setState({
      item: "",
      num: "",
      price: ""
    });
  }

  post() {
    fetch(url + '/createmypost', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        title: this.state.title,
        image: this.state.image,
        introduction: this.state.introduction,
        things: this.state.things,
        class: this.state.class
      })
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.success) {
        this.props.navigation.navigate('Main');
      }
    })
    .catch((err) => {
      console.log('error', err)
    });
  }

  render() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => (r1 !== r2)
    });
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.flexstyle}>
          <Text style={styles.info}>Title</Text>
          <TextInput
            style={styles.inputfield}
            placeholder='  Title'
            onChangeText={(title) => this.setState({title: title})}
            value = {this.state.title}
          />
        </View>

        <View style={styles.flexstyle}>
          <Text style={styles.info}>Description</Text>
          <TextInput
            style={styles.inputfield}
            placeholder='  Description'
            onChangeText={(introduction) => this.setState({introduction: introduction})}
            value = {this.state.introduction}
          />
        </View>


        <Image source={{uri: this.state.image}}
          style={{width: 300, height: 300,marginLeft:60, borderColor:'#fff',borderWidth:2}} />
          <View style={styles.flexstyle}>
            <Text style={styles.info}>URI</Text>
            <TextInput
              style={styles.inputfield}
              placeholder='  ImageUri'
              onChangeText={(uri) => this.setState({image: uri})}
              value = {this.state.image}
            />
          </View>
        <ListView
          renderRow={(detail) => (
            <View>
              <Text>{detail.item}</Text>
              <Text>{detail.num}</Text>
              <Text>{detail.price}</Text>
            </View>
          )}
          dataSource = {dataSource.cloneWithRows(this.state.things)}
        />
        <Text style={{color:'#fff',fontSize: 18, marginLeft:5,fontWeight:'bold'}}>Items detail</Text>
        <View style={styles.flexstyle}>
          <Text style={styles.info}>Item name</Text>
          <TextInput
            style={styles.inputfield}
            onChangeText={(item) => this.setState({item: item})}
            value = {this.state.item}
          />
        </View>
        <View style={styles.flexstyle}>
          <Text style={styles.info}>Quantity</Text>
          <TextInput
            style={styles.inputfield}
            onChangeText={(num) => this.setState({num: num})}
            value = {this.state.num}
          />
          </View>
          <View style={styles.flexstyle}>
          <Text style={styles.info}>Price</Text>
          <TextInput
            style={styles.inputfield}
            onChangeText={(price) => this.setState({price: price})}
            value = {this.state.price}
          />
          </View>
          <TouchableOpacity onPress={() => this.addDetail()}>
            <Text style={{fontSize:70, fontWeight:'bold'}}>+</Text>
          </TouchableOpacity>

        <TextInput
          placeholder='  Class'
          onChangeText={(className) => this.setState({class: className})}
          value = {this.state.class}
        />
        <View>
          <TouchableOpacity onPress={() => this.post()}>
            <Text>Submit</Text>
          </TouchableOpacity>
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
  info:{
    color:'#fff',
    fontSize: 18,
    marginLeft:5,
    width:100
  },
  flexstyle:{
    flexDirection: "row",
    marginLeft:10,
    justifyContent:'center',
    alignItems:'flex-start'
  },
  inputfield:{
    margin: 3,
    width: 300,
    height: 40,
    borderRadius: 10,
    backgroundColor:'#fff',
  },
});

export default CreateMyPost;
