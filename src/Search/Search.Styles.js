import { StyleSheet, Dimensions } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Global/Colors';
import FontSize from '../Global/FontSizes';
import { responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions'
const siz = Dimensions.get('window').height

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  searchview: {
    height: rh(6),
    backgroundColor: Colors.purple,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchtext: {
    fontWeight: '400', fontSize: siz * 0.025, color: Colors.White
  },
  renderfunctionmainview:
        { height: rh(17), marginHorizontal: rw(4), zIndex:5,elevation: 5, marginTop: 5, backgroundColor: Colors.White, borderRadius: 10, flexDirection: 'row',marginTop:10,marginBottom:rh(0.5)},
        renderimage:{ resizeMode:'cover'  , height: rh(17), borderTopLeftRadius: 10, borderBottomLeftRadius: 10 ,width:rw(27)},
        innerboldhead:{ color: Colors.black, fontSize: 12, fontWeight: '700' },
        innerwithoutbold:{ color: Colors.black, fontSize: 12,left:5,},




});
export default Styles;
