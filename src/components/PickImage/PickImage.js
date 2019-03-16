import React, { Component } from "react";
import { View, Image, Button, StyleSheet } from "react-native";
import ImagePicker from "react-native-image-picker";

import sampleImg from '../../assets/brazil.jpg'


class PickImage extends Component {
  state = {
    pickedImaged: null
  }

  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: "Pick an Image", maxHeight: 800, maxWidth: 800}, res => {
      console.log('data recieved', res)
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImaged: { uri: res.uri }
        });
        this.props.onImagePicked({uri: res.uri, base64: res.data});
      }
    });
  }

  reset = () => {
    this.setState({
      pickedImaged: null
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
        {/* <Image source={sampleImg} style={styles.previewImage} /> */}
          <Image source={this.state.pickedImaged} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={this.pickImageHandler} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    placeholder: {
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: "#eee",
      width: "80%",
      height: 150
    },
    button: {
      margin: 8
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
  });

export default PickImage;
