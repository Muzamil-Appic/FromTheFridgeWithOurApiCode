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
  header: {
    backgroundColor: Colors.purple,
    height: hp(7),
    width: wp(100),
    flexDirection: 'row',
  },
  headerinnerview: {
    flexDirection: 'row',
    top: hp(2),
    paddingHorizontal: wp(10),
    width: wp(75),
    left: wp(20),
    justifyContent: 'space-between',
  },
  recepiesview: {
    borderBottomWidth: 1,
    height: hp(3),
    borderBottomColor: Colors.White,
    width:wp(15),
    alignItems:'center'
    
  },
  headertext: {color: Colors.White, fontSize: FontSize.font16},
});
export default Styles;