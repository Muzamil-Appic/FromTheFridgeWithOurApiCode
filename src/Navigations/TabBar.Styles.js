import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
//Navigations
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    heightPercentageToDP,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { useIsFocused } from '@react-navigation/native';
import Colors from '../Global/Colors';
import FontSize from '../Global/FontSizes';



const styles = StyleSheet.create({

    vwwithfocued: { height: rw(20), width: rw(20), backgroundColor: Colors.purple, bottom: rh(3), justifyContent: "center", alignItems: "center", borderRadius: 100 },
    vwwithoutfocused: { bottom: rh(1), justifyContent: "center", alignContent: "center", alignSelf: 'center', height: rw(20), width: rw(20) },
    txtwithoutfocused:{ color: Colors.dark, textAlign: "center" },
    txtwithfocued:{ color: Colors.White },


})

export default styles