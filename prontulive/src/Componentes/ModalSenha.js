import React, { useState, useEffect, useContext} from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { Button } from '@rneui/base';
import estilosLogin from "../Estilos/EstilosLogin";
import CampoSenha from '../Componentes/Campos/CampoSenha';
import Context from "./Contexto";
import AsyncStorage from "@react-native-async-storage/async-storage";





export default function Editar_senha(props) {
    const [id,senhaAntiga,setSenhaAntiga,editado,setEditado,visible2, setVisible2] = useContext(Context);
    const [senha, setSenha] = useState(null);
    const [Novasenha, setNovaSenha] = useState(null);
    const [senha2, setSenha2] = useState(null);


  
    async function Editar() {
        let response = await fetch('http://10.0.2.2/apireactnative/web.php?editar_senha',
            {
                method: 'POST',
                headers: {
                    Accept: 'aplication/json',
                    'Content-Type': 'aplication/json'
                },
                body: JSON.stringify({ 

                    id: id,
                    senha_antiga: senhaAntiga,
                    senha_atual: senha,
                    nova_senha: Novasenha,
                    senha2: senha2,
 
 
                })
            });
        let recebeDados = await response.json();
             if (recebeDados.retorno==2) {
            Alert.alert('Senha Atual incorreta!', 'Não foi possivel editar senha!');
        }
        else if(recebeDados.retorno==3){
            Alert.alert('Falha na confirmação da senha!', 'Não foi possivel editar senha!');
        }
        else if(recebeDados.retorno==1){
            try {
                await AsyncStorage.setItem('@senha', recebeDados.senha);
                console.log('informações alteradas');
                Alert.alert('Sucesso!', 'Senha alterada!');
                setSenhaAntiga(recebeDados.senha);
                setVisible2(false);
                setEditado(true);

            }
            catch (error) {
                console.log(error);
                console.log('erro ao salvar usuario')
            } 
        } 

    }


    return (
        <ScrollView>
            <View style={estilos.Modal}>
                <Text style={estilosLogin.text}>Senha Atual</Text>
                <CampoSenha onChangeText={setSenha} a="Confirme sua senha" style={estilosLogin.Campo} />

                <Text style={estilosLogin.text}>Nova Senha</Text>
                <CampoSenha onChangeText={setNovaSenha} a="Digite sua senha" style={estilosLogin.Campo} />

                <Text style={estilosLogin.text}>Confirme a Senha</Text>
                <CampoSenha onChangeText={setSenha2} a="Confirme sua senha" style={estilosLogin.Campo} />

                <Button titleStyle={{ fontFamily: 'Staatliches-Regular' }}
                    buttonStyle={estilosLogin.botao}
                    title="Editar Senha" onPress={() => Editar()} />

                <Button titleStyle={{ fontFamily: 'Staatliches-Regular' }}
                    title="Voltar" buttonStyle={estilosLogin.botao}
                    onPress={() => setVisible2(false)} />

            </View>
        </ScrollView> 

    );


}



const estilos = StyleSheet.create({
    Modal: { alignItems: "center", flex: 1 },

});