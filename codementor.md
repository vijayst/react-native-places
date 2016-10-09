## Introduction to React Native

[React Native](https://facebook.github.io/react-native/) is a framework for building mobile apps using React and JavaScript. It has support for building mobile apps for the iOS and Android platforms. The framework is open-sourced by Facebook on March, 2015. It is built on the premise:

> Learn once, Write anywhere: Build mobile apps with React.

React allows to build UI components. UI components are composed of layout, style and JavaScript. For web applications, layout is translated to HTML and style is translated to CSS.

React Native has a set of in-built React components. For example, there are components such as TabBar, Navigator, Switch, DatePicker and MapView. These components get translated to native iOS or Android components. The layout of the components is controlled by an implementation of [Flexbox (CSS)](https://facebook.github.io/react-native/docs/flexbox.html). Styles specified by props on the React Native component are translated to styles on the native UIKit component. In this way, React Native wraps the UIKit on iOS just as React wraps the DOM on web.

In this tutorial, we will build a sample app using React Native. The tutorial assumes that you have some knowledge of working with React and JavaScript.

## Traffic Navigation App
Our sample app allows the user to view favorite places on a map in the neighbourhood. There are two tabs in the app: `Places tab` and `Add Place tab`. The `Places tab` shows the favourite places in a MapView component. The `Add Place` tab adds a place to the Map. On clicking on one of the favorite places in the map, the user is taken to Maps with driving directions. We will build the sample app for the iOS platform.

## Create the app
The [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) page has detailed instructions on how to install React Native on your system. For a Mac, install node and watchman.

```
brew install node
brew install watchman
```
React Native is a node package that is installed via npm.

```
sudo npm install -g react-native-cli
```
To create our Places project, use the init command from react-native.

```
react-native init Places
```
To run the app in iOS simulator, use the run-ios command from react-native within the project folder.

```
cd Places
react-native run-ios
```
The iOS simulator is started. Our project is built. A new terminal window opens up that listens on port 8081 and provides the script bundle. When an app is deployed to the AppStore, the script bundle is either embedded within the app or provided by a service such as AppHub. The built app is installed in the simulator and opened. The screenshot of the initial project is shown below.

![App screenshot - Initial app](https://cdn.filestackcontent.com/YKQgpR8iTXyzVmpWJndO "Initial app")

## Tabbed navigation
The entry-point for the iOS app is `index.ios.js` file. Any modification to the file will reflect in the iOS simulator when the app is reloaded. To reload an app in the simulator, use Command R or the Shake Gesture from the simulator menu.

TabBarIOS is a React Native component. Using the component provides tabs at the bottom of the view. Along with the TabBarIOS, we will import the Text and Stylesheet component.

```
import {
  AppRegistry,
  Text,
  TabBarIOS,
  StyleSheet
} from 'react-native';
```
`TabBarIOS` component contains items of `TabBarIOS.Item`. Each item is a tab with a title and an icon.  The item also has a selected property. When the tab is selected, it is tinted. The icon can be a system icon. When a system icon is used, the title is provided by the system icon.  We will create tabbed navigation with two tabs as follows.

```
<TabBarIOS>
  <TabBarIOS.Item
    systemIcon="favorites"
    selected={true}
  >
    <View>
      <Text>Favorite Places</Text>
    </View>
  </TabBarIOS.Item>
  <TabBarIOS.Item
    systemIcon="more"
  >
    <View>
      <Text>Add Place</Text>
    </View>
  </TabBarIOS.Item>
</TabBarIOS>
```
Within our tabs, we place the child component. The text component is displayed in the view when a tab is selected. The Text component is displayed in the top left corner of the view. We will style the component using the StyleSheet component.
```
const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 50,
  },
  view: {
    backgroundColor: '#fed',
    flex: 1
  }
});
```
The text style defined above gives a text color, aligns the text to the center and moves the text 50 pixels from the top of the view. The view is styled with background color. The style of `flex: 1` makes a `Flexbox` which fills the entire screen. Styles are attached to the component just as for any other React component.
```
<View style={styles.view}>
  <Text style={styles.text}>Favorite Places</Text>
<View>
```

For the second tab, we will use a custom icon and a title. Image files are typically stored in an assets folder. The icon size is of 32 x 32. The image for pin.png is:
![icon](https://cdn.filestackcontent.com/qbBIfIaPRr6BOn5gk6TH "icon")

```
<TabBarIOS.Item
  title="Place"
  icon={require('./assets/pin.png')}
>
</TabBarIOS.Item>
```

When the user clicks on a tab, we want to highlight the tab. Highlighting the tab is done by changing the selected prop of the corresponding tab to true. To accomplish this, we define the selectedTab state. The selectedTab is initially set to zero which corresponds to the first tab.

```
constructor() {
  super();
  this.state = {
    selectedTab: 0
  };
}
```
To change the selectedTab, we handle the `onPress` event of the `TabBarIOS.Item`.

```
handleTabPress(tab) {
  this.setState({ selectedTab: tab })
}
```
Finally, we use the `selectedTab state` to update the `selected prop` of the Tab. The complete JSX is shown for clarity.

```
<TabBarIOS>
  <TabBarIOS.Item
    systemIcon="favorites"
    selected={this.state.selectedTab === 0}
    onPress={this.handleTabPress.bind(this, 0)}
  >
    <View style={styles.view}>
      <Text style={styles.text}>Favorite Places</Text>
    </View>
  </TabBarIOS.Item>
  <TabBarIOS.Item
    title="Place"
    icon={require('./assets/pin.png')}
    selected={this.state.selectedTab === 1}
    onPress={this.handleTabPress.bind(this, 1)}
  >
    <View style={styles.view}>
      <Text style={styles.text}>Add Place</Text>
    </View>
  </TabBarIOS.Item>
</TabBarIOS>

```
The screenshot of the iOS simulator after adding tabs is shown below.
![tabbed navigation](https://cdn.filestackcontent.com/npWi3tZhTsWupWDw2FJF "tabbed navigation")

## Map of favourite destinations
In this section, we will create a map and populate it with our favourite destinations. These destinations are the frequently visited places in the neighbourhood.

Create a new `PlaceMap` component in a file named `place_map.js`. The PlaceMap component will use the MapView component of React Native. The MapView component is designed only for iOS platform. The initial code for `PlaceMap` component is shown below.

```
import React, { Component } from 'react';
import {
  MapView,
  View,
  StyleSheet
} from 'react-native';

export default class PlaceMap extends Component {

  render() {
    return (
      <View style={styles.view}>
        <MapView
          style={styles.map}
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
  }
});
```
The MapView component is placed within a View component. The View component has styles set for background color and padding.

The MapView component should be provided with the initial region. The region is set by the `region prop`. The region has five properties: latitude, longitude, latitudeDelta (zoom), longitudeDelta and title.

```
<MapView
  style={styles.map}
  region={{
    latitude: 38.8977,
    longitude: -77.0365,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
    title: "White House"
  }}
/>
```

To view the map, the `PlaceMap` component should be placed within the first tab as follows.

```
<TabBarIOS.Item
  systemIcon="favorites"
  selected={this.state.selectedTab === 0}
  onPress={this.handleTabPress.bind(this, 0)}
>
  <PlaceMap />
</TabBarIOS.Item>
```
Our favorite destinations are stored as annotations on the map. Annotation has a title, latitude and longitude. We will define the annotations on the state of the main component `Places`.

```
constructor() {
  super();
  this.state = {
    selectedTab: 0,
    annotations: [
      {
        title: 'Smithsonian Museum',
        latitude: 38.8980,
        longitude: -77.0230
      },
      {
        title: 'UMCP',
        latitude: 38.9869,
        longitude: -76.9426
      },
      {
        title: 'Arlington',
        latitude: 38.8783,
        longitude: -77.0687
      }
    ]
  };
}
```
The annotations are supplied to the `PlaceMap` via props.

```
<PlaceMap annotations={this.state.annotations} />
```
The annotations are further passed on to the MapView component. The MapView component displays the annotations as markers on the map. Clicking on one of the markers will show the title.

```
<MapView
  style={styles.map}
  region={this.region}
  annotations={this.props.annotations}
/>
```
The screenshot of the simulator after adding the MapView component is shown below.
![enter image description here](https://cdn.filestackcontent.com/V5bei1VITefYmfqY1HXQ "enter image title here")


## Form for adding places
Users interact with an app using various input component. The TextInput component accepts text input. The TouchableHighlight component responds to user touches and works like a button. Other components for accepting user input are Picker, Slider and Switch component.

In this section, we will add a form with three TextInput components and a TouchableHighlight component. The TextInput components correspond to `Title`, `Latitude` and `Longitude` of a place. The initial code for the `AddPlace` component is shown below.

```
import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableHighlight,
  View,
  StyleSheet
} from 'react-native';

export default class AddPlace extends Component {


  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>Title</Text>
        <TextInput
          style={styles.textInput}
        ></TextInput>
        <Text style={styles.text}>Latitude</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.textInput}
        ></TextInput>
        <Text style={styles.text}>Longitude</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.textInput}
        ></TextInput>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText}>Add Place</Text>
        </TouchableHighlight>
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
```
The `AddPlace` component has the form and styles for each component in the form. The `AddPlace` component should be placed within the second tab of the `Places` component.

```
<TabBarIOS.Item
  title="Place"
  icon={require('./assets/pin.png')}
  selected={this.state.selectedTab === 1}
  onPress={this.handleTabPress.bind(this, 1)}
>
  <AddPlace />
</TabBarIOS.Item>
```
When the button in the `AddPlace` component is pressed, the place should be added to the map. We will go back to the `AddPlace` component to add that functionality. The three TextInput components are mandatory for the user to fill out. If there is no text, an error message should appear. The text value and error message should be stored in the state. Initialise the state in the constructor.

```
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
```
The TextInput component should be a controlled component. The value is derived from the state. The onChangeText event is handled to set the corresponding state.

```
<TextInput
  style={styles.textInput}
  value={this.state.title}
  onChangeText={(title) => this.setState({ title })}
>
</TextInput>
```
The onPress event of the TouchableHighlight component should be handled. The event handler checks if all the fields are filled out. It displays the error messages, if any. If there are no error messages, the location is added to the map.

```
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

```
The AlertIOS component is part of React Native. It is used to display a modal dialog after the action is completed. Handling the keyboard is a bit of a challenge. If you look closely, latitude and longitude have numeric input. The `keyboardType` of the component is set to `numeric` to enable numeric input. On button press, we dismiss the keyboard using the `dismissKeyboard` utility.

```
import dismissKeyboard from 'dismissKeyboard';
dismissKeyboard();
```
We have to add the location to the map. The annotations state of the `Places` component manages the favorite locations which are viewed in the map. The `onAddPlace` prop is used to pass the location to the parent component.

```
<AddPlace onAddPlace={this.handleAddPlace.bind(this)} />
```
The `handleAddPlace` method of the `Places` component adds the location to the `annotations state`. The state is immutable. The annotations array is copied over to a new array. The new array adds the location as another annotation. The state is updated with the new array.

```
handleAddPlace(annotation) {
  const annotations = this.state.annotations.slice();
  annotations.push(annotation);
  this.setState({ annotations });
}

```
The screenshot of the iOS simulator for adding a place is shown below.
![enter image description here](https://cdn.filestackcontent.com/Bfq8M96DRFGyqWs0qfkE "enter image title here")

## Integration with other apps
