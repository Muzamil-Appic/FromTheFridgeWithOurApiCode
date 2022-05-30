import {
    Share,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    ScrollView,
    Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
    responsiveHeight as rh,
    responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import Colors from "../../Global/Colors";
import FontSize from "../../Global/FontSizes";
import Ionicons from "react-native-vector-icons/Ionicons";
import MarkSvg from "../../Assets/Icons/MarkSvg.svg";
import ForwardSvg from "../../Assets/Icons/ForwardSvg.svg";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Favor from "../../Assets/Icons/Favor";
import Shre from "../../Assets/Icons/Shre.svg";
import HTMLView from "react-native-htmlview";
import ActivityLoader from "../../Components/ActivityLoader";
import firestore, { firebase } from "@react-native-firebase/firestore";
import Fontisto from 'react-native-vector-icons/Fontisto'
import Styles from '../FindRecipes/FindRecipes.Styles'
export default function RecipiesDescription({ navigation, route }) {
    const loginpersonid = firebase.auth().currentUser.email;
    const firebaseobect = firestore().collection("Favourite");
    const isFocused = useIsFocused();
    const [loader, setloader] = useState(false);
    const [recipies, setrecipies] = useState(true);
    const [favirt, setFavirt] = useState(false);
    const [loadertwo, setloadertwo] = useState(false)







    // console.log("Last Screen Dat--------->", route?.params);
    const [recoed, setrecoed] = useState([])
    const [pushrecord, setpushrecord] = useState([])
    const [lastscreendata, setlastscreendata] = useState(route?.params)
    const [favoriteList, setFavoriteList] = useState([]);
    const [favouritedata, setfavouritedata] = useState([])
    const [recipiedescriptionsingredients, setrecipiedescriptionsingredients] = useState('')
    const [ingredients, setingredients] = useState('')









    // const sharefunction = async () => {
    //     try {
    //         const result = await Share.share({
    //             message: "From The Fridge App,this portion is in working",
    //         });
    //         if (result.action === Share.sharedAction) {
    //             if (result.activityType) {
    //                 // shared with activity type of result.activityType
    //             } else {
    //                 // shared
    //             }
    //         } else if (result.action === Share.dismissedAction) {
    //             // dismissed
    //         }
    //     } catch (error) {
    //         alert(error.message);
    //     }
    // };

    const renderfunction = ({ item }) => {
        // console.log("___________________", item);
        return (
            <View>
                <View style={{ height: rh(17), width: rw(95), zIndex: 5, elevation: 5, marginTop: 5, backgroundColor: Colors.White, borderRadius: 10, flexDirection: 'row', marginTop: 10, marginBottom: rh(0.5) }
                }>
                    <View >
                        <Image source={{ uri: item.image }} style={Styles.renderimage} />
                    </View>
                    <View style={{ height: rh(17), width: rw(55), left: rw(2) }}>
                        <View style={{ height: rh(17), justifyContent: "center", }}>
                            <Text numberOfLines={1} style={{ fontSize: FontSize.font16, color: Colors.black, fontWeight: '700', width: rw(55) }}>{item.title}</Text>
                        </View>
                    </View>

                    <View style={{ left: rw(3), height: rh(17), alignItems: "center", justifyContent: "center" }}>
                        {/* <TouchableOpacity style={{ marginTop: rh(1) }}
                            onPress={() => (ifExists(item) ? onRemoveFavorite(item) : onFavorite(item))}
                        >
                            {ifExists(item) ?

                                <Fontisto size={22} color={Colors.purple} name={'favorite'} />

                                :
                                <Fontisto size={22} color={Colors.dark} name={'favorite'} />
                            }


                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={() => navigation.replace('RecipiesDescription', { item, ingredients }, enablesdata())}>
                            <ForwardSvg height={'25px'} width={'25px'} />
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        )
    }
    useEffect(() => {
        checkfevert()
        similaerrecipies()
    }, [isFocused]);
    const checkfevert = async () => {
        const emails = firebase.auth().currentUser.email;
        const recipieid = route?.params?.item.ID
        const uniq = emails + recipieid;
        // console.log("login person email ,id,uniquie", emails, recipieid, uniq);
        await firestore()
            .collection("Favourite")
            .doc(uniq)
            .get()
            .then((e) => {
                // console.log(14646, e.data());
                setFavirt(e.exists);
            });
    };
    const DoFavourite = () => {
        const emails = firebase.auth().currentUser.email;
        const uniq = emails + route?.params?.item?.ID;
        console.log("====================================");
        console.log(uniq);
        console.log("====================================");

        const userfavourites = firebaseobect.doc(uniq);
        userfavourites
            .set({
                firbaseid: uniq,
                image: route?.params?.item?.ingredients[0]?.image,
                title: route?.params?.item?.title,
                id: route?.params?.item?.ID,
                loginpersonid: loginpersonid,
                cookingtime: route?.params?.item?.ingredients[0]?.readyInMinutes,
                servingsize: route?.params?.item?.ingredients[0]?.servings,
                directions: route?.params?.item?.ingredients[0]?.instructions,
            })
            .then(() => {
                setFavirt(true);
                // console.log("Favourite");
            })
            .catch((error) => {
                alert(error);
                console.log("Error---->", error);
            });
    };

    const DoUnlike = () => {
        const emails = firebase.auth().currentUser.email;
        const uniq = emails + route?.params?.item?.ID;
        console.log("unique id for delete--->", uniq);
        firestore().collection("Favourite").doc(uniq).delete();
        setFavirt(false);
    };

    const enebledrealetsdat = () => {
        setrecipies(false);
    };

    const enablesdata = () => {
        setrecipies(true);
    };







    const getfavourite = async () => {
        setloader(true)
        const id = firebase.auth().currentUser.email
        // console.log("Login Person ID------->", id);
        firestore()
            .collection('Favourite').where('loginpersonid', '==', id)
            .onSnapshot(querySnapshot => {
                const favouritedata = [];
                querySnapshot.forEach(documentSnapshot => {
                    //    console.log("Favourites Record---->", documentSnapshot.data());
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
    // function to check if an item exists in the favorite list or not
    const ifExists = restaurant => {
        if (favoriteList.filter(item => item.ID === restaurant.ID).length > 0) {
            return true;
        }
        return false;
    };



    const similaerrecipies = async () => {

        console.log('====================================', route?.params?.ingredients);
        let ingredients1 = ''
        let firbaseList = []
        let islistf = []
        var releated

        let data = route?.params?.ingredients?.split(',')

        if (data.length == 1) {
            console.log(data.length);
            ingredients1 += data
        }
        else {
            for (let i = 0; i < data.length; i = i + 2) {
                if (i != data.length - 2) {
                    ingredients1 += data[i] + ','
                }
                else {
                    ingredients1 += data[i]
                }

            }


        }
        console.log("okokokokook", ingredients1);

        setingredients(ingredients1)
        setloadertwo(true)

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

        await fetch(`http://waqarulhaq.com/fromTheFridge/get-recipes.php?combinations=${ingredients1}`)
            .then(response => response.json())
            .then(response => {
                // console.log("yh response aa rha hay api sy ingredients ka", response);

                for (let index = 0; index < firbaseList.length; index++) {
                    for (let j = 0; j < response?.data?.length; j++) {
                        if (firbaseList[index].id === response?.data[j].ID)
                            islistf.push(response?.data[j])
                    }
                }
                //    console.log('111', islistf);
                setFavoriteList(islistf)
                setpushrecord(response.data)
            })
            .catch(err => console.error(err));
        recoed.push(pushrecord)
        setloadertwo(false)

    }





    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    height: rh(20),
                    backgroundColor: "#8B008B70",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {loader ? (
                    <ActivityLoader />
                ) : (
                    <Image
                        source={{ uri: route?.params?.item?.image }}
                        style={{ resizeMode: "stretch", height: rh(20), width: rw(30) }}
                    />
                )}
            </View>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: Colors.purple,
                    borderBottomColor: "#BC03BC",
                    height: rh(7.5),
                    alignItems: "center",
                    borderWidth: 1,
                    alignContent: "center",
                }}
            >
                <TouchableOpacity
                    style={{ left: rw(3) }}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={30} color={Colors.White} />
                </TouchableOpacity>
                <Text
                    style={{
                        color: Colors.White,
                        width: rw(60),
                        fontSize: FontSize.font19,
                        textAlign: "center",
                    }}
                    numberOfLines={2}
                >
                    {route?.params?.item?.title}
                </Text>
                <View
                    style={{
                        right: rw(3),
                        flexDirection: "row",
                        width: rw(13),
                        justifyContent: "space-between",
                    }}
                >
                    {favirt ? (
                        <TouchableOpacity onPress={() => DoUnlike()}>
                            <Fontisto size={20} name={'favorite'} color={Colors.White} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => DoFavourite()}>
                            <Fontisto size={20} name={'favorite'} color={Colors.dark} />
                        </TouchableOpacity>
                    )}

                    {/* <TouchableOpacity onPress={() => sharefunction()}>
                        <Shre height={"20px"} width={"18px"} />
                    </TouchableOpacity> */}
                </View>
            </View>

            {recipies ? (
                <View
                    style={{
                        height: rh(9),
                        backgroundColor: Colors.purple,
                        justifyContent: "center",
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            left: 5,
                            height: rh(5),
                            width: rw(30),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 20,
                            borderColor: Colors.White,
                            borderWidth: 1,
                        }}
                    >
                        <Text style={{ color: Colors.White }}>Recipe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => enebledrealetsdat()}
                        style={{
                            left: 5,
                            height: rh(5),
                            width: rw(30),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 20,
                        }}
                    >
                        <Text style={{ color: Colors.White }}>Related Recipe</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View
                    style={{
                        height: rh(9),

                        backgroundColor: Colors.purple,
                        justifyContent: "center",
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => enablesdata()}
                        style={{
                            height: rh(5),
                            width: rw(25),
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ color: Colors.White }}>Recipe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            left: 5,
                            height: rh(5),
                            width: rw(30),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 20,
                            borderColor: Colors.White,
                            borderWidth: 1,
                        }}
                    >
                        <Text style={{ color: Colors.White }}>Related Recipe</Text>
                    </TouchableOpacity>
                </View>
            )}

            {recipies ? (
                <View
                    style={{
                        marginHorizontal: rh(1),
                        borderWidth: 1,
                        borderColor: Colors.purple,
                        marginTop: rh(1),
                        flex: 1,
                    }}
                >
                    {loader ? (
                        <ActivityLoader />
                    ) : (
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View
                                style={{
                                    padding: 10,
                                    borderBottomWidth: 1,
                                    borderColor: Colors.purple,
                                }}
                            >
                                <Text
                                    style={{
                                        color: Colors.black,
                                        fontSize: FontSize.font18,
                                        fontWeight: "700",
                                    }}
                                >
                                    Details
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        width: rw(90),
                                        justifyContent: "space-around",
                                    }}
                                >
                                    <View style={{ flexDirection: "row" }}>
                                        <Text
                                            style={{
                                                fontWeight: "700",
                                                color: Colors.black,
                                                fontSize: FontSize.font16,
                                            }}
                                        >
                                            Cooking Time
                                        </Text>
                                        <Text
                                            style={{
                                                color: Colors.black,
                                                fontSize: FontSize.font16,
                                                left: rw(5),
                                            }}
                                        >
                                            {route?.params?.item?.ingredients[0]?.readyInMinutes}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text
                                            style={{
                                                fontWeight: "700",
                                                color: Colors.black,
                                                fontSize: FontSize.font16,
                                            }}
                                        >
                                            Serving Size
                                        </Text>

                                        {route?.params?.item?.ingredients[0]?.servings == "" ?

                                            <Text
                                                style={{
                                                    color: Colors.black,
                                                    fontSize: FontSize.font16,
                                                    left: rw(5),
                                                }}
                                            >
                                                N/A
                                            </Text>
                                            :
                                            <Text
                                                style={{
                                                    color: Colors.black,
                                                    fontSize: FontSize.font16,
                                                    left: rw(5),
                                                }}
                                            >
                                                {route?.params?.item?.ingredients[0]?.servings}
                                            </Text>
                                        }
                                    </View>
                                </View>
                            </View>








                            <View style={{ padding: 10, borderColor: Colors.purple }}>
                                <Text
                                    style={{
                                        color: Colors.black,
                                        fontSize: FontSize.font18,
                                        fontWeight: "700",
                                    }}
                                >
                                    Directions
                                </Text>

                                {route?.params?.item?.ingredients[0]?.instructions ?

                                    <Text style={{ color: Colors.black, width: rw(90) }}>

                                        {route?.params?.item?.ingredients[0]?.instructions}
                                    </Text>
                                    :
                                    <Text style={{ color: Colors.red, width: rw(90) }}>

                                        N/A
                                    </Text>
                                }
                            </View>
                        </ScrollView>
                    )}
                </View>
            ) : (
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <FlatList
                        data={pushrecord}
                        renderItem={renderfunction}
                        keyExtractor={(item) => item.ID}
                        // numColumns={2}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            alignSelf: "center",
                            paddingBottom: rh(2),
                        }}
                    // contentContainerStyle={{ flexDirection: 'row' }}
                    />
                </View>
            )}
        </SafeAreaView>


    );
}