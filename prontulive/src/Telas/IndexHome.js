import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, Alert, TouchableOpacity, StyleSheet } from "react-native";
import Menu from "../Componentes/BotaoMenu";
import estilosLogin from "../Estilos/EstilosLogin";
import estilosLogged from "../Estilos/EstilosLogged";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IndexTabela from "../Componentes/IndexTabela";
import { useIsFocused } from '@react-navigation/native';
import { WebView } from 'react-native-webview'

function IndexHome() {
        const [nome, setNome] = useState('')
        const [idR, setidR] = useState(null)
        const [header, setHeader] = useState(null)
        const [requisicoes, setRequisicoes] = useState([]);
        const isfocused = useIsFocused();

        async function recuperarObjeto() {
                try {
                        let receberID = await AsyncStorage.getItem('@id')
                        let receberNome = await AsyncStorage.getItem('@nome')
                        setNome(receberNome);
                        setidR(receberID);
                }
                catch (error) {
                        console.log(error)
                }}
        async function CarregarRequerimento() {
                let response = await fetch('http://10.0.2.2/apireactnative/web.php?carregar_requisicao',
                        {
                                method: 'POST',
                                headers: {
                                        Accept: 'aplication/json',
                                        'Content-Type': 'aplication/json'
                                },
                                body: JSON.stringify({
                                        idR: idR
                                })
                        });
                let recebeDados = await response.json();
                if (recebeDados[0] == 0) {
                        setHeader(<>
                                <Text style={[estilosLogged.text, styles.text_index]}>Nenhuma Requisição feita</Text>
                        </>);
                        console.log('NENHUMA REQUISIÇÃO RECUPERADA !');
                }
                else {
                        setHeader(<>
                                <Text style={[estilosLogged.text, styles.text_index]}>Requisições feitas</Text>
                                <IndexTabela />
                        </>);
                        setRequisicoes(recebeDados);
                        console.log('REQUISIÇÃO RECUPERADA !');
                }
        }
        const [web_view, setWeb_view] = useState(null);
        async function Carregar_prontuario(idRC) {
                let response = await fetch('http://10.0.2.2/apireactnative/web.php?carregar_prontuario',
                        {
                                method: 'POST',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                        idRC: idRC
                                })
                        });
                let recebeDados = await response.json();
                setWeb_view(
                        <View style={{ height: "0%" }}>
                                <WebView source={{ uri: '10.0.2.2/site/prontuarios/' + recebeDados }} />
                        </View>)
                setTimeout(() => {
                        setWeb_view(null)
                },3000);
        }
        useEffect(() => {
                if (idR == null) {
                        recuperarObjeto();
                }
                else {
                        CarregarRequerimento();
                }
        }, [idR, isfocused])

        return (
                <View style={{ flex: 1 }}>
                        < ImageBackground
                                source={require('../assets/Imagens/Prontulive.png')}
                                style={estilosLogged.cabecalho} >
                                <Menu style={estilosLogin.BackMenu} />
                        </ImageBackground >

                        <View style={estilosLogged.corpo}>
                                <Text style={estilosLogged.text}>
                                        BEM-VINDO {nome}
                                </Text>
                                {header}
                                {requisicoes.map((value, index) => {
                                        var status;
                                        var obs;
                                        var style_status;
                                        const [ano, mes, dia] = value.data_atendimento.split('-');
                                        const data = [dia, mes, ano].join('/');

                                        switch (value.status) {
                                                case '1': status = 'Análise Administrativa';
                                                        break;
                                                case '2': status = 'Análise Júridica';
                                                        break;
                                                case '3': status = 'Requisição Aceita';
                                                        style_status = estilosLogged.item_tabela.req_aceita
                                                        break;
                                                case '4': status = 'Solicitação recusada';
                                                        style_status = estilosLogged.item_tabela.req_recusa
                                                        break;
                                                case '5': status = 'Solicitação recusada';
                                                        style_status = estilosLogged.item_tabela.req_recusa
                                                        break;
                                                default:
                                                        console.log("Sem status definido");
                                                        break;
                                        }
                                        switch (value.observacao) {
                                                case null: obs = 'Requisição em anáise, sem anotações no momento';
                                                        break;
                                                default: obs = value.observacao;
                                                        break;
                                        }
                                        return (
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                if (status == 'Requisição Aceita') {
                                                                        Alert.alert(
                                                                                "Requisição Aceita", "Deseja visualizar o Prontuário?",
                                                                                [{ text: "Sim", onPress: () => { Carregar_prontuario(value.id) } },
                                                                                { text: "Não", }])
                                                                } else {
                                                                        if(status == 'Solicitação recusada'){
                                                                                Alert.alert(status,'Motivo da recusa: '+obs)
                                                                        }
                                                                        else{
                                                                                Alert.alert(status, obs)
                                                                        }
                                                                        
                                                                }
                                                        }}
                                                        key={(index)}
                                                        style={[estilosLogged.tabela, styles.itens]}>
                                                        <View style={[estilosLogged.item_tabela, style_status]}>
                                                                <Text style={styles.texto}>{value.nome}</Text>
                                                        </View>
                                                        <View style={[estilosLogged.item_tabela, style_status]}>
                                                                <Text style={styles.texto}>{data}</Text>
                                                        </View>
                                                        <View style={[estilosLogged.item_tabela, style_status]}>
                                                                <Text style={styles.texto}>{value.finalidade}</Text>
                                                        </View>
                                                </TouchableOpacity>
                                        ) })}
                        </View>
                        {web_view}
                </View>
        );}
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
        from 'react-native-responsive-screen';

const styles = StyleSheet.create({
        texto: {
                fontFamily: 'Staatliches-Regular',
                fontSize: hp('1.8%'),
                color: 'rgba(18,65,180,1)'
        },
        itens: {
                borderWidth: 2, borderColor: 'rgba(18,65,180,1)', marginTop: '1%'
        }, text_index: {
                borderBottomWidth: 0, fontSize: hp('3%'),
        },
})
export default IndexHome;