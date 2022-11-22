import React, { useContext } from "react";
import { Text } from "react-native";
import estilosLogin from '../Estilos/EstilosLogin'
import estilosLogged from '../Estilos/EstilosLogged'
import CampoPessoa from "../Componentes/Campos/CampoPessoa";
import CampoData from "../Componentes/Campos/CampoData";
import Context from "./Contexto";
import Upload from "./Upload";

export default function Representante(props) {
    const [setNomep, setcpfP, setDataNasc,fileResponseP, setFileResponseP, fileResponseR, setFileResponseR] = useContext(Context);
    return (
        <>
            <Text style={[estilosLogged.text, { marginTop: '8%' }]}>
                Dados Do Paciente 
            </Text>
            <Text style={estilosLogin.text}>Nome do paciente</Text>
            <CampoPessoa x='1' onChangeText={setNomep} style={estilosLogin.Campo} />
            <Text style={estilosLogin.text}>CPF do paciente</Text>
            <CampoPessoa x='2' onChangeText={setcpfP} style={estilosLogin.Campo} />
            <Text style={estilosLogin.text}>
                Data de Nascimento do Paciente
            </Text>
            <CampoData onChangeText={setDataNasc} placeholder='Data de nascimento' style={estilosLogin.Campo} />
            <Context.Provider value={[fileResponseP, setFileResponseP, fileResponseR, setFileResponseR]}>
                <Upload paciente={props.paciente} placeholder="RG do Paciente, autorizações, etc" />
            </Context.Provider>
        </>
    );}