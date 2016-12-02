/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import Dribbble from "./app/components/dribble/dribble.android";

export default class app extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Dribbble />
      </View>
    );
  }
}
AppRegistry.registerComponent('app', () => app);
