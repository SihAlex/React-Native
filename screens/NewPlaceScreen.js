import React, { useState } from "react";
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as placesActions from "../store/places-actions";
import ImgPicker from "../components/ImgPicker";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = (props) => {
  const dispatch = useDispatch();

  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();

  const titleChangeHandler = (text) => {
    // you could add validation
    setTitleValue(text);
  };

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue, selectedImage));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImgPicker onImageTaken={imageTakenHandler} />
        <LocationPicker />
        <Button
          title="Save Place"
          style={styles.button}
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place",
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  button: {
    marginVertical: 10,
  },
});

export default NewPlaceScreen;