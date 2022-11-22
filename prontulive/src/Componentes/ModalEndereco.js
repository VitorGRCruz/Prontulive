import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {Button } from '@rneui/base';
import estilosLogin from "../Estilos/EstilosLogin";
import {CampoRua,CampoBairro,CampoCEP} from '../Componentes/Campos/CampoEndereco';


export default function ModalEndereco(props){
    return(
        <View style={estilos.container}>
            <View style={estilos.modal}>
                <Text style={estilos.text}>Endereço</Text> 

                <Text style={estilosLogin.text}>Endereço</Text>
                <CampoRua value={props.value} onChangeText={props.onChangeText} style={estilosLogin.Campo}/>

                <Text style={estilosLogin.text}>Bairro</Text>
                <CampoBairro value={props.value} onChangeText={props.onChangeText} style={estilosLogin.Campo}/>

                <Text style={estilosLogin.text}>CEP</Text>
                <CampoCEP value={props.value} onChangeText={props.onChangeText} style={estilosLogin.Campo}/>
                

                <Button  titleStyle={{fontFamily:'Staatliches-Regular'}} 
                    title="Voltar"  buttonStyle={estilosLogin.botao} 
                    onPress={()=>props.visible(false)}/>
            </View>
        </View>
    );
}


const estilos = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        
    },
    modal:{alignItems: 'center', 
        backgroundColor: 'white',
        borderRadius: 10,
        width:"100%",
        height:'65%',
        borderTopStartRadius:120,borderWidth:4,borderColor:'rgba(18,65,180,1)',
       
    },
    text:{
        margin: 10,
        fontSize: 25,
        fontFamily:'Staatliches-Regular',
        alignSelf:"center",color:'rgba(18,65,180,1)'
    
},
   
});