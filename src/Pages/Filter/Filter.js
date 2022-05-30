import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions'
import Colors from '../../Global/Colors';
import FontSize from '../../Global/FontSizes';
import Styles from './Filter.Styles';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MarkSvg from '../../Assets/Icons/MarkSvg.svg'
import ForwardSvg from '../../Assets/Icons/ForwardSvg.svg'
import Entypo from 'react-native-vector-icons/Entypo'
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
export default function Filter({ navigation, route }) {
    console.log('====================================');
    console.log(route?.params);
    console.log('====================================');


    const [data, setdata] = useState(route?.params)

    const specificingrdients = [
        { id: 1, ingredintname: 'Apple' },

    ]

    const categories = [
        { id: 1, categoryname: 'snack' },
        { id: 2, categoryname: 'snack' },
        { id: 3, categoryname: 'snack' },

    ]
    const specificrederitem = ({ item, index }) => {
        return (
            <View style={{ height: rh('9'), width: rw('49'), flexDirection: "row", justifyContent: 'flex-start', alignContent: 'center', alignSelf: 'center', padding: rh(1), alignItems: 'center', paddingLeft: rw(5) }}>
                {item.selected ?

                    <TouchableOpacity onPress={() => selectedvalues(item, index)}>
                        <AntDesign name='checkcircle' size={15} color={Colors.purple} />
                    </TouchableOpacity>

                    :
                    <TouchableOpacity onPress={() => selectedvalues(item, index)}>
                        <Entypo name='circle' size={15} color={Colors.purple} />
                    </TouchableOpacity>

                }
                <Text style={Styles.renderfunctiontext}>{item.itemname}</Text>

            </View>
        )
    }





    const selectedvalues = (item, index) => {
        let temp = [...data]
        if (item.selected) {
            item.selected = false;
        }
        else {
            item.selected = true;
        }
        temp[index] = item;
        setdata(temp)
    }




    const specificcategories = ({ item }) => {
        return (
            <View style={Styles.catflatlistview}>
                <TouchableOpacity>
                    <AntDesign name='checkcircle' size={15} color={Colors.purple} />
                </TouchableOpacity>
                <Text style={Styles.renderfunctiontext}>{item.categoryname}</Text>

            </View>
        )
    }


    return (
        <SafeAreaView style={Styles.Container}>
            <View
                style={Styles.headerview}>
                <TouchableOpacity
                    style={{ left: rw(3) }}
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={30} color={Colors.White} />
                </TouchableOpacity>
                <Text
                    style={Styles.headertext}>
                    FILTER
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text
                        style={[Styles.headertext, { right: rw(7), borderBottomWidth: 0 }]}>
                        RESET
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={[Styles.vw, { flex: 1, borderBottomWidth: 0, borderRadius: 0 }]}>
                <Text style={{ color: Colors.black, fontWeight: '700', fontSize: FontSize.font14, paddingTop: rh(3), paddingLeft: rw(4) }}>What specific ingredients would like</Text>
                <Text style={{ color: Colors.black, fontWeight: '700', fontSize: FontSize.font14, paddingLeft: rw(4), paddingTop: 5 }}>to use?</Text>
                <View style={{ borderWidth: 0.5, marginTop: rh(2), borderColor: Colors.purple }}></View>
                <FlatList
                    data={data}
                    renderItem={specificrederitem}
                    keyExtractor={item => item.itemid}
                    numColumns={2}
                />

            </View>
            {/* <View style={Styles.vw}>
                <Text style={Styles.maintext}>Categories</Text>
                <View style={Styles.borderview}></View>
                <FlatList
                    data={categories}
                    renderItem={specificcategories}
                    keyExtractor={item => item.id}
                    numColumns={2}
                />

            </View> */}


            {/* <View style={Styles.vw}>
                <Text style={Styles.maintext}>Calories</Text>
                <View style={Styles.borderview}></View>

                <View style={Styles.caloriesntinnerview}>
                    <TouchableOpacity style={[Styles.caloriesbtn, { backgroundColor: Colors.green }]}>
                        <Text style={[Styles.caloriesbtntext, { color: Colors.White }]}>ANY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.caloriesbtn}>
                        <Text style={Styles.caloriesbtntext}>MAX{'\n'}400</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.caloriesbtn}>
                        <Text style={Styles.caloriesbtntext}>MIN{'\n'}401</Text>
                    </TouchableOpacity>
                </View>
            </View> */}

            {/* <View style={{ position: "absolute", bottom: rh(5), justifyContent: 'center', alignSelf: 'center' }}>
                <TouchableOpacity style={Styles.recipesbtn}>
                    <Text style={Styles.reipesbtntext}>FILTER RECIPES</Text>
                </TouchableOpacity>
            </View> */}

            <View style={{
                bottom: rh(5), position: 'absolute', left: wp(10),
                right: wp(10),
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('FindRecipes', data)}
                    style={{
                        marginHorizontal: wp(10),
                        backgroundColor: Colors.purple,
                        paddingVertical: hp(2),
                        borderRadius: 10,
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            fontSize: FontSize.font21,
                            color: Colors.White,
                            fontWeight: '400',
                        }}>
                        FILTER RECIPES
                    </Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )
}

