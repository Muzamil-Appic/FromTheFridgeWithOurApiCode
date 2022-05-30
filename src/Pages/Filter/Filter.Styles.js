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
        { height: rh(17), marginHorizontal: rw(4), zIndex: 5, elevation: 5, marginTop: 5, backgroundColor: Colors.White, borderRadius: 10, flexDirection: 'row', marginTop: 10, marginBottom: 5 },
    renderimage: { resizeMode: 'cover', height: rh(17), borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: rw(27) },
    innerboldhead: { color: Colors.black, fontSize: 10, fontWeight: '700' },
    innerwithoutbold: { color: Colors.black, fontSize: 10 },
    vw: { height: rh(20), borderWidth: 1, borderColor: Colors.purple, marginTop: rh(1.5), marginHorizontal: rw(2), borderRadius: 10, elevation: 5, backgroundColor: Colors.White },
    maintext: { color: Colors.black, fontWeight: '700', fontSize: FontSize.font14, paddingTop: rh(2), paddingLeft: rw(4), paddingBottom: rh(1) },
    borderview: { borderWidth: 0.5, marginTop: rh(1), borderColor: Colors.purple },
    caloriesbtn: { backgroundColor: Colors.White, borderRadius: 100, height: rw(11), width: rw(11), justifyContent: 'center', elevation: 5 },
    caloriesbtntext: { color: Colors.black, fontWeight: '400', fontSize: FontSize.font11, textAlign: 'center' },
    recipesbtn: { backgroundColor: Colors.purple, borderRadius: 10, paddingVertical: rh(2.5), width: rw(60), justifyContent: 'center' },
    reipesbtntext: { textAlign: 'center', color: Colors.White, fontSize: FontSize.font14, fontWeight: '400' },
    caloriesntinnerview: { width: rw('45'), height: rh(12.5), alignSelf: 'center', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' },
    catflatlistview: { borderColor: Colors.purple, height: rh('6'), width: rw('49'), flexDirection: "row", justifyContent: 'flex-start', alignContent: 'center', alignSelf: 'center', alignItems: 'center', paddingLeft: rw(5) },
    renderfunctiontext: { textAlign: 'center', fontWeight: '400', fontSize: 13, color: Colors.black, padding: 10 }
});
export default Styles;
