import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckBox } from '@rneui/base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
    from 'react-native-responsive-screen';

export default function SelectBox(props) {
    return (
        <View style={estilos.div}>
            <CheckBox
                checkedColor='rgba(18,65,180,1)'
                size={hp('4%')}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={props.checked}
                onPress={() => 
                    props.setChecked(!props.checked)}/>
            <TouchableOpacity
                onPress={() => props.setChecked(!props.checked)}
                style={estilos.textTouch}>
                <Text style={estilos.text}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </View>
    );}

const estilos = StyleSheet.create({
    div: {
        flexDirection: 'row', width: wp('80%'),
    },
    text: {
        fontFamily: 'Staatliches-Regular',
        color: 'rgba(18,65,180,1)',
        fontSize: hp('2.5%'), alignSelf: 'center'
    },
    textTouch: {
        justifyContent: 'center'
    }
})