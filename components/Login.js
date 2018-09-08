import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, AsyncStorage } from 'react-native';

class Login extends React.Component {
  static navigationOptions = {
    title: 'Login'
  };

  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('user')
    .then(result => {
      var parsedResult = JSON.parse(result);
      var username = parsedResult.username;
      var password = parsedResult.password;
      if (username && password) {
        return this.login(username, password)
      }
      // Don't really need an else clause, we don't do anything in this case.
    })
    .catch(err => {alert(err)})
  }


  login(username, password) {
    fetch('http://4f6f3283.ngrok.io/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      if (json.success) {
        alert('Successfully Logged in!');
        this.props.navigation.navigate('Main')
      }
      else {
        alert('Login failed')
      }
    })
    .then(
      AsyncStorage.setItem('user', JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }))
    )
    .catch((err) => {
      console.log('error', err)
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.inputfield}
          placeholder='  Username'
          onChangeText={(username) => this.setState({username: username})}
          />


        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.inputfield}
          placeholder='  Password'
          onChangeText={(password) => this.setState({password: password})}
          secureTextEntry={true}
        />
        <Text>{"\n\n\n"}</Text>

        <TouchableOpacity
          style={[styles.button]}
          onPress={() => this.login(this.state.username, this.state.password)}>
          <Text style={styles.buttonLabel}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex:1,
    alignItems: "center",
    paddingTop: '40%',
    backgroundColor:'#E7792B'
  },
  inputfield:{
    margin: 3,
    width: 300,
    height: 40,
    borderRadius: 10,
    backgroundColor:'#fff',
    marginBottom:"10%",
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'white',
    width: 300
  },
  label:{
    color:"#fff",
    fontFamily: 'Cochin',
    fontSize: 23,
  },
  buttonLabel: {
    color:"#E7792B",
    textAlign: 'center',
    fontFamily: 'Cochin',
    fontSize: 23,
  }
});

export default Login;
