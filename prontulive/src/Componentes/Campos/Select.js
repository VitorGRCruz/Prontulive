import React, { useState, useContext } from "react";
import {View, Text, Modal, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import estilosCampo from '../../Estilos/EstilosCampo';
import { ModalPicker } from '../ModalPicker';
import Context from "../Contexto";


function Select(props) {
  const [escolherDados, setEscolherDados] = useState('Selecione uma Opção...');
  const [isModalVisible, setisModalVisible] = useState(false);
  const [finalidade, setFinalidade] = useContext(Context);


  const changeModalVisibility = (bool) => {
    setisModalVisible(bool)}
  const setData = (retorno) => {
    setEscolherDados (retorno)
    setFinalidade(retorno);}
  return (
    <View style={props.style}>
            <Icon name="group" style={estilosCampo.icone}/>
            <View style={{flex:1}}>
                <TouchableOpacity
                style={{padding:'4.5%'}}
                onPress={() => changeModalVisibility(true)}>
                    <Text style={estilosCampo.placeH}>{escolherDados}</Text>
                </TouchableOpacity>
                <Modal
                transparent={true}
                animationType='fade'
                visible={isModalVisible}
                onRequestClose={() => changeModalVisibility(false)}>
                    <ModalPicker
                    changeModalVisibility={changeModalVisibility}
                    setData={setData}/>
                </Modal>

            </View>
    </View>
  );
}

export default Select;
