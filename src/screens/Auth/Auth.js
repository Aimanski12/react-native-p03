import React, { Component } from 'react'
import {View, Text, Button, StyleSheet, TextInput, ImageBackground} from 'react-native'

import startMainTabs from '../MainTabs/startMainTab'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
// import HeadingText from '../../components/UI/DefaultInput/DefaultInput'
import MainText from "../../components/UI/MainText/MainText";
// import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground'
import backgroundImage from '../../assets/1.png'


class Auth extends Component {

  loginHandler = () => {  
    startMainTabs()
  }


  render() {
    return (
      <ImageBackground 
        source={backgroundImage}
        style={styles.backgroundImage}>
      <View style={styles.container}>

        <MainText>
          {/* <HeadingText>Please Login</HeadingText> */}
          <Text style={styles.textHeading}>Please Login</Text>
        </MainText>
        <View
          style={styles.btn}>
          {/* <ButtonWithBackground
            color="#29aaf4">Switch to login</ButtonWithBackground> */}
          <Button 
            title="Switch to Login"
            onPress={this.loginHandler}/>
        </View>
        <View style={styles.inputItems}>
          <DefaultInput
            placeholder='Your Email Address'
            style={styles.input} />
          <DefaultInput
            placeholder='Password'
            style={styles.input} />
          <DefaultInput
            placeholder='Confirm Password'
            style={styles.input} />
        </View>
        <View>
        {/* <ButtonWithBackground
          color="#29aaf4">Submit</ButtonWithBackground> */}
        <Button 
          title={'Submit'}
          onPress={this.loginHandler} />
        </View>
      </View>      
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    marginBottom: 5,
    backgroundColor: 'teal' 
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
  }
})


export default Auth