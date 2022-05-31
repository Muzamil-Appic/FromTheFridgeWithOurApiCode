import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions'
import Colors from '../../Global/Colors';
import FontSize from '../../Global/FontSizes';
import Styles from './FindRecipes.Styles';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MarkSvg from '../../Assets/Icons/MarkSvg.svg'
import ForwardSvg from '../../Assets/Icons/ForwardSvg.svg'
import { useIsFocused } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { firebase } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import FavouriteColorfull from '../../Assets/Icons/FavouriteColorfull.svg'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FindRecipes({ navigation, route }) {
    const isFocused = useIsFocused();
    const loginpersonid = firebase.auth().currentUser.email
    const firebaseobect = firestore().collection('Favourite')
    const [lastscreendata, setlastscreendata] = useState(route?.params)
    const [recoed, setrecoed] = useState([])
    const [pushrecord, setpushrecord] = useState([])
    const [loader, setloader] = useState(false)
    const [muzamil, setmuzamil] = useState([])
    const [favoriteList, setFavoriteList] = useState([]);
    const [favouritedata, setfavouritedata] = useState([])
    const [recipiedescriptionsingredients, setrecipiedescriptionsingredients] = useState('')
    const [ingredients, setingredients] = useState('')
    useEffect(() => {
        GetFavourite()
        GetAPiResponse()
    }, [isFocused]);

    const GetFavourite = async () => {
        setloader(true)
        const id = firebase.auth().currentUser.email
        // console.log("Login Person ID------->", id);
        firestore()
            .collection('Favourite').where('loginpersonid', '==', id)
            .onSnapshot(querySnapshot => {
                const favouritedata = [];
                querySnapshot.forEach(documentSnapshot => {
                    console.log("Favourites Record---->", documentSnapshot.data());
                    favouritedata.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                (favouritedata);
                setfavouritedata(false)

            });
    }

    const onFavorite = restaurant => {
        setFavoriteList([...favoriteList, restaurant]);
        const emails = firebase.auth().currentUser.email
        const uniq = emails + restaurant.ID;
        //  console.log("---->", uniq);
        const userfavourites = firebaseobect.doc(uniq)
        {
            restaurant?.ingredients == "" ?
                userfavourites.set({
                    firbaseid: uniq,
                    image: restaurant?.image,
                    title: restaurant?.title,
                    id: restaurant?.ID,
                    loginpersonid: loginpersonid,
                    cookingtime: "N/A",
                    servingsize: "N/A",
                    directions: "N/A",
                }).then(() => {
                    //  console.log("Favourite");
                })
                    .catch((error) => {
                        alert(error)
                        console.log("Error---->", error);
                    })
                :

                userfavourites.set({
                    firbaseid: uniq,
                    image: restaurant?.image,
                    title: restaurant?.title,
                    id: restaurant?.ID,
                    loginpersonid: loginpersonid,
                    cookingtime: restaurant?.ingredients[0]?.readyInMinutes,
                    servingsize: restaurant?.ingredients[0]?.servings,
                    directions: restaurant?.ingredients[0]?.instructions,
                }).then(() => {
                    //  console.log("Favourite");
                })
                    .catch((error) => {
                        alert(error)
                        console.log("Error---->", error);
                    })
        }
    };
    const onRemoveFavorite = restaurant => {
        const filteredList = favoriteList.filter(
            item => item.ID !== restaurant.ID
        );
        const emails = firebase.auth().currentUser.email
        const uniq = emails + restaurant.ID;
        firestore().collection('Favourite').doc(uniq).delete()
        setFavoriteList(filteredList);
    };
    const ifExists = restaurant => {
        if (favoriteList.filter(item => item.ID === restaurant.ID).length > 0) {
            return true;
        }
        return false;
    };
    const GetAPiResponse = async () => {
        let newingredients = ''
        let firbaseList = []
        let islistf = []


        for (let i = 0; i < route.params.length; i++) {
            if (route.params[i].selected === true) {
                if (i != route.params.length - 1) {
                    newingredients += route.params[i].itemname + ','
                }
                else {
                    newingredients += route.params[i].itemname
                }
                setingredients(newingredients)
            }
            console.log('====================================', newingredients, "----->", ingredients);
        }
        setloader(true)
        await firebaseobect.where('loginpersonid', '==', loginpersonid).get()
            .then(querySnapshot => {
                // console.log('Total users: ', querySnapshot.size);
                querySnapshot.forEach(documentSnapshot => {
                    // console.log('====================================');
                    // console.log("Document Data---->",documentSnapshot.data());
                    // console.log('====================================');
                    firbaseList.push(documentSnapshot.data())
                });
            });

        await fetch(`http://waqarulhaq.com/fromTheFridge/get-recipes.php?combinations=${newingredients}`)
            .then(response => response.json())
            .then(response => {
                console.log("yh response aa rha hay api sy ingredients ka", response);

                for (let index = 0; index < firbaseList.length; index++) {
                    for (let j = 0; j < response?.data?.length; j++) {
                        if (firbaseList[index].id === response?.data[j].ID)
                            islistf.push(response?.data[j])
                    }
                }
                console.log('111', islistf);
                setFavoriteList(islistf)
                setpushrecord(response.data)
            })
            .catch(err => console.error(err));
        recoed.push(pushrecord)
        setloader(false)

    }
    const renderfunction = ({ item }) => {
        //console.log("___________________", item);
        return (
            <View>
                <View style={Styles.renderfunctionmainview}>
                    <View >
                        <Image source={{ uri: item.image }} style={Styles.renderimage} />
                    </View>
                    <View style={{ height: rh(17), width: rw(54), left: rw(2) }}>
                        <View style={{ height: rh(17), justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                            <Text numberOfLines={1} style={{ fontSize: FontSize.font16, color: Colors.black, fontWeight: '700', width: rw(50) }}>{item.title}</Text>
                        </View>

                    </View>

                    <View style={{ right: rw(0), height: rh(11), justifyContent: "space-around" }}>
                        <TouchableOpacity style={{ marginTop: rh(1) }}
                            onPress={() => (ifExists(item) ? onRemoveFavorite(item) : onFavorite(item))}
                        >
                            {ifExists(item) ?

                                <Fontisto size={22} color={Colors.purple} name={'favorite'} />

                                :
                                <Fontisto size={22} color={Colors.dark} name={'favorite'} />
                            }


                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: rh(2) }} onPress={() => navigation.navigate('RecipiesDescription', { item, ingredients })}>
                            <ForwardSvg height={'25px'} width={'25px'} />
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        )
    }
    return (
        <SafeAreaView style={Styles.Container}>
            <View
                style={Styles.headerview}>
                <TouchableOpacity
                    style={{ left: rw(3) }}
                    onPress={() => navigation.replace('TabNavigations')}>
                    <Ionicons name="chevron-back" size={30} color={Colors.White} />
                </TouchableOpacity>
                <Text
                    style={Styles.headertext}>
                    RECIPES
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Filter', route?.params)}>
                    <Text
                        style={[Styles.headertext, { right: rw(7), borderBottomWidth: 0 }]}>
                        FILTER
                    </Text>
                </TouchableOpacity>

            </View>



            {/* <View>
            {pushrecord === "" ?
            
                <View>

                </View>

                :
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: FontSize.font18, textAlign: "center", color: Colors.red }}>No Recipe Availabel</Text>
                </View>

            }
</View> */}

            {
                loader ?
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <ActivityIndicator size={'large'} color={Colors.purple} />
                    </View>
                    :
                    <FlatList
                        data={pushrecord}
                        keyExtractor={item => item.ID}
                        renderItem={renderfunction}
                    // ListFooterComponentStyle={{height:200}}
                    />
            }
            {/* 
            <TouchableOpacity style={{ marginTop: rh(2) }} onPress={() => navigation.navigate('RecipiesDescription', {item,muzamil})}>
                <ForwardSvg height={'25px'} width={'25px'} />
            </TouchableOpacity> */}

        </SafeAreaView >
    )
}




































// import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, ToastAndroid } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions'
// import Colors from '../../Global/Colors';
// import FontSize from '../../Global/FontSizes';
// import Styles from './FindRecipes.Styles';
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import MarkSvg from '../../Assets/Icons/MarkSvg.svg'
// import ForwardSvg from '../../Assets/Icons/ForwardSvg.svg'
// import { useIsFocused } from '@react-navigation/native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import Fontisto from 'react-native-vector-icons/Fontisto'
// import { firebase } from '@react-native-firebase/firestore';
// import firestore from '@react-native-firebase/firestore';


// import FavouriteColorfull from '../../Assets/Icons/FavouriteColorfull.svg'
// import { SafeAreaView } from 'react-native-safe-area-context';
// export default function FindRecipes({ navigation, route }) {
//     const isFocused = useIsFocused();
//     const loginpersonid = firebase.auth().currentUser.email
//     const firebaseobect = firestore().collection('Favourite')
//     // console.log("Last Screen Dat--------->", route?.params);

//     const [recoed, setrecoed] = useState([])
//     const [pushrecord, setpushrecord] = useState([])
//     const [lastscreendata, setlastscreendata] = useState(route?.params)
//     const [loader, setloader] = useState(false)
//     const [muzamil, setmuzamil] = useState([])
//     const [favoriteList, setFavoriteList] = useState([]);
//     const [favouritedata, setfavouritedata] = useState([])



//     console.log("------>", route?.params);




//     const PostDataInServer = async () => {
//         let ingredients = ''
//         for (let i = 0; i < route.params.length; i++) {
//             if (route.params[i].selected === true) {
//                 //    console.log('====================================');
//                 //      ingredients += route.params[i].itemname + ','

//                 //     console.log('====================================', ingredients);


//                 if (i != route.params.length - 1) {
//                     ingredients += route.params[i].itemname + ','
//                 }
//                 else {
//                     ingredients += route.params[i].itemname
//                 }

//             }
//             console.log('====================================', ingredients);
//         }
//         setloader(true)
//         fetch(`http://waqarulhaq.com/fromTheFridge/save-recipes.php?ingredients=${ingredients}&number=50`)
//             .then((response) => {
//                 if (response.status >= 200 && response.status <= 299) {
//                     return response.json();
//                 } else {
//                     throw Error(response.statusText);
//                 }
//             })
//             .then((jsonResponse) => {
//                 if (jsonResponse.msg == "Data saved successfully") {
//                     navigation.navigate('Home')
//                  console.log(jsonResponse.msg );
//                     ToastAndroid.show("Record Uploded !", ToastAndroid.SHORT);
//                     setloader(false)
//                     console.log("DOne");
//                 }
//                 else {
//                     alert("Record not saved")
//                     setloader(false)
//                 }
//                 setloader(false)
//             }).catch((error) => {
//                 setloader(false)
//                 // Handle the error
//                 console.log(error);
//             });


//     }






//     const dummykam = ({ item }) => {
//         // console.log("item",item);
//         return (
//             <View>
//                 <Text style={{ textAlign: 'center' }}>{item.itemname}</Text>
//             </View>

//         )
//     }



//     // fetch(`http://waqarulhaq.com/fromTheFridge/save-recipes.php?ingredients=${ingredients}&number=50`)
//     // .then((response) => {
//     //   if (response.status >= 200 && response.status <= 299) {
//     //     return response.json();
//     //   } else {
//     //     throw Error(response.statusText);
//     //   }
//     // })
//     // .then((jsonResponse) => {
//     //   console.log(jsonResponse);
//     // }).catch((error) => {
//     //   // Handle the error
//     //   console.log(error);
//     // });





















//     return (
//         <SafeAreaView style={Styles.Container}>
//             <View
//                 style={Styles.headerview}>
//                 <TouchableOpacity
//                     style={{ left: rw(3) }}
//                     onPress={() => navigation.replace('TabNavigations')}>
//                     <Ionicons name="chevron-back" size={30} color={Colors.White} />
//                 </TouchableOpacity>
//                 <Text
//                     style={Styles.headertext}>
//                     RECIPES
//                 </Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('Filter', route?.params)}>
//                     <Text
//                         style={[Styles.headertext, { right: rw(7), borderBottomWidth: 0 }]}>
//                         FILTER
//                     </Text>
//                 </TouchableOpacity>




//             </View>



//             <FlatList
//                 data={route.params}
//                 keyExtractor={item => item.id}
//                 renderItem={
//                     dummykam
//                 }
//             />

//             {loader ?
//                 <ActivityIndicator color={'blck'} size={'large'} />
//                 :
//                 <TouchableOpacity onPress={() => PostDataInServer()} style={{ height: 50, width: 250, backgroundColor: Colors.purple, justifyContent: "center", alignSelf: 'center', alignContent: "center", bottom: 20 }}>
//                     <Text style={{ fontSize: 20, color: Colors.White, textAlign: 'center' }}>Hit ME</Text>
//                 </TouchableOpacity>
//             }

//         </SafeAreaView>
//     )
// }






































