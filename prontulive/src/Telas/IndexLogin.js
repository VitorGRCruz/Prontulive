import React, { useState } from "react";
import { Alert } from 'react-native';
import Login from '../Componentes/Login'
import AsyncStorage from '@react-native-async-storage/async-storage';

function IndexLogin({ navigation }) {
    const [cpf, setCpf] = useState(null);
    const [senha, setSenha] = useState(null);

    async function Logar() {
        let response = await fetch('http://10.0.2.2/apireactnative/web.php?fazer_login',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cpf: cpf,
                    senha: senha
                })
            });
        let recebeDados = await response.json();

        if (recebeDados[0] == 0) {
            Alert.alert('Usuário não encontrado!', 'Tente novamente') }
        else {
            try {
                await AsyncStorage.setItem('@id',
                    recebeDados[0].id);

                await AsyncStorage.setItem('@nome',
                    recebeDados[0].nome);

                await AsyncStorage.setItem('@cpf',
                    recebeDados[0].cpf);

                await AsyncStorage.setItem('@data_nasc',
                    recebeDados[0].data_nasc);

                await AsyncStorage.setItem('@email',
                    recebeDados[0].email);

                await AsyncStorage.setItem('@telefone',
                    recebeDados[0].telefone);

                await AsyncStorage.setItem('@endereco',
                    recebeDados[0].endereco);
                    
                await AsyncStorage.setItem('@senha',
                    recebeDados[0].senha_md5);
                navigation.navigate('Home')
            }
            catch (error) {
                console.log('erro ao salvar usuario')
            }  }  }

    function VerificarVazio() {
        if (cpf === null || senha === null) {
            if (cpf === null && senha === null) {
                Alert.alert('CPF E SENHA NÃO FORAM PREENCHIDOS !', 'Tente novamente')
            }
            else if (cpf == null) {
                Alert.alert('CPF NÃO FOI PREENCHIDO !', 'Tente novamente')
            }
            else if (senha === null) {
                Alert.alert('SENHA NÃO FOI PREENCHIDA !', 'Tente novamente')
            }
        }
        else {
            Logar()
        } }

    return (
        <>
            <Login valueCpf={cpf} onPress1={() => VerificarVazio()}
                onPress2={() => { navigation.navigate('Cadastro') }}
                onChangeCpf={setCpf}
                onChangeSenha={setSenha} />
        </>
    );
}
export default IndexLogin;