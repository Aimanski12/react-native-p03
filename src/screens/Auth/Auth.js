import React, { Component } from 'react'
import {View, Text, Button, StyleSheet, TextInput, ImageBackground, Dimensions} from 'react-native'

import startMainTabs from '../MainTabs/startMainTab'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import HeadingText from '../../components/UI/DefaultInput/DefaultInput'
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground'
import backgroundImage from '../../assets/1.png'


class Auth extends Component {

  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
    // respStyles: {
    //   pwContainerDirection: "column",
    //   pwContainerJustifyContent: "flex-start",
    //   pwWrapperWidth: "100%"

    // }
  };

  constructor(props) {
    super(props);
    // Dimensions.addEventListener("change", this.updateStyles);
  Dimensions.addEventListener("change", dims => {
    this.setState({
      viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
      // pwContainerDirection: Dimensions.get("window").height > 500 ? "column": "row",
      // pwContainerJustifyContent: Dimensions.get("window").height > 500 ? "flex-start" : "space-between",
      // pwWrapperWidth: Dimensions.get("window").height > 500 ? "100%" : "45%" 
      })
    })
  }


  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = (dims) => {
    this.setState({
      viewMode:
        dims.window.height > 500 ? "portrait" : "landscape"
    });
  }


  loginHandler = () => {  
    startMainTabs()
  }


  render() {

  let headingText = null;

    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    }


    return (
      <ImageBackground 
        source={backgroundImage}
        style={styles.backgroundImage}>
      <View style={styles.container}>

          {headingText}
        {/* <MainText>
          <HeadingText>Please Login</HeadingText>
          <Text style={styles.textHeading}>Please Login</Text>
        </MainText> */}

        
        <ButtonWithBackground
          color="#29aaf4"
          onPress={()=>{alert('Hello')}}>Switch to login</ButtonWithBackground>
        <View
          style={styles.btn}>
          {/* <Button 
            title="Switch to Login"
            onPress={this.loginHandler}/> */}
        </View>
        <View style={styles.inputItems}>
          <DefaultInput
            placeholder='Your Email Address'
            style={styles.input} />



          {/* <View style={styles.passwordContainer}> */}
    <View
      style={
        this.state.viewMode === "portrait"
          ? styles.portraitPasswordContainer : styles.landscapePasswordContainer }> 
    <View
        style={
          this.state.viewMode === "portrait"
            ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper }>
      <DefaultInput
        placeholder='Password'
        style={styles.input} />
    </View>
    <View
        style={
          this.state.viewMode === "portrait"
            ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper }>
      <DefaultInput
        placeholder='Confirm Password'
        style={styles.input} />
            </View>
          </View>

        </View>
        <View>
        <ButtonWithBackground
          color="#29aaf4"
          onPress={this.loginHandler}>Submit</ButtonWithBackground>
        {/* <Button 
          title={'Submit'}
          onPress={this.loginHandler} /> */}
        </View>
      </View>      
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    marginBottom: 5,
    // backgroundColor: 'teal' 
  },
  backgroundImage: {
    width: '100%',
    flex: 1
  },
  container:{
    // borderColor: 'red',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  textHeading: {
    fontSize: 28,
    fontWeight: "bold"
  },
  inputItems: {
    width: '75%'
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "gray"
  },
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  landscapePasswordWrapper: {
    width: "45%"
  },
  portraitPasswordWrapper: {
    width: "100%"
  }
})


export default Auth