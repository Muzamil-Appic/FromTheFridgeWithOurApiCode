import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../Global/Colors';
import FontSize from '../../Global/FontSizes';
import {responsiveHeight as rh,responsiveWidth as rw} from 'react-native-responsive-dimensions'
const Styles = StyleSheet.create({
  Container: {
   flex:1,

  },
  toptext: {
    fontSize: FontSize.font26,
    color: Colors.purple,
    textAlign: 'center',
    padding: 5,
    // textShadowColor: 'rgba(1, 1, 0, 0.75)',
   // textShadowOffset: {width: 1, height: 1},
    //textShadowRadius: 10,
  },
  btn: {
    width: wp(26),
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: Colors.purple,
    height: hp(4),
  },
  btnwithoutround: {
    width: wp(25),
    justifyContent: 'center',
    height: hp(4),
  },
  btntext: {
    FontSize: FontSize.fon15,
    color: Colors.purple,
    textAlign: 'center',
  },
  renderfunctionmainview: {
    width: wp(50),
    height: hp(6.5),
    justifyContent:"center",
    
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.purple,
  },
  renderfunctioninnerview: {
    flexDirection: 'row',
    
    
    height: hp(6),
   
    alignItems:'center',
    right:wp(2),
    
    alignSelf:'center',
    
    
  },
  renderfunctiontext: {Color: Colors.black, fontSize: FontSize.fon15,left:wp(3),width:wp(34)},
  counttext: {
    textAlign: 'center',
    color: Colors.White,
    fontSize: FontSize.font25,
   
  },
  countview: {
    backgroundColor:Colors.green,

    
  },
  flatlistcontainer: {
    borderColor: Colors.purple,
    alignSelf: 'center',
    borderWidth:1,
   
   
    
    
  },
  fullkitcheninneview: {
    top: hp(3),
    height: hp(50),
   borderLeftWidth:1,
   borderRightWidth:1,
    borderTopWidth:1,
    width: wp(95),
    alignSelf: 'center',
    borderColor: Colors.purple,
  },
  pickerview: {
    width: wp(95),
    height: hp(6),
    top: hp(6.5),
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: '#606060',
  },
  quickkitcenview: {
    marginVertical:hp(2),
    height: hp(58),
    borderLeftWidth:1,
    borderRightWidth:1,
    borderTopWidth:1,
    
    width: wp(95),
   alignSelf:'center',
    borderColor: Colors.purple,
  },
  svgbackview: {
    backgroundColor: '#FBDED6',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.purple,
    height:hp(20),
    
  },
  countrtview: {
    borderWidth:0.5,
    borderColor: Colors.black,
    height: hp(6),
    width:wp(95),
    borderRadius:10,
    alignSelf:'center',
    padding: hp(1),
    justifyContent:"center",
    alignItems:"center",
    top:hp(2),
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default Styles;
