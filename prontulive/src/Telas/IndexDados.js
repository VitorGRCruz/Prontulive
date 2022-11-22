import React from "react";
import { ImageBackground, View, SafeAreaView } from 'react-native'
import Menu from "../Componentes/BotaoMenu";
import DadosPessoais from '../Componentes/DadosPessoais'
import { ScrollView } from "react-native-gesture-handler";
import estilosLogin from "../Estilos/EstilosLogin";
import estilosLogged from "../Estilos/EstilosLogged";

function IndexDados() {
return (
<SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
                <ImageBackground
                source={require('../assets/Imagens/Dados.png')}
                style={estilosLogged.cabecalho}>
                        <Menu style={estilosLogin.BackMenu} />
                </ImageBackground>
                <View style={estilosLogged.corpo}>
                        <View style={{ width: '90%', flex: 1, justifyContent: 'space-evenly' }}>
                                <DadosPessoais />
                        </View>
                </View>
        </ScrollView>
</SafeAreaView>
);}

export default IndexDados;