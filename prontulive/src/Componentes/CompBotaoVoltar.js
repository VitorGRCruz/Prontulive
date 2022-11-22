import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useNavigation} from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

function CompBotaoVoltar(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => {navigation.goBack()}} style={[styles.container, props.style]}>
      <Icon name="keyboard-backspace" style={styles.icon}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center"
  },
  icon: {
    color: "#fff",
    fontSize: hp('3%'),
    alignSelf: "center"
  }
});

export default CompBotaoVoltar;
