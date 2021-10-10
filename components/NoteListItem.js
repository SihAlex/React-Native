import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import { Colors } from '../constants/Colors';

const NoteListItem = ({ id, title, date, onPress }) => {
  const dispatch = useDispatch();

  const longPressHandler = () => {};

  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <TouchableComponent onPress={onPress} onLongPress={longPressHandler}>
      <View style={styles.note}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{date}</Text>
        <Menu onSelect={(value) => alert(`Selected number: ${value}`)}>
          <MenuTrigger>
            <Text style={{ color: Colors.primary }}>More</Text>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption value={1}>
              <Text style={{ color: Colors.secondary }}>Edit</Text>
            </MenuOption>
            <MenuOption value={2}>
              <Text style={{ color: Colors.error }}>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  note: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    color: 'black',
  },
});

export default NoteListItem;
