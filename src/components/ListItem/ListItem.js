import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const listItem = props => {
  return (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      <Image resizeMode="cover" source={props.placeImage} style={styles.placeImage} />
      <Text>{props.placeName}</Text>
    </View>
  </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    padding: 10,
    backgroundColor: "teal",
    flexDirection: "row",
    alignItems: "center"
  },
  placeImage: {
      marginRight: 8,
      height: 60,
      width: 90
  }
});

export default listItem;
