import React, { Component } from 'react'
import {View, 
        Text, 
        Button, 
        StyleSheet, 
        TextInput, 
        ImageBackground, 
        Dimensions,
        KeyboardAvoidingView,
        Keyboard,
        TouchableWithoutFeedback
      }
      from 'react-native'

import startMainTabs from '../MainTabs/startMainTab'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import HeadingText from '../../components/UI/DefaultInput/DefaultInput'
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground'
import backgroundImage from '../../assets/1.png'
import validate from "../../utility/validation";
import { tryAuth } from "../../store/actions/index";
import { connect } from "react-redux";

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

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "login" ? "signup" : "login"
      };
    });
  };


  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = (dims) => {
    // console.log('dims', dims)
    this.setState({
      viewMode:
        dims.window.height > 500 ? "portrait" : "landscape"
    });
  }


  loginHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.onLogin(authData);
    startMainTabs();
  };


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
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid: key === "password" ?
              validate(
                prevState.controls.confirmPassword.value,
                prevState.controls.confirmPassword.validationRules,
                connectedValue
              ) :
              prevState.controls.confirmPassword.valid
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
  let confirmPasswordControl = null;

    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    }


    if (this.state.authMode === "signup") {
      confirmPasswordControl = (
        <View
          style={
            this.state.viewMode === "portrait"
              ? styles.portraitPasswordWrapper
              : styles.landscapePasswordWrapper
          }
        >
          <DefaultInput
            placeholder="Confirm Password"
            style={styles.input}
            value={this.state.controls.confirmPassword.value}
            onChangeText={val => this.updateInputState("confirmPassword", val)}
            valid={this.state.controls.confirmPassword.valid}
            touched={this.state.controls.confirmPassword.touched}
            secureTextEntry
          />
        </View>
      );
    }

    return (
      <ImageBackground 
        source={backgroundImage}
        style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {/* <View style={styles.container}> */}

          {headingText}
        {/* <MainText>
          <HeadingText>Please Login</HeadingText>
          <Text style={styles.textHeading}>Please Login</Text>
        </MainText> */}

        
        <ButtonWithBackground
            color="#29aaf4"
            onPress={this.switchAuthModeHandler}
          >
            Switch to {this.state.authMode === "login" ? "Sign Up" : "Login"}
          </ButtonWithBackground>

        <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>

        

  <View style={styles.inputItems}>
    <DefaultInput
      placeholder='Your Email Address'
      style={styles.input} 
      value={this.state.controls.email.value}
      onChangeText={val => this.updateInputState("email", val)} 
      valid={this.state.controls.email.valid}
      touched={this.state.controls.email.touched}
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType="email-address"
      />



          {/* <View style={styles.passwordContainer}> */}
    <View
      style={
        this.state.viewMode === "portrait" ||
          this.state.authMode === "login"
          ? styles.portraitPasswordContainer : styles.landscapePasswordContainer }> 
    <View
        style={
          this.state.viewMode === "portrait" ||
          this.state.authMode === "login"
            ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper }>
      <DefaultInput
        placeholder='Password'
        style={styles.input} 
        value={this.state.controls.password.value}
        onChangeText={val => this.updateInputState("password", val)}
        valid={this.state.controls.password.valid}
        touched={this.state.controls.password.touched}
        secureTextEntry
        />
    </View>
    {confirmPasswordControl}
    {/* <View
        style={
          this.state.viewMode === "portrait"
            ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper }>
      <DefaultInput
        placeholder='Confirm Password'
        style={styles.input} 
        value={this.state.controls.confirmPassword.value}
        onChangeText={val => this.updateInputState("confirmPassword", val)}
        valid={this.state.controls.confirmPassword.valid}
        touched={this.state.controls.confirmPassword.touched}
        // secureTextEntry
        /> 
        </View> */}
  </View>

        </View>
        </TouchableWithoutFeedback>
        <ButtonWithBackground
          color="#29aaf4"
          onPress={this.loginHandler}
          disabled={
            !this.state.controls.confirmPassword.valid && this.state.authMode === "signup" ||
            !this.state.controls.email.valid ||
            !this.state.controls.password.valid
          }
          >Submit</ButtonWithBackground>
        {/* <Button 
          title={'Submit'}
          onPress={this.loginHandler} /> */}
      {/* </View>       */}

      </KeyboardAvoidingView>
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

const mapDispatchToProps = dispatch => {
  return {
    onLogin: authData => dispatch(tryAuth(authData))
  };
};

export default connect(null, mapDispatchToProps)(Auth);