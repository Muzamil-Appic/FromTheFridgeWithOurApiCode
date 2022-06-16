import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Modal, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { appleAuth } from '@invertase/react-native-apple-authentication';

//  import { AppleAuthRequestOperation ,appleAuth} from '@invertase/react-native-apple-authentication';
import AppleIcon from '../../Assets/Icons/AppleIcon.svg'
//Global
import Styles from './Signin.Styles';
import Colors from '../../Global/Colors';
import FontSize from '../../Global/FontSizes';
import ActivityLoader from '../../Components/ActivityLoader'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk-next';

GoogleSignin.configure({
  webClientId: '324447483484-7g1ue1gd2eeqb6te3e57sqied9edc33k.apps.googleusercontent.com',
  offlineAccess: true
});

//firebase
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


//SVG
import FaceBook from '../../Assets/Icons/FaceBook.svg';
import Google from '../../Assets/Icons/Google';
import Linesvg from '../../Assets/Icons/Linesvg';
export default function Signin({ navigation }) {
  //states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setloader] = useState(false)
  const [userdata, setuserdata] = useState([])


  //validates staes
  const [validateemail, setvalidateemail] = useState(false)
  const [validatepassword, setvalidatepassword] = useState(false)
  const [googleloader, setgoogleloader] = useState(false)
  const [appleloader, setappleloader] = useState(false)
  const firestore_ref = firestore().collection('Users')


  const empty = () => {
    setEmail('')
    setPassword('')
  }



  useEffect(() => {
    asun()
  }, [])


  const asun = async () => {
    await AsyncStorage.getItem('userdetails').then(async value => {
      let data = JSON.parse(value);
      let useremail = data?.id
      console.log("user login hay", useremail);
      if (useremail) {
        navigation.replace('TabNavigations')
      }
      else {
        console.log("user login nhi hay");
        navigation.navigate('Signin')
      }

    })


  }


  //   const onFacebookButtonPress=async()=>{
  //     console.log('====================================');
  //     console.log("ok");
  //     console.log('====================================');
  //        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  // console.log(result);

  //   }

  const loginWithfacebookHandler = async () => {
    // if(LoginManager.getInstance()!=null){
    // LoginManager.getInstance().logOut();
    // }
    // console.log(LoginManager.getI)
    // await Clear('user');
    // await Clear('bio');
    // LoginManager.logOut();
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {

          console.log('Login cancelled');
        } else {
          console.log('Login success with permissions: ' + result);
          console.log("Its results", result);
          AccessToken.getCurrentAccessToken().then(async data => {
            const processRequest = new GraphRequest(
              '/me?fields=name,email,picture.type(large)',
              null,
              await getResponseInfo,
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(processRequest).start();

            const { accessToken } = data;
            const facebookCredential =
              auth.FacebookAuthProvider.credential(accessToken);


            // Sign-in the user with the credential
            // console.log(facebookCredential);
            await auth()
              .signInWithCredential(facebookCredential)
              .then(e => {
                console.log(e);
              });

            // initUser(accessToken);
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
        // showMessage({
        //   type: 'info',
        //   message: 'Login failed.Please try again',
        // });
      },
    );
  };



  async function onAppleButtonPress() {
    // Start the sign-in request
    console.log("Step 1---->");
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }
    console.log("Step 2---->");
    //  Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
    console.log('====================================');
    console.log(appleCredential);
    console.log('====================================');
    //  Sign the user in with the credential
    await auth().signInWithCredential(appleCredential)
      .then((loggeduser) => {
        console.log("Step 3---->");
        console.log('====================================');
        console.log("----->", loggeduser.additionalUserInfo);
        console.log('====================================');
        console.log("Step 4---->");
        console.log('====================================');
        console.log("----->", loggeduser.user);
        console.log('====================================');
        const userdata = firestore_ref.doc(loggeduser.user.email)
        userdata.set({
          email: loggeduser.user.email,
          id: loggeduser.user.email,
          name: '',
          phonenumber: '',
          country: '',
          city: '',
          address: '',
        }, { merge: true }).then(
          AsyncStorage.setItem(
            'userdetails',
            JSON.stringify({
              email: loggeduser.user.email,
              id: loggeduser.user.email,
            })
          )
        )

      }).then(() => {
        navigation.replace('TabNavigations')
      })
      .catch((error) => {
        alert(error)
        console.log("Error---->", error);
      })


  }



  // const loginWithApple = async () => {
  //   // Start the sign-in request
  //   try {
  //     console.log('TRY');
  //     const appleAuthRequestResponse = await appleAuth.performRequest({
  //       requestedOperation: AppleAuthRequestOperation.LOGIN,
  //       requestedScopes: [
  //         AppleAuthRequestScope.EMAIL,
  //         AppleAuthRequestScope.FULL_NAME,
  //       ],
  //     });

  //     console.log('CHECK TOKEN');
  //     // Ensure Apple returned a user identityToken
  //     if (!appleAuthRequestResponse.identityToken) {
  //       throw 'Apple Sign-In failed - no identify token returned';
  //     }

  //     // Create a Firebase credential from the response
  //     const {
  //       nonce,
  //       identityToken,
  //     } = appleAuthRequestResponse;

  //     if (identityToken) {
  //       console.log(nonce, identityToken);

  //       // Sign the user in with the credential
  //       const appleCredential = auth.AppleAuthProvider.credential(
  //         identityToken,
  //         nonce,
  //       );
  //       auth()
  //         .signInWithCredential(appleCredential)
  //         .then((response) => console.log('loginWithApple', response))
  //         .catch((error) => console.log('222222', error));
  //       console.warn(
  //         `Firebase authenticated via Apple, UID: ${userCredential.user.uid}`,
  //       );
  //     } else {
  //       console.log('loginWithApple no token - failed sign-in');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  const getResponseInfo = async (error, result) => {
    if (error) {
      //Alert for the Error
      alert('Error fetching data: ' + error.toString());
    } else {
      //response alert
      // console.log(JSON.stringify(result));


      console.log("yh results hay", result)


      const userdata = firestore_ref.doc(result.email)
      userdata.set({
        email: result.email,
        id: result.email,
        name: result.name,
        // phonenumber: '',
        // country: '',
        // city: '',
        // address: '',
      }, { merge: true }).then(
        AsyncStorage.setItem(
          'userdetails',
          JSON.stringify({
            email: result.email,
            id: result.name,
          })
        )
      )

        .then(() => {
          empty();
          navigation.replace('TabNavigations')

        })
        .catch((error) => {

          alert(error)
          console.log("Error---->", error);
        })
    }
  };



  async function onGoogleButtonPress() {
    console.log("Step 1");
    setgoogleloader(true)
    console.log("Step 2");
    await GoogleSignin.hasPlayServices();
    console.log("Step 3");
    const userinfo = await GoogleSignin.signIn();
    console.log("Step 4");
    // console.log("------->user infooooo909090", userinfo)
    const googleCredential = auth.GoogleAuthProvider.credential(userinfo.idToken);
    //  console.log("googlecredential9090909", googleCredential)
    const loggeduser = auth().signInWithCredential(googleCredential)
      ///   console.log(userinfo)
      // Sign-in the user with the credential
      .then((loggeduser) => {
        console.log(loggeduser);
        console.log("io909090", loggeduser);
        console.log("io909090", loggeduser.user.email);
        //   console.log(loggeduser.additionalUserInfo.profile.given_name);
        const userdata = firestore_ref.doc(loggeduser.user.email)
        userdata.set({
          email: loggeduser.user.email,
          id: loggeduser.user.email,
          name: loggeduser.additionalUserInfo.profile.given_name,
          // phonenumber: '',
          // country: '',
          // city: '',
          // address: '',
        }, { merge: true }).then(
          AsyncStorage.setItem(
            'userdetails',
            JSON.stringify({
              email: loggeduser.user.email,
              id: loggeduser.user.email,
            })
          )
        )

      }).then(() => {
        empty();
        navigation.replace('TabNavigations')
        setgoogleloader(false)
      })
      .catch((error) => {
        setgoogleloader(false)
        alert(error)
        //     console.log("Error---->", error);
      })
  }






  async function LoginUser() {
    if (email === '') {
      setvalidateemail(true)
      return;
    }
    if (password === '') {
      setvalidatepassword(true)
      return;
    }
    setloader(true)
    await firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then((user) => {
        console.log("user login information----->", user.user.email)
        AsyncStorage.setItem(
          'userdetails',
          JSON.stringify({
            email: user.user.email,
            id: user.user.email,
          })
        )
        empty()
        setloader(false)
        navigation.replace('TabNavigations')
        console.log("DONE dona DOne");
      }
      )
      .catch((error) => {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        setEmail('')
        setPassword('')
        setloader(false)
        alert(error.code)
      })



  }



  async function onFacebookButtonPress() {
    // Attempt login with permissions
    console.log("Ok");
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    console.log('1====================================');
    console.log(result);
    console.log('1====================================');
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    //   // Once signed in, get the users AccesToken
    //   const data = await AccessToken.getCurrentAccessToken();


    //   if (!data) {
    //     throw 'Something went wrong obtaining access token';
    //   }

    //   // Create a Firebase credential with the AccessToken
    //   const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    //   // Sign-in the user with the credential
    //  return auth().signInWithCredential(facebookCredential);
  }

  return (
    <SafeAreaView style={Styles.Container}>
      <View style={Styles.aptext}>
        <Text style={Styles.fromtheFridgetext}>FromTheFridge</Text>
        <Text style={Styles.whatinfridge}>What’s in your fridge?</Text>
      </View>
      <View style={Styles.textviewstyle}>
        <TextInput
          onChangeText={e => { setEmail(e), setvalidateemail(false) }}
          style={Styles.textinputstyle}
          placeholder={'Email'}
          placeholderTextColor={Colors.dark}
          value={email}
          keyboardType='email-address'
        />
        {validateemail ?
          <Text style={{ fontSize: FontSize.font13, color: Colors.red }}>  email Require!
          </Text>
          :
          null
        }
        <TextInput
          onChangeText={e => { setPassword(e), setvalidatepassword(false) }}
          style={Styles.textinputstyle}
          placeholder={'Password'}
          placeholderTextColor={Colors.dark}
          value={password}
          secureTextEntry={true}
        />

        {validatepassword ?
          <Text style={{ fontSize: FontSize.font13, color: Colors.red, justifyContent: 'flex-start', textAlign: "left" }}>  Password Require!
          </Text>
          :
          null
        }

        <TouchableOpacity
          onPress={() => LoginUser()}
          style={Styles.loginbutton}

        >

          {loader ?
            <ActivityIndicator size={'small'} color={Colors.White} style={{ justifyContent: "center", alignSelf: "center", flex: 1, alignContent: "center" }} />
            :
            <Text style={Styles.logintext}>GET STARTED</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={{ color: '#8B008BB0', fontSize: 21 }}>
            Forgot Password
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: hp(5),
          width: wp(45),
          marginVertical: hp(9.5),
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <Linesvg height={'24px'} width={'30px'} />
        <Text style={{ color: '#606060', fontSize: FontSize.font13 }}>
          Or login With
        </Text>
        <Linesvg height={'24px'} width={'30px'} />
      </View>
      {Platform.OS === 'ios' && Platform.Version >= 13 ?
        <View style={[Styles.svgmainstyle]}>
          {/* <TouchableOpacity
            onPress={() => loginWithfacebookHandler()}

            style={Styles.svgstyle}>
            <FaceBook height={'24px'} width={'24px'} />
            <Text style={Styles.fbgoogletext}>Facebook</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => onAppleButtonPress()}

            style={Styles.svgstyle}>
            <AppleIcon height={'24px'} width={'24px'} />
            <Text style={Styles.fbgoogletext}>Apple</Text>
          </TouchableOpacity>
          {googleloader ?
            <ActivityLoader />
            :
            <TouchableOpacity style={Styles.svgstyle}
              onPress={() => onGoogleButtonPress()}
            >
              <Google height={'24px'} width={'24px'} />
              <Text style={Styles.fbgoogletext}>Google</Text>
            </TouchableOpacity>
          }
        </View>

        :
        <View style={[Styles.svgmainstyle]}>
          {/* <TouchableOpacity
            onPress={() => loginWithfacebookHandler()}

            style={Styles.svgstyle}>
            <FaceBook height={'24px'} width={'24px'} />
            <Text style={Styles.fbgoogletext}>Facebook</Text>
          </TouchableOpacity> */}
          {googleloader ?
            <ActivityLoader />
            :
            <TouchableOpacity style={Styles.svgstyle}
              onPress={() => onGoogleButtonPress()}
            >
              <Google height={'24px'} width={'24px'} />
              <Text style={Styles.fbgoogletext}>Google</Text>
            </TouchableOpacity>
          }
        </View>
      }

      {/* <TouchableOpacity style={Styles.svgstyle}
        onPress={() => onGoogleButtonPress()}
      >
        <Google height={'24px'} width={'24px'} />
        <Text style={Styles.fbgoogletext}>Google</Text>
      </TouchableOpacity> */}

      <View style={{ height: hp(10), top: hp(8), left: wp(5) }}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{ color: Colors.purple, fontSize: FontSize.font22 }}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>





      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={googleloader}
        onRequestClose={() => {
          setgoogleloader(!googleloader);
        }}>
        <View style={{ flex: 1, justifyContent: "center",  }}>
          <ActivityLoader />
        </View>
      </Modal> */}




    </SafeAreaView>
  );
}