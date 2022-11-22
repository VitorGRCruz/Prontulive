import React, {useState} from "react";
import { Text,View, TextInput, TouchableOpacity, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Icon3 from "react-native-vector-icons/Entypo";
import estilosCampo from '../../Estilos/EstilosCampo';
import ModalEndereco from "../ModalEndereco";

function CampoEndereco(props) {

  const [visible, setVisible] = useState(false);

  const modalVisible = (bool) => {
      setVisible(bool)}

  return (
   <View style={props.style}>
    <Icon2 name="location-city" style={estilosCampo.icone}></Icon2>
    <View style={{flex:1}}>
    <TouchableOpacity style={{padding:'4.5%'}} onPress={()=>modalVisible(true)}>
    <Text style={estilosCampo.placeH}>Digite o Endereço Completo</Text>
    </TouchableOpacity>

    <Modal transparent={true}
      animationType='fade'
      visible={visible}
      onRequestClose={() => modalVisible(false)}>
        <ModalEndereco visible={modalVisible}/>
    </Modal>
   </View>
   </View>
  );  
}

function CampoRua(props){
  return(
    <View style={props.style}>
    <Icon name="map-signs"  style={estilosCampo.icone}></Icon>
    <TextInput
      placeholder="RUA:"
      placeholderTextColor='rgba(18,65,180,1)'
      multiline={false}
      selectionColor="rgba(18,65,180,1)"
      style={estilosCampo.placeH}
      onChangeText={props.onChangeText}
      value={props.value}
    ></TextInput>
</View>
  );
}

function CampoNcasa(props){
  return(
    <View style={props.style}>
      <Icon3 name="home" style={estilosCampo.icone}></Icon3>
      <TextInput
      placeholder="Número da casa:"
      placeholderTextColor='rgba(18,65,180,1)'
      multiline={false}
      keyboardType="number-pad"
      selectionColor="rgba(18,65,180,1)"
      style={estilosCampo.placeH}
      onChangeText={props.onChangeText}
      value={props.value}
    ></TextInput>
    </View>
  );
}

function CampoBairro(props){
  return(
    <View style={props.style}>
      <Icon2 name="location-city" style={estilosCampo.icone}></Icon2>
      <TextInput
      placeholder="Bairro: "
      placeholderTextColor='rgba(18,65,180,1)'
      multiline={false}
      selectionColor="rgba(18,65,180,1)"
      style={estilosCampo.placeH}
      onChangeText={props.onChangeText}
      value={props.value}
    ></TextInput>
    </View>
  );
}

function CampoCEP(props) {
  return (
    <View style={ props.style}>
        <Icon3 name="location" style={estilosCampo.icone}></Icon3>
        <TextInput
          placeholder="CEP: "
          placeholderTextColor='rgba(18,65,180,1)'
          multiline={false}
          keyboardType="number-pad"
          selectionColor="rgba(18,65,180,1)"
          style={estilosCampo.placeH}
          onChangeText={props.onChangeText}
          value={props.value}
        ></TextInput>
    </View>
  );  
}


export {CampoEndereco,CampoRua,CampoNcasa,CampoBairro,CampoCEP};
