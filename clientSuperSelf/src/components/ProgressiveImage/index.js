import React, { Component } from "react";
import { View, StyleSheet, Animated } from "react-native";

export class ProgressiveImage extends Component {
  defaultImgAnimated = new Animated.Value(0);
  imgAnimated = new Animated.Value(0);

  handleDefaultImgLoad = () => {
    Animated.timing(this.defaultImgAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  handleImgLoad = () => {
    Animated.timing(this.imgAnimated, {
      toValue: 10,
      useNativeDriver: true,
    }).start();
  };
  render() {
    const { defaultImgSrc, source, style, ...props } = this.props;
    return (
      <View style={styles.container}>
        <Animated.Image
          {...props}
          source={defaultImgSrc}
          style={[style, { opacity: this.defaultImgAnimated }]}
          onLoad={this.handleDefaultImgLoad}
          //   blurRadius={5}
        />
        <Animated.Image
          {...props}
          source={source}
          style={[style, { opacity: this.imgAnimated }, styles.imgOverlay]}
          onLoad={this.handleImgLoad}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.primaryLight,
  },
  imgOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default ProgressiveImage;
