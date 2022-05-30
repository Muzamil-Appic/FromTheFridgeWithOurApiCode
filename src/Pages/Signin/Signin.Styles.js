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
  fromtheFridgetext: {
    color: Colors.purple,
    fontSize: FontSize.font36,
    textAlign: 'center',
    
    fontWeight: '400',
  },
  whatinfridge: {
    color: Colors.black,
    fontSize: FontSize.font23,
    textAlign: 'center',
    fontWeight: '400',
  },
  textinputstyle: {
    height: hp(7),
    width: wp(85),
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.purple,
    paddingLeft: 25,
    fontSize: 16,
    backgroundColor: '#8B008B1C',
  },
  loginbutton: {
    backgroundColor: Colors.purple,
    height: hp(7),
    width: wp(85),
    borderRadius: 30,
    justifyContent: 'center',
  },
  logintext: {
    fontWeight: 'normal',
    color: Colors.White,
    fontSize: FontSize.font23,
    textAlign: 'center',
  },
  svgstyle: {
    width: wp(32),
    height: hp(4),
    elevation: 2,
    borderRadius: 10,
    backgroundColor: '#F3EAEA',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  aptext:{
    height: hp(20),
    width: wp(100),
    justifyContent: 'center',
    top: hp(3),
  },
  textviewstyle:{
    alignItems: 'center',
    top: hp(5),
    height: hp(33),
   
    justifyContent: 'space-around',
  },
  svgmainstyle:{
    flexDirection: 'row',
    width: wp(85),
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    bottom:hp(9)
  },
  fbgoogletext:{
    fontSize: FontSize.fon15,
    color: Colors.black,
    fontWeight: '600',
  }
});
export default Styles;
