import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

export default function ModalTipoReq(props) {
    const navigation = useNavigation();
    function TipoReq(bool) {
        props.checked(bool)
        props.visible(false)
    }
    return (
        <View style={estilos.container}>

            <View style={estilos.modal}>
                <View style={estilos.menu}>
                    <TouchableOpacity onPress={() => navigation.goBack()}
                        style={{ flex: 2 }}>
                        <Icon name="arrow-back" style={estilos.back} />
                    </TouchableOpacity>

                    <View style={{ flex: 16, alignItems: "center" }}>
                        <Text style={[estilos.textMenu, { marginEnd: '10%' }]}>EU SOU </Text>
                    </View>
                </View>

                <View style={estilos.botoes}>
                    <TouchableOpacity onPress={() => TipoReq(true)}
                        style={[estilos.naosim, {
                            borderRightWidth: 1,
                            borderRightColor: 'rgba(18,65,180,1)'
                        }]}>
                        <Text style={estilos.textBotoes}>
                            PACIENTE </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => TipoReq(false)}
                        style={[estilos.naosim, {
                            borderLeftWidth: 1,
                            borderLeftColor: 'rgba(18,65,180,1)'
                        }]}>
                        <Text style={estilos.textBotoes}>
                            REPRESENTANTE </Text>
                    </TouchableOpacity>

                </View>
            </View>

        </View>
    );
}
const estilos = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        width: '80%', height: "15%",
        borderTopStartRadius: 20
    },
    menu: {
        backgroundColor: 'rgba(18,65,180,1)', alignItems: 'center',
        flex: 3, borderTopStartRadius: 20, borderTopEndRadius: 20,
        flexDirection: "row"
    },
    textMenu: {
        fontFamily: 'Staatliches-Regular', color: "white", fontSize: 30
    },
    textBotoes: {
        fontFamily: 'Staatliches-Regular', color: "rgba(18,65,180,1)",
        fontSize: 25,
    },

    botoes: {
        flexDirection: 'row', flex: 4, borderColor: "rgba(18,65,180,1)",
        borderWidth: 2
    },
    naosim: {
        backgroundColor: 'white', flex: 1, alignItems: 'center', justifyContent: 'center',

    },
    back: {
        color: "white",
        margin: '2%',
        fontSize: 25
    }

});


