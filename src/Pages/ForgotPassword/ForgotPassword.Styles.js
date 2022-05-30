import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../Global/Colors';
import FontSize from '../../Global/FontSizes';
const Styles = StyleSheet.create({
  Container: {
   flex:1,
  },
  textinputstyle: {
    borderRadius: 30,
    height:hp(7),
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
    fontSize: FontSize.font20,
    textAlign: 'center',
  },
  forgotpasswordtext:{
    textAlign: 'center',
    color: Colors.purple,
    fontSize: FontSize.font30,
    fontWeight:'400'
  },
  twolinetext:{
    padding: 10,
    width: wp(70),
    textAlign: 'center',
    color: '#000000',
  },
  txtinptview:{
    justifyContent: 'center',
    alignSelf: 'center',
    top: hp(8),
    justifyContent: 'space-around',
    height: hp(20),
  },
  
});
export default Styles;
