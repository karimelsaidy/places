import React, {useState, useCallback, useRef} from 'react';
import {View, Text, Button, Image, StyleSheet, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import Input from '../Components/Input';
import {addPlace, updatePlace} from '../stateStore/actions';
import BottomSheet from '../Components/BottomSheet';
import colors from '../assests/colors';
const addPlaceScreen = props => {
  // get place to edit from params if exists
  const place = props.navigation.getParam('place');
  // managing form state
  const [inputsState, setInputs] = useState({
    values: {
      title: place ? place.title : '',
      address: place ? place.address : '',
      notes: place ? place.notes : '',
      imageLoaded: place ? place.imageUri : null,
    },
    validity: {
      title: place ? true : false,
      address: place ? true : false,
      imageLoaded: place ? true : false,
    },
  });
  // make reference for bottom sheet
  const btmSheetRef = useRef();
  const dispatch = useDispatch();
  // handle input changes
  const inputChangeHandler = useCallback((value, isValid, id) => {
    setInputs(prevState => ({
      values: {
        ...prevState.values,
        [id]: value,
      },
      validity: {
        ...prevState.validity,
        [id]: isValid,
      },
    }));
  }, []);
  //handle adding image
  const addImage = imageUri => {
    inputChangeHandler(imageUri, true, 'imageLoaded');
  };
  // handle submit new place
  const handleAddPlace = () => {
    if (
      !inputsState.values.title ||
      !inputsState.values.imageLoaded ||
      !inputsState.values.address
    ) {
      Alert.alert('invalid inputs', 'please Enter valid inputs', [
        {text: 'ok'},
      ]);
      return;
    }
    if (place) {
      dispatch(
        updatePlace(
          place.id,
          inputsState.values.title,
          inputsState.values.imageLoaded,
          inputsState.values.address,
          inputsState.values.notes,
        ),
      );
    } else {
      dispatch(
        addPlace(
          inputsState.values.title,
          inputsState.values.imageLoaded,
          inputsState.values.address,
          inputsState.values.notes,
        ),
      );
    }

    props.navigation.goBack();
  };
  return (
    <KeyboardAwareScrollView>
      <Input
        id="title"
        label="Title"
        initialValue={inputsState.values.title}
        initalValid={inputsState.validity.title}
        required
        errorMessage="pleae enter a title"
        minLength="1"
        inputChangeHandler={inputChangeHandler}
      />
      <Input
        id="address"
        label="Address"
        initialValue={inputsState.values.address}
        initalValid={inputsState.validity.address}
        required
        minLength="4"
        errorMessage="pleae enter a valid address"
        inputChangeHandler={inputChangeHandler}
      />
      <Input
        id="notes"
        label="Notes"
        initialValue={inputsState.values.notes}
        initalValid={true}
        inputChangeHandler={inputChangeHandler}
      />

      <View style={styles.imgContainer}>
        {inputsState.validity.imageLoaded ? (
          <Image
            style={styles.img}
            source={{uri: inputsState.values.imageLoaded}}
          />
        ) : (
          <Text>images is not loaded</Text>
        )}
      </View>
      <BottomSheet
        ref={btmSheetRef}
        addImage={imageUri => addImage(imageUri)}
      />
      <View style={styles.btn}>
        <Button
          title={place ? 'Change photo' : 'add photo'}
          onPress={() => btmSheetRef.current.open()}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title={place ? 'Update place' : 'Add Place'}
          onPress={handleAddPlace}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
addPlaceScreen.navigationOptions = navData => {
  const place = navData.navigation.getParam('place');
  return {
    title: place ? 'Edit Place' : 'Add New Place',
  };
};
const styles = StyleSheet.create({
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 200,
    borderWidth: 3,
    borderColor: colors.fifth,
    marginHorizontal: '5%',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  btn: {
    marginHorizontal: 5,
    marginVertical: 10,
  },
});
export default addPlaceScreen;
