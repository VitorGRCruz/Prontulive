import React, { useState } from "react";
import { Text, View, ScrollView, Alert } from 'react-native';
import CompBotaoVoltar from "../Componentes/CompBotaoVoltar.js";
import { Button } from '@rneui/base';
import CampoPessoa from "../Componentes/Campos/CampoPessoa";
import CampoEmail from "../Componentes/Campos/CampoEmail.js";
import CampoData from "../Componentes/Campos/CampoData.js";
import estilosLogin from '../Estilos/EstilosLogin';
import CampoTelefone from '../Componentes/Campos/CampoTelefone';
import CampoSenha from '../Componentes/Campos/CampoSenha';
import { CampoRua, CampoNcasa, CampoBairro, CampoCEP } from '../Componentes/Campos/CampoEndereco';
import { useNavigation } from '@react-navigation/native';

export default function Cadastro() {
  const navigation = useNavigation();
  const [nome, setNome] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [data_nasc, setDataNasc] = useState(null);
  const [email, setEmail] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [rua, setRua] = useState(null);
  const [Ncasa, setNcasa] = useState(null);
  const [bairro, setBairro] = useState(null);
  const [cep, setCep] = useState(null);
  const [senha, setSenha] = useState(null);
  const [senha2, setSenha2] = useState(null);

  async function EnviaDados() {
    let response = await fetch('http://10.0.2.2/apireactnative/web.php?cadastrar_usuario',
      {
        method: 'POST',
        headers: {
          Accept: 'aplication/json',
          'Content-Type': 'aplication/json'
        },
        body: JSON.stringify({
          nome: nome,
          cpf: cpf,
          data_nasc: data_nasc,
          senha: senha,
          senha2: senha2,
          telefone: telefone,
          email: email,
          endereco: rua + '__' + Ncasa + '__' + bairro + '__' + cep
        })
      });
    let recebeDados = await response.text();

    if (recebeDados == 0) {
      Alert.alert('Confirmação de senha inválida','Tente novamente')
    }
    else if (recebeDados == 1) {
      Alert.alert('Sucesso!', 'Usuário Cadastrado')
      navigation.goBack()
    }
  }
  return (
    <ScrollView >
      <View style={estilosLogin.div1}>
        <CompBotaoVoltar
          style={estilosLogin.BackMenu}/>    
      </View>

      <View style={estilosLogin.div2}>
        <Text style={estilosLogin.text}>Nome</Text>
        <CampoPessoa onChangeText={setNome} x='1' style={estilosLogin.Campo} />

        <Text style={estilosLogin.text}>CPF</Text>
        <CampoPessoa onChangeText={setCpf} x='2' style={estilosLogin.Campo} />

        <Text style={estilosLogin.text}>Data de Nascimento</Text>
        <CampoData onChangeText={setDataNasc} placeholder='Data de nascimento' style={estilosLogin.Campo} />

        <Text style={estilosLogin.text}>E-mail</Text>
        <CampoEmail onChangeText={setEmail} style={estilosLogin.Campo} />

        <Text style={estilosLogin.text}>Telefone</Text>
        <CampoTelefone onChangeText={setTelefone} style={estilosLogin.Campo} />

        <Text style={estilosLogin.text}>Endereço</Text>
        <CampoRua onChangeText={setRua} style={estilosLogin.Campo} />

        <Text style={estilosLogin.text}>Número da Casa</Text>
        <CampoNcasa onChangeText={setNcasa} style={estilosLogin.Campo} />

        <Text style={estilosLogin.text}>Bairro</Text>
        <CampoBairro onChangeText={setBairro} style={estilosLogin.Campo} />

        <Text style={estilosLogin.text}>CEP</Text>
        <CampoCEP onChangeText={setCep} style={estilosLogin.Campo} />

        <Text style={estilosLogin.text}>Senha</Text>
        <CampoSenha onChangeText={setSenha} a="Digite sua senha" style={estilosLogin.Campo} />

        <Text style={estilosLogin.text}>Confirme a Senha</Text>
        <CampoSenha onChangeText={setSenha2} a="Confirme sua senha" style={estilosLogin.Campo} />

        <Button title="CADASTRAR" onPress={() => EnviaDados()} type="solid" titleStyle={estilosLogin.titleButton}
          buttonStyle={[estilosLogin.botao, { marginBottom: '15%' }]} />
      </View>
    </ScrollView>
  );
}