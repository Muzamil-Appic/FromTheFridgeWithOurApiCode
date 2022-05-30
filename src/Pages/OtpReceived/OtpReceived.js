import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../../Global/Colors';
import FontSize from '../../Global/FontSizes';
import Styles from './OtpReceived.Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function OtpReceived({navigation}) {
  //States
  const [email, setEmail] = useState('');
  const [time, settime] = useState('00:50');
  return (
    <SafeAreaView style={Styles.Container}>
      <View style={Styles.headerstyle}>
        <View style={{position: 'absolute', top: hp(3), left: wp(5)}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={Colors.purple}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: hp(5),
            width: wp(55),
            top: hp(1),
          }}>
          <Text style={Styles.forgotpasswordtext}>Forgot Password</Text>
        </View>
      </View>

      <View
        style={{
          marginVertical: hp(12),
          height: hp(10),
          
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: FontSize.font22,
            fontWeight: '700',
            color: Colors.black,
            textAlign: 'center',
          }}>
          OTP Verification
        </Text>
        <Text
          style={{
            fontSize: FontSize.fon15,
            fontWeight: '400',
            color: Colors.black,
            textAlign: 'center',
            left:5
          }}>
          Verification code will be sent to {'\n'}
          your email or mobile number
        </Text>
      </View>
      <View style={{bottom:hp(4)}}>
      <View style={Styles.textbox}>
          <TextInput
            style={Styles.textboxstyle}
            maxLength={1}
            keyboardType="numeric"
          />
          <TextInput
            style={Styles.textboxstyle}
            maxLength={1}
            keyboardType="numeric"
          />
          <TextInput
            style={Styles.textboxstyle}
            maxLength={1}
            keyboardType="numeric"
          />
          <TextInput
            style={Styles.textboxstyle}
            maxLength={1}
            keyboardType="numeric"
          />
        </View>
        </View>
        <View>
        <TouchableOpacity style={Styles.submit}>
          <Text style={Styles.submitText}>Submit</Text>
        </TouchableOpacity>
        </View>
        <View style={Styles.couldnotsendview}>
          <Text style={{fontSize: 12, color: Colors.dark}}>
            Code Send.Resend code in
          </Text>
          <Text style={Styles.timertext}>{time}</Text>
        </View>
      
    </SafeAreaView>
  );
}
