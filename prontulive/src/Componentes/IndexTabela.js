import React from "react"
import {View,Text, StyleSheet} from 'react-native'
import EstilosLogged from "../Estilos/EstilosLogged"
import { widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';


function IndexTabela(){

return(
<View style={EstilosLogged.tabela}>
    <View style={EstilosLogged.titulo_index}>
        <Text style={styles.texto}>Paciente</Text>
    </View>
    <View style={EstilosLogged.titulo_index}>
        <Text style={styles.texto}>Atendimento</Text>
    </View>
    <View style={EstilosLogged.titulo_index}>
        <Text style={styles.texto}>Finalidade</Text>
    </View>
</View>
);}

const styles = StyleSheet.create({
    texto:{
        fontFamily:'Staatliches-Regular',
        fontSize:hp('2.3%'),color:'white'
    }
})

export default IndexTabela;
