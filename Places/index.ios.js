import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TabBarIOS,
  StyleSheet
} from 'react-native';

class Places extends Component {

  constructor() {
    super();
    this.state = {
      selectedTab: 0
    };
  }

  handleTabPress(tab) {
    this.setState({ selectedTab: tab })
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          systemIcon="favorites"
          selected={this.state.selectedTab === 0}
          onPress={this.handleTabPress.bind(this, 0)}
        >
          <Text style={styles.text}>Favorite Places</Text>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Place"
          icon={require('./assets/pin.png')}
          selected={this.state.selectedTab === 1}
          onPress={this.handleTabPress.bind(this, 1)}
        >
          <Text style={styles.text}>Add Place</Text>
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
