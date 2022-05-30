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
    headerinnerview: { flexDirection: "row", width: rw(100), justifyContent: 'center', alignSelf: "center", backgroundColor: Colors.purple, height: rh(6), alignItems: 'center' },
    headertext: { fontWeight: '400', fontSize: siz * 0.025, color: Colors.White },


});
export default Styles;
