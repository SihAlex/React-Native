import React, { useState } from "react";
import { View, Button, Text, StyleSheet, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "../constants/Colors";
import * as Permissions from "expo-permissions";

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = () => {
    return Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    ).then((res) => {
      if (res.status !== "granted") {
        Alert.alert(
          "Insufficient permissions!",
          "App needs camera permission to work properly!",
          [{ text: "Okay" }]
        );
        return false;
      }
      return true;
    });
  };

  const takeImageHandler = () => {
    verifyPermissions()
      .then((permission) => {
        if (permission) {
          return ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
          });
        } else {
          return { uri: false };
        }
      })
      .then((image) => {
        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
      });
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image has been picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Image"
        style={styles.button}
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginVertical: 10,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImgPicker;
