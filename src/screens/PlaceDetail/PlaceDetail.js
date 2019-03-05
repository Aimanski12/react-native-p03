import React, {Component} from "react";
import { View, Image, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import {deletePlace} from '../../store/actions/index'

class PlaceDetail extends Component {

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop({
      // animated: true,
      // animationType: 'slide-horizontal'
    })
  }


  render(){

    // let modalContent = null;
    // if (props.selectedPlace) {
      //   modalContent = (
        //     <View>
        //       <Image source={props.selectedPlace.image} style={styles.placeImage} />
        //       <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
        //     </View>
        //   );
        // }
        
    return (
          // <Modal
          //   onRequestClose={props.onModalClosed}
          //   visible={props.selectedPlace !== null}
          //   animationType="slide"
          // >
      <View style={styles.container}>
        <View>
          <Image source={this.props.selectedPlace.image} style={styles.placeImage} />
          <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
        </View>
        {/* {modalContent} */}
      <View>
        <TouchableOpacity onPress={this.placeDeletedHandler}>
          <View style={styles.deleteButton}>
            <Icon 
              size={30}
              name={'ios-trash'}
              color={'red'} />
          </View>
          </TouchableOpacity>
        {/* <Button title="Close" onPress={props.onModalClosed} /> */}
        </View>
      </View>
        // </Modal>
    )}
  }

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  deleteButton: {
    alignItems: 'center'
  }
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDeletePlace: (key) => { dispatch(deletePlace(key)) }
  }
}

export default connect(null, mapDispatchToProps)(PlaceDetail);
