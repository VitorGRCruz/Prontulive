import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import {useNavigation} from '@react-navigation/native';

function BotaoMenu(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => {navigation.openDrawer()}}  style={[styles.container, props.style]}>
      <Icon name="menu" style={styles.icon}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3F51B5",
    borderRadius: 28,
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 2,
    minWidth: 40,
    minHeight: 40,
    justifyContent: "center"
  },
  icon: {
    color: "#fff",
    fontSize: 24,
    height: 26,
    width: 24,
    alignSelf: "center"
  }
});

export default BotaoMenu;
