import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, ListView, AsyncStorage, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { ImagePicker } from 'expo';

url = "http://2f5caa14.ngrok.io"

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
      // currentPage: "CreateMyPost"
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

  // pickImage() {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     base64: true,
  //   });
  //   if (!result.cancelled) {
  //     this.setState({
  //       image: result.uri,
  //     });
  //   }
  // };

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
  //    imageToBase64(img)
  // {
  //     var canvas, ctx, dataURL, base64;
  //     canvas = document.createElement("canvas");
  //     ctx = canvas.getContext("2d");
  //     canvas.width = img.width;
  //     canvas.height = img.height;
  //     ctx.drawImage(img, 0, 0);
  //     dataURL = canvas.toDataURL("image/png");
  //     base64 = dataURL.replace(/^data:image\/png;base64,/, "");
  //     return base64;
  // }

  post() {
    // let upload = false;
    // const uri = this.state.image;
    // const uriParts = uri.split('.');
    // const fileType = uriParts[uriParts.length - 1];
    // const formData = new FormData();
    // formData.append('photo', {
    //   uri: uri,
    //   name: `photo.${fileType}`,
    //   type: `image/${fileType}`,
    // });
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
      console.log(json);
      if (json.success) {
        this.props.navigation.navigate('Main');
      }
    })
    .catch((err) => {
      console.log('error', err)
    });
    // if (upload) {
    //   fetch(url + '/uploadimages', {
    //     method: "POST",
    //     body: formData
    //   })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     if (json.success) {
    //       this.props.navigation.navigate('Main');
    //     }
    //   })
    //   .catch((err) => {
    //     console.log('error', err)
    //   });
    // }
  }

  render() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => (r1 !== r2)
    });
    return (
      <View style={styles.container}>
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

          {/* <TouchableOpacity onPress={() => this.pickImage()}>
          <Text>Upload picture</Text>
        </TouchableOpacity> */}
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
