import React, { useCallback, useContext, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import File from "react-native-vector-icons/FontAwesome5";
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
    from 'react-native-responsive-screen';
import DocumentPicker, { types } from 'react-native-document-picker';
import Context from "./Contexto";

function Upload(props) {
    const [fileResponseP, setFileResponseP, fileResponseR, setFileResponseR] = useContext(Context);
    const [responseLocal, setResponseLocal] = useState([]);
    const handleDocumentSelection = useCallback(async () => {
        try {   
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [types.pdf, types.images],
                allowMultiSelection: true,
            });
            setResponseLocal(response);
            if (props.paciente == true) {
                setFileResponseP(response);
            }
            else {
                setFileResponseR(response);
            } } 
        catch (err) {
            console.log(err);
        }
    }, []);
    return (
        <TouchableOpacity onPress={handleDocumentSelection} style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                <Text style={styles.text}>{props.placeholder}</Text>
                <Icon name="upload" style={styles.icon}></Icon>
            </View>
            <View style={{ flexDirection: 'row' }}>
                {responseLocal.map((file, index) =>(
                    <View style={{ flexDirection: 'column', margin: '4%' }}>
                        <File style={styles.file} name='file' />
                        <Text
                            key={index.toString()}
                            numberOfLines={1}
                            ellipsizeMode={'middle'}>
                            {file?.name}
                        </Text>
                    </View>
                ))}
            </View>
        </TouchableOpacity>
    );}

const styles = StyleSheet.create({
    container: {
        width: wp('80%'),
        borderWidth: hp('0.5%'),
        borderColor: "rgba(18,65,180,1))",
        borderRadius: hp('2%'),
        margin: '5%'
    },
    icon: {
        color: 'rgba(18,65,180,1)',
        fontSize: hp('6%'),
        alignSelf: "center",
        margin: '4%', marginRight: '10%',
        flexDirection: 'column'
    },
    text: {
        color: "rgba(18,65,180,1)",
        fontSize: hp('2.5%'),
        alignSelf: 'flex-start',
        marginLeft: '11%',
        marginTop: '7%',
        fontFamily: 'Staatliches-Regular'
    },
    file: {
        color: 'rgba(18,65,180,1)',
        fontSize: hp('4%')
    }
});

export default Upload;