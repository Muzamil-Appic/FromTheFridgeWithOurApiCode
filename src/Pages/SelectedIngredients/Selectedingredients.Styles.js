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
  topview: {
  paddingVertical:hp(1),
  backgroundColor:Colors.purple,  
  justifyContent:"center",
  alignItems:'center'  
  },
 
});
export default Styles;
