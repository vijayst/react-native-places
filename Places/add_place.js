import React, { Component } from 'react';
import {
  AlertIOS,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  StyleSheet
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';

export default class AddPlace extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      latitude: '',
      longitude: '',
      titleError: '',
      latitudeError: '',
      longitudeError: ''
    };
  }

  handleAddPlace() {

    const { title, latitude, longitude } = this.state;
    let titleError = '';
    let latitudeError = '';
    let longitudeError = '';
    if (!title) {
      titleError = 'Name is required.';
    }
    if (!latitude) {
      latitudeError = 'Latitude is required.';
    }
    if (!longitude) {
      longitudeError = 'Longitude is required.';
    }

    this.setState({
      titleError,
      latitudeError,
      longitudeError
    });

    const isError = titleError || latitudeError || longitudeError;
    if (!isError) {
      this.props.onAddPlace({
        title,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      });

      AlertIOS.alert(
        'Place added',
        'Your place is added to the map. Click on the Favorites tab to view.'
      );
    }

    dismissKeyboard();
  }

  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={this.state.title}
          onChangeText={(title) => this.setState({ title })}
        ></TextInput>
        <Error message={this.state.titleError} />
        <Text style={styles.text}>Latitude</Text>
        <TextInput
          keyboardType="numbers-and-punctuation"
          style={styles.textInput}
          value={this.state.latitude}
          onChangeText={(latitude) => this.setState({ latitude })}
        ></TextInput>
        <Error message={this.state.latitudeError} />
        <Text style={styles.text}>Longitude</Text>
        <TextInput
          keyboardType="numbers-and-punctuation"
          style={styles.textInput}
          value={this.state.longitude}
          onChangeText={(longitude) => this.setState({ longitude })}
        ></TextInput>
        <Error message={this.state.longitudeError} />
        <TouchableHighlight style={styles.button} onPress={this.handleAddPlace.bind(this)}>
          <Text style={styles.buttonText}>Add Place</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const Error = (props) => {
  return (
    <Text style={styles.error}>{props.message}</Text>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#fed',
    flex: 1
  },
  text: {
    color: '#333333',
    marginBottom: 5
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5
  },
  error: {
    color: '#c66',
    marginBottom: 10
  },
  button: {
    backgroundColor: '#ff7f50',
    padding: 12,
    borderRadius: 6
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
