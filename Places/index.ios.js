import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TabBarIOS,
  StyleSheet
} from 'react-native';
import PlaceMap from './place_map';
import AddPlace from './add_place';

class Places extends Component {

  constructor() {
    super();
    this.state = {
      selectedTab: 0,
      annotations: [
      {
        title: 'Bus stand',
        latitude: 12.97,
        longitude: 77.60,
      },
      {
        title: 'MG Road',
        latitude: 12.98,
        longitude: 77.59,
      },
      {
        title: 'Forum Mall',
        latitude: 12.93,
        longitude: 77.59,
      }
    ]};
    this.handleAddPlace = this.handleAddPlace.bind(this);
  }

  handleTabPress(tab) {
    this.setState({ selectedTab: tab })
  }

  handleAddPlace(annotation) {
    const annotations = this.state.annotations.slice();
    annotations.push(annotation);
    this.setState({ annotations });
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          systemIcon="favorites"
          selected={this.state.selectedTab === 0}
          onPress={this.handleTabPress.bind(this, 0)}
        >
          <PlaceMap annotations={this.state.annotations} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Place"
          icon={require('./assets/pin.png')}
          selected={this.state.selectedTab === 1}
          onPress={this.handleTabPress.bind(this, 1)}
        >
          <AddPlace onAddPlace={this.handleAddPlace} />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 50,
  },
});

AppRegistry.registerComponent('Places', () => Places);
