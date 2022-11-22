import React, {useState } from "react";
import { View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import estilosCampo from '../../Estilos/EstilosCampo';
import { TextInputMask } from 'react-native-masked-text';

function CampoNome(props) {
  
  return (
    <>
        <TextInput
          placeholderTextColor='rgba(18,65,180,1)'
          style={estilosCampo.placeH}
          placeholder='Digite o nome'
          multiline={false}
          keyboardType='default'
          selectionColor="rgba(18,65,180,1)"
          onChangeText={props.onChangeText} 
          value={props.value}
        />
    </>
  );
}

function CampoCPF(props) {
  return (
    <>
        < TextInputMask 
        placeholderTextColor='rgba(18,65,180,1)'
        style={estilosCampo.placeH} 
        placeholder='Digite o CPF'
        type = {'cpf'}
        onChangeText={props.onChangeText} 
       />
     </>
  );
}

function CampoPessoa(props) {
  let retorno;
  if(props.x=='1'){
    retorno = CampoNome(props)

  }
  else if(props.x=='2'){
    retorno = CampoCPF(props)
  }
  return (
    <View style={props.style}>
      <Icon name="account" style={estilosCampo.icone}></Icon>
      {
          retorno
      }
      </View>
  );
}




export default CampoPessoa;
