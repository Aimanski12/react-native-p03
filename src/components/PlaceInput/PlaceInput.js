import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import DefaultInput from '../UI/DefaultInput/DefaultInput'


const placeInput =(props) => {
  // state = {
  //   placeName: ""
  // };

  // componentDidMount() {
    
  // }

  // placeNameChangedHandler = val => {
  //   console.log('asdfasdf')
  //   this.setState({
  //     placeName: val,
      
  //   });
    
  // };
  
  // placeSubmitHandler = () => {
  //   this.setState({placeName: ''})
  //   if (this.state.placeName.trim() === "") {
  //     return;
  //   }
    
  //   this.props.onPlaceAdded(this.state.placeName);
  // };

    return (
      <DefaultInput 
        placeholder="Place Name" 
        value={props.placeName}
        onChangeText={props.onChangeText}/>
      // <View style={styles.inputContainer}>
      //   <TextInput
      //     placeholder="An awesome place"
      //     value={this.state.placeName}
      //     onChangeText={this.placeNameChangedHandler}
      //     style={styles.placeInput}
      //   />
      //   <Button
      //     title="Add"
      //     style={styles.placeButton}
      //     onPress={this.placeSubmitHandler}
      //   />
      // </View>
    );
}

const styles = StyleSheet.create({
  // inputContainer: {
  //   // flex: 1,
  //   width: "100%",
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center"
  // },
  // placeInput: {
  //   width: "70%"
  // },
  // placeButton: {
  //   width: "30%"
  // }
});

export default placeInput;
