import React from 'react'
import{
    StyleSheet, Text, View,
    TouchableOpacity, ScrollView
} from 'react-native'


const FINALIDADE =['DPVAT','REEMBOLSO','BENEFICIO DE INSS / SEGURO / INVENTÁRIO',
 'COMPROVANTE DE COMPARECIMENTO','AÇÃO JUDICIAL', 'ENCAMINHAMENTO MÉDICO']; 


const ModalPicker = (props) => {
    
    let retorno;
    const onPressItem = (retorno) => {
        props.changeModalVisibility(false);
        props.setData(retorno);
    }
    let titulo;

    titulo='FINALIDADE DO REQUERIMENTO';
    retorno = FINALIDADE.map((item, index) => {
        return (
            <TouchableOpacity
                style={styles.option}
                key={index}
                onPress={() => onPressItem(item)}      
            >
                <Text style={styles.text}>
                    {item}
                </Text>
            </TouchableOpacity>
        )})
        



  return(
      <TouchableOpacity
      onPress={() => props.changeModalVisibility (false)}
      style={styles.container}
      >
          <View style={styles.modal}>
          <Text style={[styles.text,{alignSelf:"center", fontSize:25}]}>{titulo}
          </Text>
            <ScrollView>
               {retorno}
            </ScrollView>
          </View>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        
    },
    modal:{
        backgroundColor: 'rgba(18,65,180,1)',
        borderRadius: 10,
        width:"100%",
        height:'50%',
        borderTopStartRadius:120
       
    },
    option: {
        alignItems: 'flex-start'
        
    },
    text:{
        margin: 20,
        fontSize: 20,
        fontFamily:'Staatliches-Regular',
        color:'white'
 
    }
})

export {ModalPicker}