import React, { useReducer, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as notesActions from '../store/notes-actions';
import { Button, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';

const CHANGE_TITLE = 'CHANGE_TITLE';
const CHANGE_CONTENT = 'CHANGE_CONTENT';
const TOUCH_TITLE = 'TOUCH_TITLE';
const TOUCH_CONTENT = 'TOUCH_CONTENT';

const formReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_TITLE:
      return {
        ...state,
        title: {
          text: action.text,
          validity: action.text.length > 0,
        },
      };
    case CHANGE_CONTENT:
      return {
        ...state,
        content: {
          text: action.text,
          validity: action.text.length > 0,
        },
      };
    case TOUCH_TITLE:
      return {
        ...state,
        isTitleTouched: true,
      };
    case TOUCH_CONTENT:
      return {
        ...state,
        isContentTouched: true,
      };
    default:
      return state;
  }
};

const initialState = {
  title: {
    text: '',
    validity: false,
  },
  content: {
    text: '',
    validity: false,
  },
  isTitleTouched: false,
  isContentTouched: false,
};

const CreateNoteScreen = (props) => {
  const [state, dispatchFormAction] = useReducer(formReducer, initialState);

  const dispatch = useDispatch();

  const changeTitleHandler = (text) => {
    dispatchFormAction({ type: CHANGE_TITLE, text });
  };
  const changeContentHandler = (text) => {
    dispatchFormAction({ type: CHANGE_CONTENT, text });
  };
  const onTitleBlurHandler = () => {
    dispatchFormAction({ type: TOUCH_TITLE });
  };
  const onContentBlurHandler = () => {
    dispatchFormAction({ type: TOUCH_CONTENT });
  };
  const submitHandler = () => {
    if (state.title.validity && state.content.validity) {
      dispatch(
        notesActions.createNote({
          title: state.title.text,
          content: state.content.text,
        })
      );
      props.navigation.goBack();
    }
  };

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.screen}>
      <Text style={styles.inputLabel}>Title:</Text>
      <TextInput
        style={
          state.isTitleTouched && !state.title.validity
            ? { ...styles.textInput, ...styles.errorInput }
            : styles.textInput
        }
        value={state.title.text}
        onChangeText={changeTitleHandler}
        ref={titleRef}
        onBlur={onTitleBlurHandler}
        onSubmitEditing={() => {
          contentRef.current.focus();
        }}
      />
      <Text style={styles.inputLabel}>Text:</Text>
      <TextInput
        style={
          state.isContentTouched && !state.content.validity
            ? { ...styles.textInput, ...styles.textBox, ...styles.errorInput }
            : { ...styles.textInput, ...styles.textBox }
        }
        multiline
        numberOfLines={4}
        value={state.content.text}
        onChangeText={changeContentHandler}
        ref={contentRef}
        onBlur={onContentBlurHandler}
      />
      <Button title="OK" color={Colors.secondary} onPress={submitHandler} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 15,
  },
  inputLabel: {
    color: 'black',
    fontSize: 20,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 20,
    padding: 5,
    marginVertical: 20,
    borderRadius: 5,
  },
  textBox: {
    textAlignVertical: 'top',
  },
  errorInput: {
    borderColor: Colors.error,
  },
});

export default CreateNoteScreen;
