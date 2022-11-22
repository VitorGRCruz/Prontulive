import React,{useState} from "react";
import { View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import estilosCampo from "../../Estilos/EstilosCampo";

function CampoSenha(props) {
  
  return (
    <View style={props.style}>
      <Icon name="lock" style={estilosCampo.icone}/>
       <TextInput
          placeholder={props.a}
          placeholderTextColor='rgba(18,65,180,1)'
          multiline={false}
          selectionColor="rgba(18,65,180,1)"
          style={estilosCampo.placeH}
          secureTextEntry
          onChangeText={props.onChangeText}
        />
      </View>
  );
}

export default CampoSenha;
