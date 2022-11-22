import React from 'react'
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

function CustomDrawerContent(props) {
    const navigation = useNavigation();
    async function Logout(){
        await AsyncStorage.clear();
        navigation.goBack();
    }
return (
    <DrawerContentScrollView {...props}>     
    <DrawerItemList {...props} />
    <DrawerItem labelStyle={{color:'white', fontFamily:'Staatliches-Regular', fontSize:16}}
    icon= {() => (<Icon3
               name="logout"
               size={22}
               color={'white'}
            /> )} 
            label="Sair" onPress={() =>  Logout() } />
    </DrawerContentScrollView>

);}

const estilosDrawer ={
    Op1:{ 
        title:'Início', drawerIcon: () => (
            <Icon
               name="home"
               size={22}
               color={'white'}
            /> ),
    },
    Op2:{
        title:'Dados Pessoais', drawerIcon: () => (
            <Icon2
               name="address-book"
               size={22}
               color={'white'}
            /> ),
    },
    Op3:{
        title:'Formulário', drawerIcon: () => (
            <Icon
               name="wpforms"
               size={22}
               color={'white'}
            /> ),
    },
};

export {estilosDrawer, CustomDrawerContent};
