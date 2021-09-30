import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import Colors from "../constants/Colors";

import * as Location from "expo-location";

const verifyPermissions = () => {
  return Location.requestForegroundPermissionsAsync().then((res) => {
    if (res.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "App needs location permission to work properly!",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  });
};

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    console.log(e);
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
        accuracy: Location.Accuracy.High,
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      console.log(location);
    } catch (e) {
      Alert.alert(
        "Could not fetch the location!",
        "Please try again later or pick a location on the map",
        [{ text: "Okay" }]
      );
      console.log(e);
    }
    setIsFetching(false);
  };

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location has been chosen yet.</Text>
        )}
      </View>
      <Button
        title="Get User Location"
        color={Colors.primary}
        onPress={getLocationHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
    alignItems: "center",
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LocationPicker;
