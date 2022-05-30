import { Dimensions, StyleSheet } from 'react-native';
import { responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions'
import Colors from '../../Global/Colors';
import FontSize from '../../Global/FontSizes';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const siz = Dimensions.get('window').height
const Styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    headerview: {
        height: rh(6),
        backgroundColor: Colors.purple,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerinnerview: { flexDirection: "row", width: rw(100), justifyContent: 'space-between', alignSelf: "center", alignContent: 'center', backgroundColor: Colors.purple, height: rh(6), alignItems: 'center' },
    headertext: { fontWeight: '400', fontSize: siz * 0.025, color: Colors.White },
    txtinptmailname: { fontSize: FontSize.font17, height: rh(7), width: rw(80), borderRadius: 40, backgroundColor: Colors.txtinptcolor, paddingLeft: rw(7) },
    chngpasbtn: { flexDirection: 'row', alignSelf: 'center', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around', },
    chngpastext: { textAlign: "center", fontSize: FontSize.font18, color: Colors.dark, right: 5 },
    topvw: { alignSelf: 'center', height: rh(21), justifyContent: "space-between", },
    bottomtxtinptvw: { height: hp(9), width: wp(90), borderBottomColor: Colors.dark, borderBottomWidth: 1, justifyContent: 'space-around' },
    bottomtxt: { fontSize: FontSize.font17, },
    txtinpt: { fontSize: FontSize.fon15, bottom: 5, height: hp(8), color: Colors.dark },
    modalvw: { height: rh(7), backgroundColor: '#C4C4C4', width: rw(75), borderRadius: 8, alignSelf: 'center', padding: 15, fontSize: siz * 0.02 },
    modaltxtinpt: { paddingLeft: rw(5), top: rh(1) },
    txtdatainpit: { fontSize: siz * 0.025, height: hp(8), top: rh(1) },


});
export default Styles;
