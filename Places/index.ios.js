import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TabBarIOS,
  StyleSheet
} from 'react-native';

class Places extends Component {
  render() {
    return (
    <TabBarIOS>
        <TabBarIOS.Item
          systemIcon="favorites"
          selected={true}
        >
          <Text style={styles.text}>Favorite Places</Text>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Place"
          icon={require('./assets/pin.png')}
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
