import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../Global/Colors';
import FontSize from '../../Global/FontSizes';
import Styles from './ForgotPassword.Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

//firebase
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'



export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [validateemail, setvalidateemail] = useState(false)




  const forgotpass = () => {
    if (email === '') {
      setvalidateemail(true)
      return;
    }

    auth()
        .sendPasswordResetEmail(email.trim().toLowerCase())
      .then(function () {
        console.log("Succed");
        alert("Your Password is send to your email")
        setEmail('')
        navigation.navigate('Signin')
      })
      .catch(function (error) {
        // alert(error)
        if(error.code==='auth/user-not-found')
        {
          alert("Email is not valid")
        }
        alert("Email is not valid")
      });
  }




  return (
   <SafeAreaView style={{flex:1}}>
      <View style={{ position: 'absolute', top: hp(5), left: wp(5) }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-outline"
            size={25}
            color={Colors.purple}
          />
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: 'center', top: hp(10) }}>
        <Text
          style={Styles.forgotpasswordtext}>
          FORGOT PASSWORD
        </Text>
        <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
          <Text
            style={Styles.twolinetext}>
            Please enter your emil address, and we will generate a new password
            for you and send it straight to your inbox
          </Text>
        </View>
        <View
          style={Styles.txtinptview}>
          <TextInput
            onChangeText={e => { setEmail(e), setvalidateemail(false) }}
            style={Styles.textinputstyle}
            placeholder={'Email'}
            placeholderTextColor={Colors.dark}
            value={email}
          />

          {validateemail ?
            <Text style={{ fontSize: FontSize.font13, color: Colors.red }}>  Email Require!
            </Text>
            :
            null
          }
          <TouchableOpacity onPress={() => forgotpass()}
            style={Styles.loginbutton}
          // onPress={() => navigation.navigate('OtpReceived')}

          >
            <Text style={Styles.logintext}>SEND</Text>
          </TouchableOpacity>
        </View>
      </View>
      </SafeAreaView>
  );
}
