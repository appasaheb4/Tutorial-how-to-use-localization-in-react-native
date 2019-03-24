/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React, { Component } from "react";
import { AppRegistry, Linking } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { createAppContainer } from "react-navigation";
import { createRootNavigator } from "./src/app/router/router";
import BackUpScreen from "./src/screen/BackUpScreen/BackUpScreen";
import DeepLinking from "react-native-deep-linking";

class Tutorial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true,
      isStartPage: "OnBoardingNavigator"
    };
  }

  async componentDidMount() {
    try {
      //TODO: Deep Linking
      DeepLinking.addScheme("https://");
      Linking.addEventListener("url", this.handleUrl);
      DeepLinking.addRoute(
        "/prime-sign-230407.appspot.com/:pageName",
        response => {
          console.log({
            response
          });
        }
      );
      DeepLinking.addRoute(
        "/prime-sign-230407.appspot.com/:pageName/:script",
        response => {
          let res = response;
          console.log({
            res
          });
          Alert.alert(JSON.stringify(response));
        }
      );
      DeepLinking.addRoute(
        "/prime-sign-230407.appspot.com/:pageName/:pageName/:script",
        response => {
          console.log({
            response
          });
        }
      );

      Linking.getInitialURL()
        .then(url => {
          if (url) {
            let uri_dec = decodeURIComponent(url);
            Linking.openURL(url);
            DeepLinking.evaluateUrl(uri_dec);
          }
        })
        .catch(err => console.error("An error occurred", err));
    } catch (error) {
      console.log({
        error
      });
    }
  }

  handleUrl = ({ url }) => {
    try {
      //  let uri_dec = decodeURIComponent(url);
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          DeepLinking.evaluateUrl(url);
        }
      });
    } catch (e) {
      console.log({
        e
      });
    }
  };

  onComplited(status, pageName) {
    this.setState({
      status: status,
      isStartPage: pageName
    });
  }

  render() {
    const Layout = createRootNavigator(
      this.state.status,
      this.state.isStartPage
    );

    const AppContainer = createAppContainer(Layout);
    return this.state.status ? (
      <BackUpScreen
        onComplited={(status: boolean, pageName: string) =>
          this.onComplited(status, pageName)
        }
      />
    ) : (
      <AppContainer />
    );
  }
}
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => Tutorial);
