import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../Global/Colors';
import FontSize from '../../Global/FontSizes';
const Styles = StyleSheet.create({
  Container: {
    height: hp(100),
    width: wp(100),
  },

  submit: {
    backgroundColor: Colors.purple,
    height: 50,
    width: 295,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf:'center',
  bottom:hp(4)
   
  },
  submitText: {
    fontWeight: 'normal',
    color: Colors.White,
    fontSize: FontSize.font17,
    textAlign: 'center',
    fontWeight:'700'
  },
  textboxstyle: {
    height: hp(8),
    width: wp(12),
    borderWidth: 1,
    borderRadius: 10,
    fontSize: FontSize.font30,
    textAlign: 'center',
    color: Colors.black,
    borderColor:'#D9D9D9'
  },
  headerstyle: {
    width: wp(100),
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    height:hp(8),
    alignItems:'center'
    
  },
  forgotpasswordtext: {
    fontSize: FontSize.font24,
    color: Colors.black,
    paddingBottom:1,
    
  },
  otptext: {
    color: Colors.black,
    fontSize: FontSize.font21,
    textAlign: 'center',
    fontWeight: '700'
  },
  twolinestext: {
    color: Colors.black,
    fontSize: FontSize.fon15,
    marginVertical:hp(4),
    textAlign: 'center',
    fontWeight:'400',
    
    
  },
  textbox: {
    flexDirection: 'row',
    width: wp(60),
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: hp(10),
    marginVertical:10
  
  },
  couldnotsendview: {
    bottom:hp(2),
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  timertext: {color: '#FD6B22', fontSize: 12, paddingLeft: 5},
});
export default Styles;
