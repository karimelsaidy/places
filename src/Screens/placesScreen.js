import React, {useEffect} from 'react';
import {View, Platform, FlatList, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../Components/CustomHeaderButton';
import PlaceItem from '../Components/PlaceItem';
import {setPlaces} from '../stateStore/actions';

const placesScreen = props => {
  const dispatch = useDispatch();

  const places = useSelector(state => state.places.places);
  useEffect(() => {
    // get places from data base
    dispatch(setPlaces());
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <PlaceItem
            image={item.imageUri}
            title={item.title}
            address={item.address}
            id={item.id}
            onSelect={() =>
              props.navigation.navigate('placesDetailScreen', {
                item,
              })
            }
          />
        )}
      />
    </View>
  );
};
placesScreen.navigationOptions = navData => {
  return {
    title: 'places',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="add"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => navData.navigation.navigate('addPlaceScreen')}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default placesScreen;
