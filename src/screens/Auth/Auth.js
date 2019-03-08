import React, { Component } from 'react'
import {View, Text, Button, StyleSheet, TextInput, ImageBackground, Dimensions} from 'react-native'

import startMainTabs from '../MainTabs/startMainTab'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import HeadingText from '../../components/UI/DefaultInput/DefaultInput'
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground'
import backgroundImage from '../../assets/1.png'
import validate from "../../utility/validation";

class Auth extends Component {

  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
    authMode: "login",
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        },
        touched: false
      }
    }
    // respStyles: {
    //   pwContainerDirection: "column",
    //   pwContainerJustifyContent: "flex-start",
    //   pwWrapperWidth: "100%"

    // }
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  // Dimensions.addEventListener("change", dims => {
  //   this.setState({
  //     viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
      // pwContainerDirection: Dimensions.get("window").height > 500 ? "column": "row",
      // pwContainerJustifyContent: Dimensions.get("window").height > 500 ? "flex-start" : "space-between",
      // pwWrapperWidth: Dimensions.get("window").height > 500 ? "100%" : "45%" 
      // })
    // })
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


  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            value: value
          },
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password"
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

  

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
      style={styles.input} 
      value={this.state.controls.email.value}
      onChangeText={val => this.updateInputState("email", val)} />



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
        style={styles.input} 
        value={this.state.controls.password.value}
        onChangeText={val => this.updateInputState("password", val)}
        />
    </View>
    <View
        style={
          this.state.viewMode === "portrait"
            ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper }>
      <DefaultInput
        placeholder='Confirm Password'
        style={styles.input} 
        value={this.state.controls.confirmPassword.value}
        onChangeText={val => this.updateInputState("confirmPassword", val)}/>
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