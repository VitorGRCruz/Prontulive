import React from "react";
import {View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import estilosCampo from '../../Estilos/EstilosCampo';
import { TextInputMask } from 'react-native-masked-text';

function CampoData(props) {
  return (
    <View style={props.style}>
      <Icon name="calendar" style={estilosCampo.icone}></Icon>
      < TextInputMask 
        placeholderTextColor='rgba(18,65,180,1)'
        style={estilosCampo.placeH}
        placeholder={props.placeholder}
        type = {'datetime'}
        options = { { 
        format : 'DD/MM/YYYY'}} 
        onChangeText={props.onChangeText}
       />
    </View>
  );
}



export default CampoData;
