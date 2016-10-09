import React, { Component } from 'react';
import {
  Text,
  MapView,
  View,
  StyleSheet
} from 'react-native';

export default class PlaceMap extends Component {
  constructor(props) {
    super(props);
    this.region = {
      latitude: 12.9716,
      longitude: 77.5946,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
      title: "Bangalore"
    }
  }
  render() {

    return (
      <View style={styles.view}>
        <MapView
          style={styles.map}
          region={this.region}
          annotations={this.props.annotations}
        />
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
  map: {
    height: 500
  }
});
