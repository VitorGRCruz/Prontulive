import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';


export default  StyleSheet.create({
    container:{flex:1},
    text:{
        fontFamily:'Staatliches-Regular', 
        fontSize:hp('4%'),
        color:'rgba(18,65,180,1)',
        borderBottomColor:'rgba(18,65,180,1)',
       borderBottomWidth:hp('0.5%'),
       paddingTop:hp('2%'),
    },
    cabecalho:{
        flex:2,
        width:wp('100%'), 
        height:wp('50%')
    },
    corpo:{
        flex:6,
        alignItems:'center'
    },
    dadosIndex:{ 
        marginRight:'2%',
        fontFamily:'Staatliches-Regular',
        fontSize:hp('3.5%'), color:'rgba(18,65,180,1)'
    },
    dadosItem:{
        fontFamily:'Staatliches-Regular',
        fontSize:hp('3%'), color:'black',alignSelf:"center"
    },
    edit: { backgroundColor:'rgba(246,127,8,0.88)',
          minWidth:'30%',
          borderRadius: 12,
          alignSelf:"flex-end",
          marginTop:'9%'},
    tabela:{
        flexDirection:'row',
        height:'5%',
        width:'90%', marginTop:'5%'
    },
    titulo_index:{
        width:'33.3%',
        backgroundColor: 'rgba(18,65,180,1)', 
        alignItems:"center", 
        borderRightWidth:1, 
        borderRightColor: 'white'
    }, 
    item_tabela:{
        width:'33.3%',
        alignItems:"center", 
        borderRightWidth:1, 
        borderRightColor: 'rgba(18,65,180,1)',
        req_aceita:{
            backgroundColor:'rgba(0,255,0,0.35)'},
        req_recusa:{
            backgroundColor:'rgba(255,0,0,0.35)'}}
    });