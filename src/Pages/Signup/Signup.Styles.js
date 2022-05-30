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
  textinpt: {
    fontSize: FontSize.font14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    color: Colors.dark,
    height:hp(6),
    margin:3,
    paddingLeft:14,
    backgroundColor: '#FAFAFA',
  },
  countrtview:{
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    height:hp(6.5),
    margin:3,
    backgroundColor: '#FAFAFA',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft:14,
    alignItems:'center'
  },

  passwordentypo:{
    alignSelf: 'flex-end',
    paddingRight:14,
    paddingBottom:11
    
  },
  createaccountxt:{
    
      textAlign: 'center',
      color: Colors.purple,
      fontSize: FontSize.font28,
      fontWeight:'400'
    },
  
});
export default Styles;