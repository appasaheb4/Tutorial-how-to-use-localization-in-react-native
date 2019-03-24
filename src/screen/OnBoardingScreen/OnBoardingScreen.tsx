import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  AsyncStorage
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import Onboarding from "react-native-onboarding-swiper";

import { images } from "../../app/constans/Constans";

export default class OnBoardingScreen extends Component<any, any> {
  //TODO:
  async click_Done() {
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      key: null,
      actions: [NavigationActions.navigate({ routeName: "HomeNavigator" })]
    });
    try {
      AsyncStorage.setItem("FirstPageName", JSON.stringify(true));
    } catch (error) {
      // Error saving data
    }
    this.props.navigation.dispatch(resetAction);
  }

  //TODO: renderItem
  renderItem(item: any) {
    let i: number;
    let swipItem: any[] = [];
    for (i = 0; i < item.length; i++) {
      swipItem.push({
        backgroundColor: item[i].backgroundColor,
        image: (
          <Image
            style={{ width: 300, height: 150 }}
            resizeMode="contain"
            source={item[i].image}
          />
        ),
        title: item[i].title,
        subtitle: item[i].subtitle
      });
    }
    return swipItem;
  }

  render() {
    const data = [
      {
        backgroundColor: "#fff",
        image: images.img1,
        title: "Title 1",
        subtitle:
          "Product pictures and display contents on the foregoing pages are provided for reference only. Actual product features and specifications (including but not limited to appearance, colour, and size), as well as actual display contents (including but not limited to backgrounds, UI, and icons) may vary. "
      },
      {
        backgroundColor: "#fff",
        image: images.img2,
        title: "Title 2",
        subtitle:
          "All data in the foregoing pages are theoretical values obtained by HUAWEI internal laboratories through tests carried out under particular conditions. For more information, refer to the aforementioned product details. Actual data may vary owing to differences in individual products, software versions, application conditions, and environmental factors. All data is subject to actual usage."
      },
      {
        backgroundColor: "#fff",
        image: images.img3,
        title: "Title 3",
        subtitle:
          "Product size, product weight, and related specifications are theoretical values only. Actual measurements between individual products may vary. All specifications are subject to the actual product."
      }
    ];

    return (
      <View style={styles.container}>
        <Onboarding
          onDone={() => this.click_Done()}
          onSkip={() => this.click_Done()}
          pages={this.renderItem(data)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
