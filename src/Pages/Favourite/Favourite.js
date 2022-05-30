import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { responsiveScreenHeight as rh, responsiveScreenWidth as rw } from 'react-native-responsive-dimensions'
import Styles from './Favourite.Styles'
import firestore from '@react-native-firebase/firestore';
import Colors from '../../Global/Colors';
import { firebase } from '@react-native-firebase/auth';
import FontSize from '../../Global/FontSizes';
import ActivityLoader from '../../Components/ActivityLoader';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Favourite({ navigation }) {
    const [favouritedata, setfavouritedata] = useState([])
    const [loader, setloader] = useState(false)

    const favouritedatagetflastlistfunction = ({ item }) => {
        return (
            <View style={{ width: rw(50), paddingTop: rh(1), justifyContent: 'center', alignContent: "center", alignItems: "center" }}>
                <TouchableOpacity style={{ borderRadius: 10, alignContent: "center", height: rh(30), width: rw(45), elevation: 5, backgroundColor: Colors.White, marginTop: rh(1) }} onPress={() => navigation.navigate('SeconRecipeDescription', item)}>
                    <Image source={{ uri: item.image }} style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8, resizeMode: 'stretch', height: rh(20), width: rw(45), alignSelf: "center" }} />
                    <Text numberOfLines={2} style={{ padding: 10, color: Colors.black, fontWeight: "700", fontSize: FontSize.fon15, width: rw(40) }}>{item.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const getfavourite = async () => {
        setloader(true)
        const id = firebase.auth().currentUser.email
        console.log(id);
        firestore()
            .collection('Favourite').where('loginpersonid', '==', id)
            .onSnapshot(querySnapshot => {
                const favouritedata = [];
                querySnapshot.forEach(documentSnapshot => {
                    favouritedata.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                setfavouritedata(favouritedata);
                setloader(false)

            });

        // Unsubscribe from events when no longer in use
        // return () => subscriber();

    }

    useEffect(() => {
        getfavourite()
    }, [])

    return (
        <SafeAreaView style={Styles.Container}>
            <View style={Styles.headerinnerview}>
                <Text style={Styles.headertext}>FAVOURITES</Text>
            </View>
            {loader ?
                <ActivityLoader />
                :
                <FlatList
                    data={favouritedata}
                    //   keyExtractor={item => item.id}
                    renderItem={favouritedatagetflastlistfunction}
                    contentContainerStyle={{ paddingBottom: rh(12), }}
                    numColumns={2}
                />
            }
        </SafeAreaView>
    )
}