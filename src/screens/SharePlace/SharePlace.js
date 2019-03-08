


import React, { Component } from 'react'
import {View, Text, TextInput, Button, StyleSheet, ScrollView, Image} from 'react-native'
import {connect} from 'react-redux'
import {addPlace} from '../../store/actions/index'
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";


// import PlacesInput from '../../components/PlaceInput/PlaceInput'
import PlaceInput from '../../components/PlaceInput/PlaceInput'
// import imageHolder from '../../assets/0048.jpg'

import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";


class SharePlaceScreen extends Component {

  static navigatorStyle = {
    navBarButtonColor: "orange"
  }

  state = {
    placeName: ""
  };

  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  onNavigatorEvent = (event) => {
    console.log(event)
    if(event.type === 'NavBarButtonPress'){
      if(event.id === 'sideDrawerToggle'){
        this.props.navigator.toggleDrawer({
          side: 'left'
        })
      }
    }
  }
  
  
  placeAddedHandler = () => {
    this.setState({placeName: ""});
    if (this.state.placeName.trim() !== "") {
      this.props.onAddPlace(this.state.placeName);
    }
  };

  placeNameChangedHandler = val => {
    this.setState({placeName: val});
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
          </MainText>


          <PickImage />
          {/* <View style={styles.placeholder}> 
            <Image source={imageHolder} style={styles.previewImage}/>
            <Text>Image Preview!</Text>
          </View>
          <View style={styles.button}>
            <Button title="Pick Image" />
          </View> */}


          <PickLocation />
          {/* <View style={styles.placeholder}>
            <Text>Map</Text>
          </View>
          <View style={styles.button}>
            <Button title="Locate Me" />
          </View> */}




          {/* <DefaultInput placeholder="Place Name" /> */}
          <PlaceInput 
            placeName={this.state.placeName}
            onChangeText={this.placeNameChangedHandler}/>




          <View style={styles.button}>
            <Button 
              title="Share the Place!" 
              onPress={this.placeAddedHandler} />
          </View>
        {/* <PlacesInput 
          onPlaceAdded={this.placeAddedHandler}/> */}
          </View>
      </ScrollView>      
    )
  }
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       alignItems: "center"
     },
     placeholder: {
       borderWidth: 1,
       borderColor: "black",
       backgroundColor: "#eee",
       width: "80%",
       height: 150
     },
     button: {
       margin: 8
     },
     previewImage: {
       width: "100%",
       height: "100%"
     }
})


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAddPlace: (placeName) => { dispatch(addPlace(placeName)) }
  }
}
export default connect(null, mapDispatchToProps)(SharePlaceScreen)