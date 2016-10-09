import React, { Component } from 'react';
import {
  AlertIOS,
  Text,
  MapView,
  View,
  TouchableHighlight,
  StyleSheet,
  Linking
} from 'react-native';

export default class PlaceMap extends Component {
  constructor(props) {
    super(props);
    this.region = {
      latitude: 38.8977,
      longitude: -77.0365,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
      title: "White House"
    }
  }

  handleNavigation(la, lo) {
    const rla = this.region.latitude;
    const rlo = this.region.longitude;
    const url = `http://maps.apple.com/?saddr=${rla},${rlo}&daddr=${la},${lo}&dirflg=d`;
    return Linking.openURL(url);
  }

  render() {
    const { annotations } = this.props;
    annotations.forEach(annotation => {
      annotation.rightCalloutView = (
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleNavigation.bind(this, annotation.latitude, annotation.longitude)}
        >
          <Text style={styles.buttonText}>Navigation</Text>
        </TouchableHighlight>
      );
    })
    return (
      <View style={styles.view}>
        <MapView
          style={styles.map}
          region={this.region}
          annotations={annotations}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#fed',
    flex: 1,
  },
  map: {
    height: 500
  },
  button: {
    backgroundColor: 'red',
    padding: 5,
    margin: 5
  },
  buttonText: {
    fontSize: 12,
    color: 'white'
  }
});
