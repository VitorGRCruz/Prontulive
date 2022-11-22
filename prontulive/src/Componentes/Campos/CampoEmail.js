import React from "react";
import { View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import estilosCampo from '../../Estilos/EstilosCampo';

function CampoEmail(props) {
  return (
    <View style={ props.style}>
        <Icon name="email" style={estilosCampo.icone}></Icon>
        <TextInput
          placeholder="Digite o E-mail"
          placeholderTextColor='rgba(18,65,180,1)'
          multiline={false}
          keyboardType="email-address" 
          selectionColor="rgba(18,65,180,1)"
          style={estilosCampo.placeH}
          onChangeText={props.onChangeText}
          value={props.value}
        />
    </View>
  );  
}


export default CampoEmail;
