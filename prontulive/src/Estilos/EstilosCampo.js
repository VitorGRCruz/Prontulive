import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp}
from 'react-native-responsive-screen';

export default StyleSheet.create({
    icone: {
      color: "rgba(18,65,180,1)",
      fontSize: hp('3.5%'),
       alignSelf:'center',
       marginLeft:hp('0.7%')
    },
    placeH:{
      fontSize:hp('2.3%'),
      flex:1,
      fontFamily:'Staatliches-Regular',color:'rgba(18,65,180,1)'
    }   })