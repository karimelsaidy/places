import {insertPlace} from '../helpers/db';
import {getPlaces, deletePlace, updatePlaceDb} from '../helpers/db';

export const addPlace = (title, imageUri, address, notes) => {
  return async dispatch => {
    const result = await insertPlace(title, imageUri, address, notes);
    dispatch({
      type: 'ADD-PLACE',
      payload: {id: result.insertId, title, imageUri, address, notes},
    });
  };
};

export const setPlaces = () => {
  return async dispatch => {
    const result = await getPlaces();
    dispatch({type: 'SET-PLACES', payload: {places: result}});
  };
};

export const removePlace = id => {
  return async dispatch => {
    const result = await deletePlace(id);
    dispatch({type: 'DELETE-PLACE', payload: {id}});
  };
};
export const updatePlace = (id, title, imageUri, address, notes) => {
  return async dispatch => {
    await updatePlaceDb(id, title, imageUri, address, notes);
    dispatch({
      type: 'UPDATE-PLACE',
      payload: {id, title, imageUri, address, notes},
    });
  };
};
