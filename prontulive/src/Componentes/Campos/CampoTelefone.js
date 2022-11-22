import React, { useState} from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import estilosCampo from '../../Estilos/EstilosCampo';
import { TextInputMask } from 'react-native-masked-text';

function CampoTelefone(props) {
  
  return (
    <View style={props.style}> 
        <Icon name="phone" style={estilosCampo.icone}></Icon>
        <TextInputMask
          placeholderTextColor='rgba(18,65,180,1)'
          style={estilosCampo.placeH}
          placeholder="Número do telefone"
           type={'cel-phone'}
           options={{
           maskType: 'BRL',
           withDDD: true,
           dddMask: '(99)'}}
           onChangeText={props.onChangeText}
           value={props.value}
           
/>
    </View>
  );
}


export default CampoTelefone;
