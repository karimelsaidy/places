import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { useDispatch } from 'react-redux';
import colors from '../assests/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import { removePlace } from '../stateStore/actions';

const PlaceItem = props => {
   const dispatch = useDispatch();
const deletePlaceHandler =(id)=>{
dispatch(removePlace(id));
}
  return (
    <View style={styles.placeItem}>
      <TouchableOpacity onPress={props.onSelect} style={styles.imgCon}>
        <Image style={styles.image} source={{uri: props.image}} />
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.address}>{props.address}</Text>
      </View>
      <TouchableOpacity onPress={()=>deletePlaceHandler(props.id)}>
        <Icon name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgCon: {
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 25,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5,
    fontFamily:'NotoSerif-BoldItalic'
  },
  address: {
    color: '#666',
    fontSize: 16,
  },
});

export default PlaceItem;
