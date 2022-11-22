import React, { useState, useEffect } from "react";
import { View, Text, Modal } from 'react-native';
import estilosLogged from "../Estilos/EstilosLogged";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from '@rneui/base';
import Edit from "./ModalEdit";
import Editar_senha from "./ModalSenha";
import Context from "./Contexto";

  

export default function DadosPessoais() {
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [endereco, setEndereco] = useState('');
    const [senhaAntiga, setSenhaAntiga] = useState(null);
    const [id, setId] = useState(null);


    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const [editado, setEditado] = useState(false);



    async function recuperarObjeto() {
        try {
            let receberNome = await AsyncStorage.getItem('@nome')
            setNome(receberNome);

            let receberCpf = await AsyncStorage.getItem('@cpf')
            setCpf(receberCpf);
 
            let receberEmail = await AsyncStorage.getItem('@email')
            setEmail(receberEmail);

            let recebeTel = await AsyncStorage.getItem('@telefone')
            setTelefone(recebeTel);

            let recebeData = await AsyncStorage.getItem('@data_nasc')

            const [ano, mes, dia] = recebeData.split('-');
            const result = [dia, mes, ano].join('/');
            setDataNasc(result);

            let recebeEnderec = await AsyncStorage.getItem('@endereco')
            setEndereco(recebeEnderec.replace(/__/g, ', '));

            let recebeSenha = await AsyncStorage.getItem('@senha');
            setSenhaAntiga(recebeSenha);

            let recebeId = await AsyncStorage.getItem('@id');
            setId(recebeId);



        }
        catch (error) {
            console.log(error)
        }
    }


    useEffect(() => { 
        recuperarObjeto();
        setEditado(false);
    }, [editado])

    return ( 
    <>
                        <Dados item={nome} index={'Nome:'} />
                        <Dados item={cpf} index={'CPF:'} />
                        <Dados item={dataNasc} index={'Data de Nascimento:'} />
                        <Dados item={telefone} index={'Telefone:'} />
                        <Dados item={email} index={'E-mail:'} />
                        <Dados item={endereco} index={'Endereço'} />

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Button title="Editar Dados" titleStyle={{ fontFamily: 'Staatliches-Regular' }}
                                type="solid" buttonStyle={estilosLogged.edit}
                                onPress={() => setVisible(true)}
                            />

                            <Button title="Editar Senha" titleStyle={{ fontFamily: 'Staatliches-Regular' }}
                                type="solid" buttonStyle={estilosLogged.edit} onPress={() => setVisible2(true)}
                            />
                        </View>


                        <Context.Provider value={[editado, setEditado, visible, setVisible]}>

                            <Modal
                                animationType='slide'
                                visible={visible} >
                                <Edit />
                            </Modal>
                        </Context.Provider>

                        <Context.Provider value={[id,senhaAntiga,setSenhaAntiga,editado,setEditado,visible2, setVisible2]}>
                            <Modal animationType='slide'
                                visible={visible2}>
                                <Editar_senha/>

                            </Modal>
                        </Context.Provider>
            </>


    );


}


function Dados(props) {
    return (
        <>
            <View style={{
                flexDirection: 'row', width: '100%',
                borderBottomColor: 'rgba(18,65,180,1)',
                borderBottomWidth: 3, paddingTop: 30
            }}>
                <Text style={estilosLogged.dadosIndex}>{props.index}</Text>
                <Text style={estilosLogged.dadosItem}>{props.item}</Text>

            </View>


        </>
    );
}

