import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { LinearGradient} from 'expo';
import Login from './components/Login.js';
import Register from './components/Register.js';



class App extends React.Component {

  static navigationOptions = (props) => {
    title: "Home Page"
  }

  render() {
    return (
      <View style={styles.container}>
          <Image style={{width: 150, height: 150}} source={require('./assets/icon.png')}/>
          <Text style={styles.title}>Depotie</Text>

          <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")} style={styles.button}>
            <Text style={styles.buttonLabel}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")} style={styles.button}>
            <Text style={styles.buttonLabel}>Register</Text>
          </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex:1,
    alignItems: "center",
    justifyContent:"space-between",
    paddingTop: '30%',
    paddingBottom: '20%',
    backgroundColor:'#E7792B'
  },
  button: {
    alignItems: 'center',
    padding: 7,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'white',
    width: 300
  },
  title: {
    color:"#fff",
    fontFamily: 'Cochin',
    fontSize: 60,
    margin:30,
    paddingBottom: '15%',
    textAlign: 'center',
    justifyContent: 'center'
  },
  buttonLabel: {
    color:"#E7792B",
    textAlign: 'center',
    fontFamily: 'Cochin',
    fontSize: 23,
  }
});


export default createStackNavigator({
  Home: {screen: App},
  Register: {screen: Register},
  Login: {screen: Login},

}, {initialRouteName: "Home"});
