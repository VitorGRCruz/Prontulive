import React, { useState, useEffect, useContext} from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { Button } from '@rneui/base';
import estilosLogin from "../Estilos/EstilosLogin";
import CampoEmail from "../Componentes/Campos/CampoEmail.js";
import CampoTelefone from "../Componentes/Campos/CampoTelefone";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CampoRua, CampoNcasa, CampoBairro, CampoCEP } from '../Componentes/Campos/CampoEndereco';
import Context from "./Contexto";




export default function Edit(props) {
    const [editado, setEditado, visible, setVisible] = useContext(Context);


    async function Editar() {
        let response = await fetch('http://10.0.2.2/apireactnative/web.php?editar_usuario',
            {
                method: 'POST',
                headers: {
                    Accept: 'aplication/json',
                    'Content-Type': 'aplication/json'
                },
                body: JSON.stringify({

                    id: id,
                    email: email,
                    telefone: telefone,
                    endereco: rua + '__' + Ncasa + '__' + bairro + '__' + cep,
                })
            });
        let recebeDados = await response.json();
        if (recebeDados[0] == 0) {
            Alert.alert('Não foi possivel editar dados!', 'Tente Novamente')
        }
        else {
            try {

                console.log('informações alteradas');

            }
            catch (error) {
                console.log('erro ao salvar usuario')
            } 
        }
    }

    const [id, setId] = useState(null);
    const [email, setEmail] = useState(null);
    const [telefone, setTelefone] = useState(null);


    const [rua, setRua] = useState(null);
    const [Ncasa, setNcasa] = useState(null);
    const [bairro, setBairro] = useState(null);
    const [cep, setCep] = useState(null);

    async function recuperarObjeto() {
        try {
            let receberID = await AsyncStorage.getItem('@id')
            setId(receberID);

            let receberEmail = await AsyncStorage.getItem('@email')
            setEmail(receberEmail);

            let receberTelefone = await AsyncStorage.getItem('@telefone')
            setTelefone(receberTelefone);


            let receberEndereco = await AsyncStorage.getItem('@endereco')
            const [rua, n, bairro, cep] = receberEndereco.split('__');
            setRua(rua);
            setNcasa(n);
            setBairro(bairro);
            setCep(cep);

            console.log('sucesso')


        }
        catch (error) {
            console.log('erro')
        }
    }


    useEffect(() => {
        recuperarObjeto();
    }, []);

    async function Alterar() {
        await AsyncStorage.setItem('@email', email);
        await AsyncStorage.setItem('@telefone', telefone);
        await AsyncStorage.setItem('@endereco', rua + '__' + Ncasa + '__' + bairro + '__' + cep);
        Editar();
        setEditado(true);
        setVisible(false);
        Alert.alert('Sucesso!','Informações Alteradas');

    }





    return (
        <ScrollView>
            <View style={estilos.Modal}>
                <Text style={estilosLogin.text}>E-mail</Text>
                <CampoEmail onChangeText={setEmail} value={email}
                    style={estilosLogin.Campo} />

                <Text style={estilosLogin.text}>Telefone</Text>
                <CampoTelefone onChangeText={setTelefone} value={telefone}
                    style={estilosLogin.Campo} />

                <Text style={estilosLogin.text}>Endereço</Text>
                <CampoRua onChangeText={setRua} value={rua} style={estilosLogin.Campo} />

                <Text style={estilosLogin.text}>Número da Casa</Text>
                <CampoNcasa onChangeText={setNcasa} value={Ncasa} style={estilosLogin.Campo} />

                <Text style={estilosLogin.text}>Bairro</Text>
                <CampoBairro onChangeText={setBairro} value={bairro} style={estilosLogin.Campo} />

                <Text style={estilosLogin.text}>CEP</Text>
                <CampoCEP onChangeText={setCep} value={cep} style={estilosLogin.Campo} />

                <Button titleStyle={{ fontFamily: 'Staatliches-Regular' }}
                    buttonStyle={estilosLogin.botao}
                    title="Editar" onPress={() => Alterar()} />

                <Button titleStyle={{ fontFamily: 'Staatliches-Regular' }}
                    title="Voltar" buttonStyle={estilosLogin.botao}
                    onPress={() => setVisible(false)} />



            </View>
        </ScrollView> 

    );


}



const estilos = StyleSheet.create({
    Modal: { alignItems: "center", flex: 1 },

});