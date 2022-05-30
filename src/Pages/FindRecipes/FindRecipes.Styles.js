import { StyleSheet } from 'react-native';
import { responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions'
import Colors from '../../Global/Colors';
import FontSize from '../../Global/FontSizes';
const Styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    headerview: {
        paddingVertical: rh(0.5),
        backgroundColor: Colors.purple,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    headertext: {

        color: Colors.White,
        fontSize: FontSize.font17,
        fontWeight: '400',
        borderColor: Colors.White,
        borderBottomWidth: 1,
    },
    renderfunctionmainview:
        { height: rh(17), marginHorizontal: rw(4), zIndex:5,elevation: 5, marginTop: 5, backgroundColor: Colors.White, borderRadius: 10, flexDirection: 'row',marginTop:10,marginBottom:rh(0.5)},
        renderimage:{ resizeMode:'cover'  , height: rh(17), borderTopLeftRadius: 10, borderBottomLeftRadius: 10 ,width:rw(27)},
        innerboldhead:{ color: Colors.black, fontSize: 12, fontWeight: '700' },
        innerwithoutbold:{ color: Colors.black, fontSize: 12,left:5,},
        similerrender:
        { height: rh(17), marginHorizontal: rw(1), zIndex:5,elevation: 5, marginTop: 5, backgroundColor: Colors.White, borderRadius: 10, flexDirection: 'row',marginTop:10,marginBottom:rh(0.5)},
});
export default Styles;


