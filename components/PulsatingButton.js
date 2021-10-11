import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  Animated,
} from 'react-native';
import { Colors } from '../constants/Colors';

import { HeartbeatAnimation } from '../animation/HeartbeatAnimation';

const PulsatingButton = ({ onPress, title }) => {
  useEffect(() => {
    HeartbeatAnimation(pulsatiionAnim, 0.2, 0.3);
  }, []);

  const pulsatiionAnim = useRef(new Animated.Value(0.25)).current;

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
        <Animated.View
          style={[
            {
              height: width * pulsatiionAnim,
              width: width * pulsatiionAnim,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: width,
            },
            isPressed ? styles.buttonPressed : styles.button,
          ]}
        >
          <Text style={styles.buttonText}>{title}</Text>
        </Animated.View>
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
    backgroundColor: Colors.primary,
  },
  buttonPressed: {
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.1,
  },
});

export default PulsatingButton;
