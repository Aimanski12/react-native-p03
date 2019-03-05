


import React, { Component } from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import {addPlace} from '../../store/actions/index'


import PlacesInput from '../../components/PlaceInput/PlaceInput'


class SharePlaceScreen extends Component {

  constructor(props){
    super();
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  onNavigatorEvent = (event) => {
    if(event.type === 'NavBarButtonPress'){
      if(event.id === 'sideDrawerToggle'){
        this.props.navigator.toggleDrawer({
          side: 'left'
        })
      }
    }
  }
  
  
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