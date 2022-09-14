import { View, Text, TextInput, TouchableOpacity, Image, Dimensions, FlatList, ScrollView, Modal, SnapshotViewIOSBase, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions'
import Colors from '../../Global/Colors';
import FontSize from '../../Global/FontSizes';
import Styles from './Profile.Styles';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MarkSvg from '../../Assets/Icons/MarkSvg.svg'
import ForwardSvg from '../../Assets/Icons/ForwardSvg.svg'
import Savesvg from '../../Assets/Icons/Savesvg.svg'
import Lock from '../../Assets/Icons/Lock.svg'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import ActivityLoader from '../../Components/ActivityLoader';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo'
import { useIsFocused } from '@react-navigation/native';

export default function Profile({ navigation }) {
    const isfocused = useIsFocused();
    var uses = auth().currentUser;

    const getuserrecord = () => {
        setloader(true)
        let user = firebase.auth().currentUser.email

        //let user = "muzamilappic@gmail.com"
        //firebase.auth().currentUser.email
        firestore()
            .collection('Users')
            .doc(user)
            .onSnapshot(documentSnapshot => {
                //  console.log('User data: ', documentSnapshot.data());
                var value = documentSnapshot.data()
                //   setrecord(documentSnapshot.data())
                setemail(value?.email)
                setaddress(value?.address)
                setcity(value?.city)
                setcountry(value?.country)
                setname(value?.name)
                setphone(value?.phonenumber)
                setloader(false)
            });
    }





    const empty = () => {
        setpassword('')
        setcurrentpassword('')
        setcurrentpassword('')
        setModalVisible(false)
    }


    const reauthenticate = (old) => {
        var cred = auth.EmailAuthProvider.credential(uses.email, old);
        return uses.reauthenticateWithCredential(cred);

    }


    const ChangePass = async () => {


        if (password === '') {
            alert("Please Enter Current Password ")
            return;

        }


        if (confirmpassword !== password) {
            alert("Please Enter same password")
            return;

        }
        setloadertwo(true)
        reauthenticate(currentpassword).then(() => {
            if (currentpassword != '' && password != '' && confirmpassword != '') {


                uses.updatePassword(password).then(function () {

                    Alert.alert(
                        'Alert',
                        'Password is changed',
                        [
                            { text: 'OK', onPress: () => setModalVisible(false) }
                        ],
                        { cancelable: false }
                    );
                }).catch((erro) => {
                    Alert.alert(erro.message);
                });


            }
            setloadertwo(false)
        }).catch((error1) => {
            Alert.alert('Old Password is wrong');
            setloadertwo(false)
        });


    }



    // const updatepassword = () => {
    //     if (currentpassword === '') {
    //         alert("Plz enter pasword first")
    //         return;
    //     }

    //     if (confirmpassword !== password) {
    //         alert("Eter same password")
    //         return;
    //     }

    //     var user = firebase.auth().currentUser

    //     //   var newPassword = getASecureRandomPassword();
    //     user.updatePassword(password).then(function () {
    //         console.log("Updated password");
    //         empty();
    //     }).catch(function (error) {
    //         console.log(error);
    //     });







    // }



    const updateuserrecord = () => {
        var userid = firebase.auth().currentUser.email
        firestore()
            .collection('Users')
            .doc(userid)
            .update({
                name: name,
                phonenumber: phone,
                country: country,
                city: city,
                address: address,
            })
            .then(() => {
                getuserrecord()
                console.log('User updated!');
            });
    }



    useEffect(() => {
        getuserrecord()

    }, [isfocused])



    const signoutfunction = () => {
        firebase.auth().signOut()
        navigation.replace('Signin')
        AsyncStorage.clear()
        console.log("Logout DOne");

    }



    const [modalVisible, setModalVisible] = useState(false);
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [phone, setphone] = useState('')
    const [country, setcountry] = useState('')
    const [statesprovince, setstatesprovince] = useState('')
    const [city, setcity] = useState('')
    const [address, setaddress] = useState('')
    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [currentpassword, setcurrentpassword] = useState('')
    const [id, setid] = useState('')
    const [record, setrecord] = useState('')
    const [loader, setloader] = useState(false)
    const [loadertwo, setloadertwo] = useState(false)

    const siz = Dimensions.get('window').height

    return (
        <SafeAreaView style={Styles.Container}>

            <View style={Styles.headerinnerview}>
                <TouchableOpacity style={{ marginLeft: rw(5) }} onPress={() => signoutfunction()}>
                    <Text style={{ color: Colors.White, fontSize: siz * 0.02, fontWeight: '700' }}>Log Out</Text>
                </TouchableOpacity>
                <Text style={Styles.headertext}>PROFILE</Text>
                <TouchableOpacity style={{ marginRight: rw(5) }} onPress={() => updateuserrecord()}>
                    <Savesvg height={siz * 0.03} width={siz * 0.03} />
                </TouchableOpacity>

            </View>

            {loader ?
                <ActivityLoader />
                :



                <View style={{ flex: 1, marginTop: rh(2), marginBottom: rh(10.5) }}>

                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={Styles.topvw}>
                            <TextInput placeholder='Name' value={name} onChangeText={value => setname(value)} style={Styles.txtinptmailname} placeholderTextColor={Colors.dark} />
                            <View style={{ height: rh(7), width: rw(80), borderRadius: 40, backgroundColor: Colors.txtinptcolor,justifyContent:'center'}}>
                                <Text style={{ fontSize: FontSize.font17,  color: Colors.black,paddingLeft:rw(7) }} numberOfLines={1} > {email}</Text>
                            </View>
                            <TouchableOpacity style={Styles.chngpasbtn}
                                onPress={() => setModalVisible(true)}
                            >
                                <View style={{ right: rw(3) }}>
                                    <Lock heaight={'22px'} width={'18px'} />
                                </View>
                                <Text style={Styles.chngpastext}>Change Password</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginHorizontal: rw(5), marginTop: rh(2), height: '56%', justifyContent: 'space-evenly' }}>
                            <View style={Styles.bottomtxtinptvw}>
                                <Text style={Styles.bottomtxt}>PHONE</Text>
                                <TextInput style={Styles.txtdatainpit} value={phone} onChangeText={value => setphone(value)} />
                            </View>
                            <View style={Styles.bottomtxtinptvw}>
                                <Text style={Styles.bottomtxt}>COUNTRY</Text>
                                <TextInput style={Styles.txtdatainpit} value={country} onChangeText={value => setcountry(value)} />
                            </View>
                            {/* <View style={Styles.bottomtxtinptvw}>
                                <Text style={Styles.bottomtxt}>STATE/PROVINCE</Text>
                                <TextInput style={Styles.txtdatainpit} value={statesprovince} onChangeText={value => setstatesprovince(value)} />
                            </View> */}
                            <View style={Styles.bottomtxtinptvw}>
                                <Text style={Styles.bottomtxt}>CITY</Text>
                                <TextInput style={Styles.txtdatainpit} value={city} onChangeText={value => setcity(value)} />
                            </View>
                            <View style={Styles.bottomtxtinptvw}>
                                <Text style={Styles.bottomtxt}>ADDRESS</Text>
                                <TextInput style={Styles.txtdatainpit} value={address} onChangeText={value => setaddress(value)} />
                            </View>


                        </View>


                    </ScrollView>

                </View>

            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View
                    style={{
                        height: rh(46),
                        width: rw(90),
                        backgroundColor: Colors.White,
                        alignSelf: 'center',
                        borderRadius: 17,
                        marginTop: rh(20)

                    }}>
                    <View style={{ height: rw(5), width: rw(5), justifyContent: 'flex-end', alignContent: "flex-end", alignItems: "flex-end", margin: rw(2) }}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Entypo name='cross' size={25} color={Colors.purple} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{ fontSize: FontSize.font20, textAlign: "center", color: Colors.black, marginVertical: rh(3), fontWeight: '700' }}>Change Password</Text>
                    </View>
                    <View style={{ height: rh(33), justifyContent: "space-around" }}>
                        <TextInput placeholder='Current Password' style={Styles.modalvw} onChangeText={value => setcurrentpassword(value)} />
                        <TextInput placeholder='New Password' style={Styles.modalvw} onChangeText={value => setpassword(value)} />
                        <TextInput placeholder='Confirm Password' style={Styles.modalvw} onChangeText={value => setconfirmpassword(value)} />
                        <View >
                            <TouchableOpacity style={{ height: rh(7), width: rw(76), borderRadius: 8, justifyContent: 'center', alignSelf: 'center', backgroundColor: Colors.purple }}
                                onPress={() => ChangePass()}
                            >
                                {loadertwo ?
                                    <ActivityIndicator size={'large'} color={Colors.White} />
                                    :
                                    <Text style={{ textAlign: 'center', fontSize: siz * 0.02, color: Colors.White }}>CHANGE PASSWORD</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </Modal>


        </SafeAreaView>
    )
}