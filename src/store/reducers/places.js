import {
  ADD_PLACE,
  DELETE_PLACE,
  TRY_AUTH,
  // DESELECT_PLACE
} from "../actions/actionTypes";

import imageSample from '../../assets/brazil.jpg'

const initialState = {
  places: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random(),
          name: action.placeName,
          image: imageSample
              // "../../assets/0048.jpg"
        })
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.placeKey;
        }),
      };
    case TRY_AUTH:
      return {
        ...state,
        // places: state.places.filter(place => {
        //   return place.key !== action.placeKey;
        // }),
      };
    // case SELECT_PLACE:
    //   return {
    //     ...state,
    //     selectedPlace: state.places.find(place => {
    //       return place.key === action.placeKey;
    //     })
    //   };
    // case DESELECT_PLACE:
    //   return {
    //     ...state,
    //     selectedPlace: null
    //   };
    default:
      return state;
  }
};

export default reducer;
