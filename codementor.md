## Introduction to React Native

[React Native](https://facebook.github.io/react-native/) is a framework for building mobile apps using React and JavaScript. It has support for building mobile apps for the iOS and Android platforms. The framework is open-sourced by Facebook on March, 2015. It is built on the premise:

> Learn once, Write anywhere: Build mobile apps with React.

React allows to build UI components. UI components are composed of layout, style and JavaScript. For web applications, layout is translated to HTML and style is translated to CSS.

React Native has a set of in-built React components. For example, there are components such as TabBar, Navigator, Switch, DatePicker and MapView. These components get translated to native iOS or Android components. The layout of the components is controlled by an implementation of [Flexbox (CSS)](https://facebook.github.io/react-native/docs/flexbox.html). Styles specified by props on the React Native component are translated to styles on the native UIKit component. In this way, React Native wraps the UIKit on iOS just as React wraps the DOM on web.

In this tutorial, we will build a sample app using React Native.

## Traffic Navigation App
Our sample app allows the user to view favourite places on a map in the neighbourhood. There are two tabs in the app: `Places tab` and `Add Place tab`. The `Places tab` shows the favourite places in a MapView component. (Show image)

The `Add Place` tab adds a place to the Map. (Show image).

On clicking on a place in the map, the user is taken to Google maps with driving directions.

We will build our sample app for the iOS platform.

## Create the initial project
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
cd AwesomeProject
react-native run-ios
```
The iOS simulator is started. Our project is built. A new terminal window opens up that listens on port 8081 and provides the script bundle. When an app is deployed to the AppStore, the script bundle is either embedded within the app or provided by a service such as AppHub. The built app is installed in the simulator and opened. The screenshot of the initial project is shown below.

![App screenshot - Initial app](https://cdn.filestackcontent.com/YKQgpR8iTXyzVmpWJndO "Initial app")
