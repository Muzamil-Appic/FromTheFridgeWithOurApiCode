import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashLogo from '../../Assets/Icons/SplashLogo.svg'

import Appicon from '../../Assets/Icons/AppIcon.svg'
export default function Splash({ navigation }) {


  // timeout Function FOr replace page
  // setTimeout(() => {
  //   navigation.replace('Signin')
  // }, 3000);

  useEffect(() => {
    asun()
  }, [])


  // useEffect(() => {
  //   //  asun()
  //   navigation.replace('Home')
  //   }, [])


  const asun = async () => {
    await AsyncStorage.getItem('userdetails').then(async value => {
      let data = JSON.parse(value);
      let useremail = data?.id
      console.log("------00000>", useremail);
      if (useremail) {
        navigation.replace('TabNavigations')
      }
      else {
        setTimeout(() => {
          navigation.replace('Signin')
        }, 3000);
      }

    })


  }

  return (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
      <SplashLogo height={'150px'} width={'150px'} />
    </View>
  )
}


