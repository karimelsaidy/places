import React from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../assests/colors';

const placeDetailScreen = props => {
  const place = props.navigation.getParam('item');
  console.log(place);

  return (
    <KeyboardAwareScrollView>
      <View style={{flex: 1}}>
        <View style={styles.imgCon}>
          <Image
            style={styles.img}
            resizeMode="cover"
            source={{uri: place.imageUri}}
          />
        </View>
        <View>
          <Text style={styles.title}>{place.title}</Text>
          <View style={styles.divider} />
          <Text style={styles.address}>{place.address}</Text>
          <View style={styles.divider} />
          <Text style={styles.notes}>{place.notes}</Text>
        </View>
        <View style={styles.btnCon}>
          <Button
            style={styles.btn}
            title="Edit Place"
            onPress={() => {
              props.navigation.navigate('addPlaceScreen', {place});
            }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
placeDetailScreen.navigationOptions = navData => {
  const place = navData.navigation.getParam('item');
  return {
    title: place.title,
  };
};
const styles = StyleSheet.create({
  imgCon: {
    width: '90%',
    height: 200,
    overflow: 'hidden',
    marginHorizontal: '5%',
    marginVertical: 10,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  divider: {
    width: '96%',
    height: 3,
    backgroundColor: colors.fifth,
    marginVertical: 6,
    marginHorizontal: '2%',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'NotoSerif-BoldItalic',
  },
  address: {
    fontFamily: 'NotoSerif-Regular',
    marginHorizontal: 10,
  },
  notes: {
    fontFamily: 'NotoSerif-Regular',
    marginHorizontal: 10,
  },
  btnCon: {
    margin: 15,
  },
});
export default placeDetailScreen;
