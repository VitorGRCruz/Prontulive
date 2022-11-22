import React from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@rneui/base';

import CampoPessoa from "../Componentes/Campos/CampoPessoa";
import CampoSenha from "../Componentes/Campos/CampoSenha.js";
import estilosLogin from "../Estilos/EstilosLogin";

function Login(props) {
  return (
    <ScrollView>
      <SafeAreaView style={estilosLogin.container}>
        <View style={estilosLogin.div2}>
          <Image resizeMode='contain' style={estilosLogin.img}
            source={require('../assets/Imagens/Logo.png')} />
        </View>

        <View style={estilosLogin.div3}>
          <Text style={estilosLogin.text}>CPF</Text>
          <CampoPessoa x='2' value={props.valueCpf} onChangeText={props.onChangeCpf} style={estilosLogin.Campo} />

          <Text style={estilosLogin.text}>Senha</Text>
          <CampoSenha onChangeText={props.onChangeSenha} a="Digite sua senha" style={estilosLogin.Campo} />

          <Button title="ENTRAR" type="solid" titleStyle={estilosLogin.titleButton}
            buttonStyle={estilosLogin.botao}
            onPress={props.onPress1} />

          <Button title="CADASTRAR" type="solid" titleStyle={estilosLogin.titleButton}
            buttonStyle={estilosLogin.botao}
            onPress={props.onPress2} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
export default Login;
