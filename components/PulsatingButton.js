import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import { Colors } from '../constants/Colors';

const PulsatingButton = ({ onPress, title }) => {
  const [isPressed, setIsPressed] = useState(false);

  const onPressHandler = () => {
    setIsPressed(true);
  };

  const onStopPressHandler = () => {
    setIsPressed(false);
  };

  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttonContainer}>
      <TouchableComponent
        onPress={onPress}
        onPressIn={onPressHandler}
        onPressOut={onStopPressHandler}
      >
        <View style={isPressed ? styles.buttonPressed : styles.button}>
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </TouchableComponent>
    </View>
  );
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: width,
    overflow: 'hidden',
  },
  button: {
    height: width * 0.25,
    width: width * 0.25,
    backgroundColor: Colors.primary,
    borderRadius: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    height: width * 0.25,
    width: width * 0.25,
    backgroundColor: Colors.secondary,
    borderRadius: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.1,
  },
});

export default PulsatingButton;
