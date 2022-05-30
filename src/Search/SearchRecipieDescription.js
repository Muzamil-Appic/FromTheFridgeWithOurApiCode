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
import Colors from "../Global/Colors";
import FontSize from "../Global/FontSizes";
import Ionicons from "react-native-vector-icons/Ionicons";
import MarkSvg from "../Assets/Icons/MarkSvg.svg";
import ForwardSvg from "../Assets/Icons/ForwardSvg.svg";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Favor from "../Assets/Icons/Favor";
import Shre from "../Assets/Icons/Shre.svg";
import HTMLView from "react-native-htmlview";
import ActivityLoader from "../Components/ActivityLoader";
import firestore, { firebase } from "@react-native-firebase/firestore";
import Fontisto from 'react-native-vector-icons/Fontisto'
export default function SearchRecipieDescription({ navigation, route }) {
    const loginpersonid = firebase.auth().currentUser.email;
    const firebaseobect = firestore().collection("Favourite");
    const isFocused = useIsFocused();
    const siz = Dimensions.get("window").height;
    const id = route?.params?.Id;
    const img = route?.params?.image;
    const titles = route?.params?.title;
    const instructions = ""

    const [data, setDaat] = useState([]);
    const [splitin, setspliting] = useState("");
    const [loader, setloader] = useState(false);
    const [recipies, setrecipies] = useState(true);
    const [favirt, setFavirt] = useState(false);
    const [similier, setsimilier] = useState([]);


    console.log('====================================');
    console.log("eho mall", route?.params);
    console.log('====================================');


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
        console.log(item);
        return (
            <View>
                <View
                    style={{
                        elevation: 2,
                        backgroundColor: Colors.White,
                        width: rw(96),
                        height: rh(6),
                        borderRadius: 10,
                        flexDirection: "row",
                        marginTop: rh(2),
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={{
                            width: rw(70),
                            fontSize: FontSize.fon15,
                            color: Colors.black,
                            fontWeight: "700",
                            paddingLeft: rw(2),
                        }}
                        numberOfLines={1}
                    >
                        {item.title}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.replace("RecipiesDescription", item)}
                        style={{ paddingRight: rw(2) }}
                    >
                        <ForwardSvg height={"25px"} width={"25px"} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    useEffect(() => {
        // ApiResponse();
        //  similerrecipies();
        //  getrecipieingredients();
        checkfevert()

    }, [isFocused]);

    // const ApiResponse = async () => {
    //     setloader(true);
    //     console.log("Ok1");
    //     const options = {
    //         method: "GET",
    //         headers: {
    //             'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    //             'X-RapidAPI-Key': '2a55cd47d7mshefc4a9a1db6f882p146bd9jsn30b24c0e1ef9'
    //         }
    //     };
    //     await fetch(
    //         `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
    //         options
    //     )
    //         .then((response) => response.json())
    //         .then((response) => {
    //               console.log("recippppppppp",response);
    //             setDaat(response);
    //         })
    //         .catch((err) => console.error(err));
    //     // .then(response => console.log("Singel Recipe response",response))

    //     setloader(false);
    //     checkfevert();
    // };

    const checkfevert = async () => {
        const emails = firebase.auth().currentUser.email;
        const recipieid = route?.params?.ID
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
        const uniq = emails + route?.params?.ID;
        const userfavourites = firebaseobect.doc(uniq);
        {
            route?.params?.ingredients[0] == "" ?






            userfavourites
            .set({
                firbaseid: uniq,
                image: route?.params?.image,
                title: route?.params?.title,
                id: route?.params?.ID,
                loginpersonid: loginpersonid,
                cookingtime: "",
                servingsize: "",
                directions: "",
            })
            .then(() => {
                setFavirt(true);
                // console.log("Favourite");
            })
            .catch((error) => {
                alert(error);
                console.log("Error---->", error);
            })
          
            :
            userfavourites
                .set({
                    firbaseid: uniq,
                    image: route?.params?.image,
                    title: route?.params?.title,
                    id: route?.params?.ID,
                    loginpersonid: loginpersonid,
                    cookingtime: route?.params?.ingredients[0]?.readyInMinutes,
                    servingsize: route?.params?.ingredients[0]?.servings,
                    directions: route?.params?.ingredients[0]?.instructions,
                })
                .then(() => {
                    setFavirt(true);
                    console.log("Favourite");
                })
                .catch((error) => {
                    alert(error);
                    console.log("Error---->", error);
                })
        }
        // const userfavourites = firebaseobect.doc(uniq); 
        // userfavourites
        //     .set({
        //         firbaseid: uniq,
        //          image: route?.params?.image,
        //          title: route?.params?.title,
        //          id: route?.params?.ID,
        //         loginpersonid: loginpersonid,
        //         cookingtime: route?.params?.ingredients[0]?.readyInMinutes,
        //         servingsize: route?.params?.ingredients[0]?.servings,
        //         directions: route?.params?.ingredients[0]?.instructions,
        //     })
        //     .then(() => {
        //         setFavirt(true);
        //         // console.log("Favourite");
        //     })
        //     .catch((error) => {
        //         alert(error);
        //         console.log("Error---->", error);
        //     });





    };
    const DoUnlike = () => {
        const emails = firebase.auth().currentUser.email;
        const uniq = emails + route?.params?.ID;
        console.log("unique id for delete--->", uniq);
        firestore().collection("Favourite").doc(uniq).delete();
        setFavirt(false);
    };
    // const similerrecipies = () => {
    //     const options = {
    //         method: "GET",
    //         headers: {
    //             'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    //             'X-RapidAPI-Key': '2a55cd47d7mshefc4a9a1db6f882p146bd9jsn30b24c0e1ef9'
    //         }
    //     };
    //     fetch(
    //         `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/similar`,
    //         options
    //     )
    //         .then((response) => response.json())
    //         .then((response) => {
    //             //     console.log("similer Recipies----->", response);
    //             setsimilier(response);
    //         })
    //         .catch((err) => console.error(err));
    //     // .then(response => console.log("Singel Recipe response",response))
    // };



    const enebledrealetsdat = () => {
        setrecipies(false);
    };

    const enablesdata = () => {
        setrecipies(true);
    };

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
                        source={{ uri: route?.params?.image }}
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
                    height: rh(8),
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
                    {route?.params?.title}
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

            {/* {recipies ? (
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
            )} */}

            {recipies ? (
                <View
                    style={{
                        marginHorizontal: rh(1),
                        borderWidth: 1,
                        borderColor: Colors.purple,
                        //  marginTop: rh(1),
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
                                            {route?.params?.ingredients[0]?.readyInMinutes}
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
                                        <Text
                                            style={{
                                                color: Colors.black,
                                                fontSize: FontSize.font16,
                                                left: rw(5),
                                            }}
                                        >
                                            {route?.params?.ingredients[0]?.servings}
                                        </Text>
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


                                {route?.params?.ingredients[0]?.instructions == "" ?
                                    <Text style={{ color: Colors.red, width: rw(90) }}>
                                        N/A
                                    </Text>
                                    :
                                    <Text style={{ color: Colors.black, width: rw(90) }}>

                                        {route?.params?.ingredients[0]?.instructions}
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
                        data={similier}
                        renderItem={renderfunction}
                        keyExtractor={(item) => item.id}
                        // numColumns={2}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            alignSelf: "center",
                            paddingBottom: rh(4),
                        }}
                    // contentContainerStyle={{ flexDirection: 'row' }}
                    />
                </View>
            )}
        </SafeAreaView>
    );
}