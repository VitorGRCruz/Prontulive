import React from "react";
import {NavigationContainer } from '@react-navigation/native'
//Stack:
import {createStackNavigator} from '@react-navigation/stack';
import IndexLogin from '../Telas/IndexLogin';
import Cadastro from '../Telas/Cadastro';
//Drawer
import {createDrawerNavigator} from '@react-navigation/drawer';
import {estilosDrawer,CustomDrawerContent} from "../Estilos/EstilosDrawer";
import IndexHome from "../Telas/IndexHome";
import IndexDados from '../Telas/IndexDados';
import Formulario from '../Telas/Formulario';

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

const StackRotas=() => {
    return(      
        <Stack.Navigator initialRouteName="IndexLogin"
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="IndexLogin" component={IndexLogin} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="Home" component={DrawerRotas} />
        </Stack.Navigator>
   );
}

const DrawerRotas=() => {
    return(      
    <Drawer.Navigator 
        drawerContent={props =><CustomDrawerContent {...props} />} 
        screenOptions={{  headerShown:false,
            drawerLabelStyle:{color:'white', fontFamily:'Staatliches-Regular', fontSize:16},
            drawerItemStyle:{borderBottomWidth:1,borderBottomColor:'#3496F8'},
            drawerActiveBackgroundColor:'#1070DE',
            drawerStyle: {
              backgroundColor: 'rgba(18,65,180,1)',
              width: '60%'
            }, 
          }}
        >
            <Drawer.Screen name="IndexHome" component={IndexHome}
                options={estilosDrawer.Op1} />
            <Drawer.Screen name="IndexDados" component={IndexDados}
                options={estilosDrawer.Op2} />
            <Drawer.Screen name="Formulario" component={Formulario} 
                options={estilosDrawer.Op3} />
    </Drawer.Navigator>
    );
    }

const Navigator=()=>{
    return(
        <NavigationContainer>
            <StackRotas/>
        </NavigationContainer>
    );
}
export default Navigator;