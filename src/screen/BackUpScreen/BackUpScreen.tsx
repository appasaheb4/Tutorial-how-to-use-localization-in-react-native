import React, { Component } from "react";
import { View, Image, StyleSheet, Text, AsyncStorage } from "react-native";

interface Props {
  onComplited: Function;
}

export default class BackUpScreen extends Component<Props, any> {
  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    let value = await AsyncStorage.getItem("FirstPageName");
    setTimeout(() => {
      if (value) {
        this.props.onComplited(false, "HomeNavigator");
      } else {
        this.props.onComplited(false, "OnBoardingNavigator");
      }
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.appLogo}
          resizeMode="contain"
          source={require("../../assets/icons/applogo.png")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center"
  },
  appLogo: {
    width: 250,
    height: 250
  }
});
