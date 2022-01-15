import placeModel from '../models/placeModel';
const initialState = {
  places: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET-PLACES':
      return {
        places: action.payload.places,
      };
    case 'ADD-PLACE':
      const newPlace = new placeModel(
        action.payload.id,
        action.payload.title,
        action.payload.imageUri,
        action.payload.address,
        action.payload.notes,
      );
      return {
        places: state.places.concat(newPlace),
      };
    case 'UPDATE-PLACE':
      const placeId = action.payload.id;
      const newUpdatePlacesArr = state.places.map(place => {
        if (placeId === place.id) {
          return {
            id: place.id,
            title: action.payload.title,
            imageUri: action.payload.imageUri,
            address: action.payload.address,
            notes: action.payload.notes,
          };
        }
        return place;
      });
      return {places: newUpdatePlacesArr};
    case 'DELETE-PLACE':
      const id = action.payload.id;
      const newPlacesArr = state.places.filter(place => place.id !== id);
      return {
        places: newPlacesArr,
      };
    default:
      return state;
  }
};

export default reducer;
