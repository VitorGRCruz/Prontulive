import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground, ScrollView, Modal, Alert } from 'react-native';
import { Button } from '@rneui/base';
import Menu from "../Componentes/BotaoMenu";
import estilosLogin from "../Estilos/EstilosLogin";
import estilosLogged from "../Estilos/EstilosLogged";
import SelectBox from "../Componentes/SelectBox";
import  Representante  from '../Componentes/TipoSolicitante'
import ModalTipoReq from '../Componentes/ModalTipoReq'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CampoData from "../Componentes/Campos/CampoData.js";
import Select from '../Componentes/Campos/Select'
import Context from "../Componentes/Contexto";
import Upload from "../Componentes/Upload";

export default function Formulario() {
    const [fileResponseP, setFileResponseP] = useState([]);
    const [fileResponseR, setFileResponseR] = useState([]);
    const [checked, setChecked] = useState(null);
    const [visible, setVisible] = useState(true);
    const navigation = useNavigation();
    const [data_atendimento, setData_atendimento] = useState(null);
    const [data_alta, setData_alta] = useState(null);
    const [finalidade, setFinalidade] = useState(null);
    const [idR, setIdr] = useState(null);
    const [nomeP, setNomep] = useState(null);
    const [cpfP, setcpfP] = useState(null);
    const [dataNasc, setDataNasc] = useState(null);
    var retorno;
    var flag;
    const modalVisible = (bool) => {
        setVisible(bool)
    }
    const modalChecked = (bool) => {
        setChecked(bool)
    }

    if (checked == true) {
        flag = 1;
    }
    else {
        retorno = <>
            <Context.Provider value={[setNomep, setcpfP, setDataNasc, fileResponseP, setFileResponseP, fileResponseR, setFileResponseR]}>
                <Representante paciente={false} />
            </Context.Provider>
        </>
        flag = 2;
    }

    async function recuperarObjeto() {
        try {
            let receberId = await AsyncStorage.getItem('@id');
            setIdr(receberId);
            console.log('id recuperado')
        }
        catch (error) {
            console.log('erro ao recuperar id')
        }
    }

    useEffect(() => {
        recuperarObjeto();
    }, []);

    async function EnviaRequerimento() {
        let dados = new FormData();
        let i = 0;
        let j = 0;
        for (; i < fileResponseP.length; i++) {
            dados.append('file' + i, fileResponseP[i]);
        }
        for (; j < fileResponseR.length; j++) {
            dados.append('file' + (i + j), fileResponseR[j]);
        }
        dados.append('flag', flag);
        dados.append('idR', idR);
        dados.append('finalidade', finalidade);
        dados.append('data_atendimento', data_atendimento);
        dados.append('data_alta', data_alta);
        dados.append('nomeP', nomeP);
        dados.append('cpfP', cpfP);
        dados.append('data_nascP', dataNasc);
        const config = {
            method: 'post',
            body: dados
        };
        let response = await fetch('http://10.0.2.2/apireactnative/web.php?cadastrar_requerimento', config);
        let recebeDados = await response.text();
        console.log(recebeDados);
        try {

            if (recebeDados == 0) {
                console.log('FLAG NÃO CAPTURADO')
            }
            else if (recebeDados == 1 || recebeDados == 2) {
                Alert.alert('Sucesso!', 'Requerimento Aberto');
                navigation.navigate('IndexHome');
            }
            else if (recebeDados == 3) {
                Alert.alert('Erro!', 'Falha ao salvar arquivoS');
            } }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <ScrollView>
            <ImageBackground
                source={require('../assets/Imagens/Forms.png')}
                style={estilosLogged.cabecalho}>
                <Menu style={[estilosLogin.BackMenu, { marginBottom: '30%' }]} />
            </ImageBackground>
            <View
                style={estilosLogged.corpo}>
                <Modal transparent={false}
                    animationType='fade'
                    visible={visible}
                    onRequestClose={() => modalVisible(false)}>
                    <ModalTipoReq checked={modalChecked} visible={modalVisible} />
                </Modal>
                <Text style={[estilosLogged.text, { marginTop: '8%' }]}>
                    Dados Do Requerente</Text>
                <Context.Provider value={[fileResponseP, setFileResponseP, fileResponseR, setFileResponseR]}>
                    <Upload paciente={true} placeholder="Envie uma foto ou PDF do RG" />
                </Context.Provider>

                            {retorno}

                <Text style={estilosLogin.text}>
                    Data do atendimento prestado</Text>
                <CampoData onChangeText={setData_atendimento} placeholder='Data do atendimento' style={estilosLogin.Campo} />
                <Text style={estilosLogin.text}>
                    Data da alta do Paciente</Text>
                <CampoData onChangeText={setData_alta} placeholder='Data da alta' style={estilosLogin.Campo} />
                <Text style={estilosLogin.text}>Finalidade da Solicitação</Text>
                <Context.Provider value={[finalidade, setFinalidade]}>
                    <Select style={estilosLogin.Campo} />
                </Context.Provider>
                <SelectBox checked={checked} setChecked={setChecked}
                    title='Sou o Paciente ?' />
                <Button title="Enviar Requerimento" onPress={() => EnviaRequerimento()}
                    titleStyle={estilosLogin.titleButton}
                    type="solid" buttonStyle={[estilosLogin.botao,
                    { marginBottom: '6%' }]}/>
            </View>
        </ScrollView>
   );}