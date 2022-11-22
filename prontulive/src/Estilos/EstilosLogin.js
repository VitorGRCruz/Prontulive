import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';


export default StyleSheet.create(
  { 
    container: {
        flex: 1,
      },
      div1:{
        flex:1,
        flexDirection:'column'
      },
       BackMenu: {
        width: hp('8%'),
        height:hp('8%'),
        borderRadius:hp('8%')/2,
        marginTop:hp('1%'),
        marginLeft:'2%',
        backgroundColor: "rgba(18,65,180,1)"

      },
      div2:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',

      },
      img:{
        width:'80%',margin:'2%'
      },

      div3:{
        flexDirection:'column',
        justifyContent: 'flex-start',
        alignItems:'center'
      },
      Campo: {
       width: wp('80%'),
        borderWidth: hp('0.5%'),
        borderColor: "rgba(18,65,180,1))",
        borderRadius:hp('2%'),
        flexDirection: "row", 
      }, 
      text: {
        color: "rgba(18,65,180,1)",
        fontSize: hp('3%'),
        alignSelf:'flex-start',
        marginLeft: '11%',
        marginTop:'7%',
        fontFamily:'Staatliches-Regular'
      },
      botao:{
          backgroundColor:'rgba(18,65,180,1)',
          width: wp('80%'),
          borderRadius: hp('2%'),
          marginTop:'9%'
        
        },
        titleButton:{
        fontFamily:'Staatliches-Regular'
      }
    
})