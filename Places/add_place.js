import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet
} from 'react-native';

export default class AddPlace extends Component {
  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>Name</Text>
        <TextInput style={styles.textInput}></TextInput>
        <Text style={styles.text}>Latitude</Text>
        <TextInput style={styles.textInput}></TextInput>
        <Text style={styles.text}>Longitude</Text>
        <TextInput style={styles.textInput}></TextInput>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30
  },
  text: {
    color: '#333333',
    marginBottom: 5
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10
  }
});
