import {
  SET_PLACES,
  REMOVE_PLACE,
  PLACE_ADDED,
  START_ADD_PLACE
} from './actionTypes';
import {
  uiStartLoading,
  uiStopLoading,
  authGetToken
} from './index';

export const startAddPlace = () => {
  return {
    type: START_ADD_PLACE
  }
}

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());

    dispatch(authGetToken())
      .catch(()=>{
        alert('No valid token found!');
      })
      .then((token)=>{
      authToken = token
      return fetch("https://us-central1-rn-places-app.cloudfunctions.net/storeImage", {
            method: "POST",
            body: JSON.stringify({
              image: image.base64
            }),
            headers: {
              Authorization: "Bearer " + authToken
            }
          })

      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong, please try again!");
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        // console.log(parsedRes)
        const placeData = {
          name: placeName,
          location: location,
          image: parsedRes.imageUrl,
          imagePath: parsedRes.imagePath
        };
  return fetch("https://rn-places-app.firebaseio.com/places.json?auth=" + authToken, {
    method: "POST",
    body: JSON.stringify(placeData)
  })
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes);
      dispatch(uiStopLoading());
      dispatch(placeAdded())
    })
    .catch(err => {
      console.log(err);
      alert("Something went wrong, please try again!");
      dispatch(uiStopLoading());
    })
  };
};


export const placeAdded = () => {
  return {
    type: PLACE_ADDED,

  }
}




export const getPlaces = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        // console.log('token', token)
        return fetch("https://rn-places-app.firebaseio.com/places.json?auth=" + token)
      })
      .catch(()=>{
        // alert("No valid token found!")
        // reject()
        console.log('no token found')
        // return
      })
      .then(res => res.json()
        // console.log('parsed responsed', res.json())
      )
      .then(parsedRes => {
          console.log('parsed response', parsedRes)
        const places = [];
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image
            },
            key: key
          });
        }
        dispatch(setPlaces(places));
      })
      .catch(err => {
        // alert(`Something went wrong GET PLACES, sorry :/`);
        console.log('error', err);
      })
  };
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  };
};

export const deletePlace = (key) => {
  return dispatch => {
    // dispatch an action to see if there is a token
    dispatch(authGetToken())
      // catch an error if there is no token
      .catch(() => {
        alert("No valid token found!")
      })
      // pass the token to remove if from the database
      .then(token => {
        // remove the token locally
        dispatch(removePlace(key));
          // remove the data from the database
          // append token in the request to check if token is valid
          return fetch("https://rn-places-app.firebaseio.com/places/" + key + ".json?auth=" + token, {
              method: "DELETE"
            })
      })
      // return the json result
      .then(res => res.json())
      // then log the 'done' if data was deleted
      .then(parsedRes => {
        console.log("Done!");
      })
      .catch(err => {
        alert("Something went wrong, sorry :/");
        console.log(err);
      })
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  };
};