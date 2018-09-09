import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput } from 'react-native';
url = "http://c16b4460.ngrok.io"

class Register extends React.Component {
  static navigationOptions = {
    title: 'Register'
  };

  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  register() {
    fetch(url + '/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.success) alert('Successfully registered')
      else alert('Registration failed')
      this.props.navigation.navigate('Login');
    })
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
          placeholder='  At Least 6 Characters'
          onChangeText={(password) => this.setState({password: password})}
          secureTextEntry={true}
        />
        <Text>{"\n\n\n"}</Text>

        <TouchableOpacity
          style={[styles.button]}
          onPress={this.register.bind(this)}>
          <Text style={styles.buttonLabel}>Register</Text>
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
    fontSize: 23,
  },
  buttonLabel: {
    color:"#E7792B",
    textAlign: 'center',
    fontSize: 23,
  }
});


export default Register;
