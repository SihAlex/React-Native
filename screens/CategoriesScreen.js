import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CategoriesScreens = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Categories</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoriesScreens;
