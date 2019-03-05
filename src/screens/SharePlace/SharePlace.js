


import React, { Component } from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import {addPlace} from '../../store/actions/index'


import PlacesInput from '../../components/PlaceInput/PlaceInput'


class SharePlaceScreen extends Component {

  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName)
  }

  render() {
    return (
      <View>
        <PlacesInput 
          onPlaceAdded={this.placeAddedHandler}/>
      </View>      
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAddPlace: (placeName) => { dispatch(addPlace(placeName)) }
  }
}
export default connect(null, mapDispatchToProps)(SharePlaceScreen)