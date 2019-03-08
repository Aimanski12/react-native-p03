

import React from 'react'

import {TextInput, StyleSheet} from 'react-native'


const defaultInput = (props) => (

  <TextInput 
    {...props}
    style={[styles.input, props.style]} 
    underlineColorAndroid="transparent"
    />
    
)

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'orange',
    padding: 5,
    paddingLeft: 15,
    margin: 8,
    marginBottom: 8
  }
  
})


export default defaultInput