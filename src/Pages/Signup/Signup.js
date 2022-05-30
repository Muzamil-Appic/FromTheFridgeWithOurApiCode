import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  ActivityIndicator
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



//firebase
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


//GLobal Styling
import Styles from './Signup.Styles';
import Colors from '../../Global/Colors';
import FontSize from '../../Global/FontSizes';

//Vector Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
//SVG
import Warn from '../../Assets/Icons/Warn.svg';
export default function Signup({ navigation }) {
  const [firstName, setfirstName] = useState('');
  const [sureName, setsureName] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [mobile, setmobile] = useState('');
  const [country, setcountry] = useState('Country');
  const [city, setcity] = useState('');
  const [address, setaddress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(true);
  const [loader, setloader] = useState(false)


  //validations
  const [validatefirstname, setvalidatefirstname] = useState(false)
  const [validatesurename, setvalidatesurename] = useState(false)
  const [validateemail, setvalidateemail] = useState(false)
  const [validatepassword, setvalidatepassword] = useState(false)
  const [validaeconfirmpassword, setvalidaeconfirmpassword] = useState(false)
  const [validatemobile, setvalidatemobile] = useState(false)
  const [validatecountry, setvalidatecountry] = useState(false)
  const [validatecity, setvalidatecity] = useState(false)
  const [validateaddress, setvalidateaddress] = useState(false)

  const Countries = [
    {
      id: '0',
      countryname: 'country',
    },
    {
      id: '1',
      countryname: 'America',
    },

    {
      id: '2',
      countryname: 'China',
    },
    {
      id: '3',
      countryname: 'Pakistan',
    },
    {
      id: '4',
      countryname: 'Japan',
    },
    {
      id: '5',
      countryname: 'Brazil',
    },
    {
      id: '6',
      countryname: 'Vitnam',
    },
    {
      id: '7',
      countryname: 'England',
    },
    {
      id: '8',
      countryname: 'UEA',
    },
    {
      id: '9',
      countryname: 'Russia',
    },
    {
      id: '10',
      countryname: 'Nipal',
    },
    {
      id: '11',
      countryname: 'India',
    },
  ];



// const  countryname=
// [ 
//   {"name": "Afghanistan", "code": "AF"}, 
//   {"name": "land Islands", "code": "AX"}, 
//   {"name": "Albania", "code": "AL"}, 
//   {"name": "Algeria", "code": "DZ"}, 
//   {"name": "American Samoa", "code": "AS"}, 
//   {"name": "AndorrA", "code": "AD"}, 
//   {"name": "Angola", "code": "AO"}, 
//   {"name": "Anguilla", "code": "AI"}, 
//   {"name": "Antarctica", "code": "AQ"}, 
//   {"name": "Antigua and Barbuda", "code": "AG"}, 
//   {"name": "Argentina", "code": "AR"}, 
//   {"name": "Armenia", "code": "AM"}, 
//   {"name": "Aruba", "code": "AW"}, 
//   {"name": "Australia", "code": "AU"}, 
//   {"name": "Austria", "code": "AT"}, 
//   {"name": "Azerbaijan", "code": "AZ"}, 
//   {"name": "Bahamas", "code": "BS"}, 
//   {"name": "Bahrain", "code": "BH"}, 
//   {"name": "Bangladesh", "code": "BD"}, 
//   {"name": "Barbados", "code": "BB"}, 
//   {"name": "Belarus", "code": "BY"}, 
//   {"name": "Belgium", "code": "BE"}, 
//   {"name": "Belize", "code": "BZ"}, 
//   {"name": "Benin", "code": "BJ"}, 
//   {"name": "Bermuda", "code": "BM"}, 
//   {"name": "Bhutan", "code": "BT"}, 
//   {"name": "Bolivia", "code": "BO"}, 
//   {"name": "Bosnia and Herzegovina", "code": "BA"}, 
//   {"name": "Botswana", "code": "BW"}, 
//   {"name": "Bouvet Island", "code": "BV"}, 
//   {"name": "Brazil", "code": "BR"}, 
//   {"name": "British Indian Ocean Territory", "code": "IO"}, 
//   {"name": "Brunei Darussalam", "code": "BN"}, 
//   {"name": "Bulgaria", "code": "BG"}, 
//   {"name": "Burkina Faso", "code": "BF"}, 
//   {"name": "Burundi", "code": "BI"}, 
//   {"name": "Cambodia", "code": "KH"}, 
//   {"name": "Cameroon", "code": "CM"}, 
//   {"name": "Canada", "code": "CA"}, 
//   {"name": "Cape Verde", "code": "CV"}, 
//   {"name": "Cayman Islands", "code": "KY"}, 
//   {"name": "Central African Republic", "code": "CF"}, 
//   {"name": "Chad", "code": "TD"}, 
//   {"name": "Chile", "code": "CL"}, 
//   {"name": "China", "code": "CN"}, 
//   {"name": "Christmas Island", "code": "CX"}, 
//   {"name": "Cocos (Keeling) Islands", "code": "CC"}, 
//   {"name": "Colombia", "code": "CO"}, 
//   {"name": "Comoros", "code": "KM"}, 
//   {"name": "Congo", "code": "CG"}, 
//   {"name": "Congo, The Democratic Republic of the", "code": "CD"}, 
//   {"name": "Cook Islands", "code": "CK"}, 
//   {"name": "Costa Rica", "code": "CR"}, 
// ] ;
  


const countryname=[ 
  {"name": "Afghanistan", "code": "AF"}, 
  {"name": "land Islands", "code": "AX"}, 
  {"name": "Albania", "code": "AL"}, 
  {"name": "Algeria", "code": "DZ"}, 
  {"name": "American Samoa", "code": "AS"}, 
  {"name": "AndorrA", "code": "AD"}, 
  {"name": "Angola", "code": "AO"}, 
  {"name": "Anguilla", "code": "AI"}, 
  {"name": "Antarctica", "code": "AQ"}, 
  {"name": "Antigua and Barbuda", "code": "AG"}, 
  {"name": "Argentina", "code": "AR"}, 
  {"name": "Armenia", "code": "AM"}, 
  {"name": "Aruba", "code": "AW"}, 
  {"name": "Australia", "code": "AU"}, 
  {"name": "Austria", "code": "AT"}, 
  {"name": "Azerbaijan", "code": "AZ"}, 
  {"name": "Bahamas", "code": "BS"}, 
  {"name": "Bahrain", "code": "BH"}, 
  {"name": "Bangladesh", "code": "BD"}, 
  {"name": "Barbados", "code": "BB"}, 
  {"name": "Belarus", "code": "BY"}, 
  {"name": "Belgium", "code": "BE"}, 
  {"name": "Belize", "code": "BZ"}, 
  {"name": "Benin", "code": "BJ"}, 
  {"name": "Bermuda", "code": "BM"}, 
  {"name": "Bhutan", "code": "BT"}, 
  {"name": "Bolivia", "code": "BO"}, 
  {"name": "Bosnia and Herzegovina", "code": "BA"}, 
  {"name": "Botswana", "code": "BW"}, 
  {"name": "Bouvet Island", "code": "BV"}, 
  {"name": "Brazil", "code": "BR"}, 
  {"name": "British Indian Ocean Territory", "code": "IO"}, 
  {"name": "Brunei Darussalam", "code": "BN"}, 
  {"name": "Bulgaria", "code": "BG"}, 
  {"name": "Burkina Faso", "code": "BF"}, 
  {"name": "Burundi", "code": "BI"}, 
  {"name": "Cambodia", "code": "KH"}, 
  {"name": "Cameroon", "code": "CM"}, 
  {"name": "Canada", "code": "CA"}, 
  {"name": "Cape Verde", "code": "CV"}, 
  {"name": "Cayman Islands", "code": "KY"}, 
  {"name": "Central African Republic", "code": "CF"}, 
  {"name": "Chad", "code": "TD"}, 
  {"name": "Chile", "code": "CL"}, 
  {"name": "China", "code": "CN"}, 
  {"name": "Christmas Island", "code": "CX"}, 
  {"name": "Cocos (Keeling) Islands", "code": "CC"}, 
  {"name": "Colombia", "code": "CO"}, 
  {"name": "Comoros", "code": "KM"}, 
  {"name": "Congo", "code": "CG"}, 
  {"name": "Congo, The Democratic Republic of the", "code": "CD"}, 
  {"name": "Cook Islands", "code": "CK"}, 
  {"name": "Costa Rica", "code": "CR"}, 
  {"name": "Croatia", "code": "HR"}, 
  {"name": "Cuba", "code": "CU"}, 
  {"name": "Cyprus", "code": "CY"}, 
  {"name": "Czech Republic", "code": "CZ"}, 
  {"name": "Denmark", "code": "DK"}, 
  {"name": "Djibouti", "code": "DJ"}, 
  {"name": "Dominica", "code": "DM"}, 
  {"name": "Dominican Republic", "code": "DO"}, 
  {"name": "Ecuador", "code": "EC"}, 
  {"name": "Egypt", "code": "EG"}, 
  {"name": "El Salvador", "code": "SV"}, 
  {"name": "Equatorial Guinea", "code": "GQ"}, 
  {"name": "Eritrea", "code": "ER"}, 
  {"name": "Estonia", "code": "EE"}, 
  {"name": "Ethiopia", "code": "ET"}, 
  {"name": "Falkland Islands (Malvinas)", "code": "FK"}, 
  {"name": "Faroe Islands", "code": "FO"}, 
  {"name": "Fiji", "code": "FJ"}, 
  {"name": "Finland", "code": "FI"}, 
  {"name": "France", "code": "FR"}, 
  {"name": "French Guiana", "code": "GF"}, 
  {"name": "French Polynesia", "code": "PF"}, 
  {"name": "French Southern Territories", "code": "TF"}, 
  {"name": "Gabon", "code": "GA"}, 
  {"name": "Gambia", "code": "GM"}, 
  {"name": "Georgia", "code": "GE"}, 
  {"name": "Germany", "code": "DE"}, 
  {"name": "Ghana", "code": "GH"}, 
  {"name": "Gibraltar", "code": "GI"}, 
  {"name": "Greece", "code": "GR"}, 
  {"name": "Greenland", "code": "GL"}, 
  {"name": "Grenada", "code": "GD"}, 
  {"name": "Guadeloupe", "code": "GP"}, 
  {"name": "Guam", "code": "GU"}, 
  {"name": "Guatemala", "code": "GT"}, 
  {"name": "Guernsey", "code": "GG"}, 
  {"name": "Guinea", "code": "GN"}, 
  {"name": "Guinea-Bissau", "code": "GW"}, 
  {"name": "Guyana", "code": "GY"}, 
  {"name": "Haiti", "code": "HT"}, 
  {"name": "Heard Island and Mcdonald Islands", "code": "HM"}, 
  {"name": "Holy See (Vatican City State)", "code": "VA"}, 
  {"name": "Honduras", "code": "HN"}, 
  {"name": "Hong Kong", "code": "HK"}, 
  {"name": "Hungary", "code": "HU"}, 
  {"name": "Iceland", "code": "IS"}, 
  {"name": "India", "code": "IN"}, 
  {"name": "Indonesia", "code": "ID"}, 
  {"name": "Iran, Islamic Republic Of", "code": "IR"}, 
  {"name": "Iraq", "code": "IQ"}, 
  {"name": "Ireland", "code": "IE"}, 
  {"name": "Isle of Man", "code": "IM"}, 
  {"name": "Israel", "code": "IL"}, 
  {"name": "Italy", "code": "IT"}, 
  {"name": "Jamaica", "code": "JM"}, 
  {"name": "Japan", "code": "JP"}, 
  {"name": "Jersey", "code": "JE"}, 
  {"name": "Jordan", "code": "JO"}, 
  {"name": "Kazakhstan", "code": "KZ"}, 
  {"name": "Kenya", "code": "KE"}, 
  {"name": "Kiribati", "code": "KI"}, 
  {"name": "Korea, Republic of", "code": "KR"}, 
  {"name": "Kuwait", "code": "KW"}, 
  {"name": "Kyrgyzstan", "code": "KG"}, 
  {"name": "Lao People"  ,"code": "LA"}, 
  {"name": "Latvia", "code": "LV"}, 
  {"name": "Lebanon", "code": "LB"}, 
  {"name": "Lesotho", "code": "LS"}, 
  {"name": "Liberia", "code": "LR"}, 
  {"name": "Libyan Arab Jamahiriya", "code": "LY"}, 
  {"name": "Liechtenstein", "code": "LI"}, 
  {"name": "Lithuania", "code": "LT"}, 
  {"name": "Luxembourg", "code": "LU"}, 
  {"name": "Macao", "code": "MO"}, 
  {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"}, 
  {"name": "Madagascar", "code": "MG"}, 
  {"name": "Malawi", "code": "MW"}, 
  {"name": "Malaysia", "code": "MY"}, 
  {"name": "Maldives", "code": "MV"}, 
  {"name": "Mali", "code": "ML"}, 
  {"name": "Malta", "code": "MT"}, 
  {"name": "Marshall Islands", "code": "MH"}, 
  {"name": "Martinique", "code": "MQ"}, 
  {"name": "Mauritania", "code": "MR"}, 
  {"name": "Mauritius", "code": "MU"}, 
  {"name": "Mayotte", "code": "YT"}, 
  {"name": "Mexico", "code": "MX"}, 
  {"name": "Micronesia, Federated States of", "code": "FM"}, 
  {"name": "Moldova, Republic of", "code": "MD"}, 
  {"name": "Monaco", "code": "MC"}, 
  {"name": "Mongolia", "code": "MN"}, 
  {"name": "Montenegro", "code": "ME"},
  {"name": "Montserrat", "code": "MS"},
  {"name": "Morocco", "code": "MA"}, 
  {"name": "Mozambique", "code": "MZ"}, 
  {"name": "Myanmar", "code": "MM"}, 
  {"name": "Namibia", "code": "NA"}, 
  {"name": "Nauru", "code": "NR"}, 
  {"name": "Nepal", "code": "NP"}, 
  {"name": "Netherlands", "code": "NL"}, 
  {"name": "Netherlands Antilles", "code": "AN"}, 
  {"name": "New Caledonia", "code": "NC"}, 
  {"name": "New Zealand", "code": "NZ"}, 
  {"name": "Nicaragua", "code": "NI"}, 
  {"name": "Niger", "code": "NE"}, 
  {"name": "Nigeria", "code": "NG"}, 
  {"name": "Niue", "code": "NU"}, 
  {"name": "Norfolk Island", "code": "NF"}, 
  {"name": "Northern Mariana Islands", "code": "MP"}, 
  {"name": "Norway", "code": "NO"}, 
  {"name": "Oman", "code": "OM"}, 
  {"name": "Pakistan", "code": "PK"}, 
  {"name": "Palau", "code": "PW"}, 
  {"name": "Palestinian Territory, Occupied", "code": "PS"}, 
  {"name": "Panama", "code": "PA"}, 
  {"name": "Papua New Guinea", "code": "PG"}, 
  {"name": "Paraguay", "code": "PY"}, 
  {"name": "Peru", "code": "PE"}, 
  {"name": "Philippines", "code": "PH"}, 
  {"name": "Pitcairn", "code": "PN"}, 
  {"name": "Poland", "code": "PL"}, 
  {"name": "Portugal", "code": "PT"}, 
  {"name": "Puerto Rico", "code": "PR"}, 
  {"name": "Qatar", "code": "QA"}, 
  {"name": "Reunion", "code": "RE"}, 
  {"name": "Romania", "code": "RO"}, 
  {"name": "Russian Federation", "code": "RU"}, 
  {"name": "RWANDA", "code": "RW"}, 
  {"name": "Saint Helena", "code": "SH"}, 
  {"name": "Saint Kitts and Nevis", "code": "KN"}, 
  {"name": "Saint Lucia", "code": "LC"}, 
  {"name": "Saint Pierre and Miquelon", "code": "PM"}, 
  {"name": "Saint Vincent and the Grenadines", "code": "VC"}, 
  {"name": "Samoa", "code": "WS"}, 
  {"name": "San Marino", "code": "SM"}, 
  {"name": "Sao Tome and Principe", "code": "ST"}, 
  {"name": "Saudi Arabia", "code": "SA"}, 
  {"name": "Senegal", "code": "SN"}, 
  {"name": "Serbia", "code": "RS"}, 
  {"name": "Seychelles", "code": "SC"}, 
  {"name": "Sierra Leone", "code": "SL"}, 
  {"name": "Singapore", "code": "SG"}, 
  {"name": "Slovakia", "code": "SK"}, 
  {"name": "Slovenia", "code": "SI"}, 
  {"name": "Solomon Islands", "code": "SB"}, 
  {"name": "Somalia", "code": "SO"}, 
  {"name": "South Africa", "code": "ZA"}, 
  {"name": "South Georgia and the South Sandwich Islands", "code": "GS"}, 
  {"name": "Spain", "code": "ES"}, 
  {"name": "Sri Lanka", "code": "LK"}, 
  {"name": "Sudan", "code": "SD"}, 
  {"name": "Suriname", "code": "SR"}, 
  {"name": "Svalbard and Jan Mayen", "code": "SJ"}, 
  {"name": "Swaziland", "code": "SZ"}, 
  {"name": "Sweden", "code": "SE"}, 
  {"name": "Switzerland", "code": "CH"}, 
  {"name": "Syrian Arab Republic", "code": "SY"}, 
  {"name": "Taiwan, Province of China", "code": "TW"}, 
  {"name": "Tajikistan", "code": "TJ"}, 
  {"name": "Tanzania, United Republic of", "code": "TZ"}, 
  {"name": "Thailand", "code": "TH"}, 
  {"name": "Timor-Leste", "code": "TL"}, 
  {"name": "Togo", "code": "TG"}, 
  {"name": "Tokelau", "code": "TK"}, 
  {"name": "Tonga", "code": "TO"}, 
  {"name": "Trinidad and Tobago", "code": "TT"}, 
  {"name": "Tunisia", "code": "TN"}, 
  {"name": "Turkey", "code": "TR"}, 
  {"name": "Turkmenistan", "code": "TM"}, 
  {"name": "Turks and Caicos Islands", "code": "TC"}, 
  {"name": "Tuvalu", "code": "TV"}, 
  {"name": "Uganda", "code": "UG"}, 
  {"name": "Ukraine", "code": "UA"}, 
  {"name": "United Arab Emirates", "code": "AE"}, 
  {"name": "United Kingdom", "code": "GB"}, 
  {"name": "United States", "code": "US"}, 
  {"name": "United States Minor Outlying Islands", "code": "UM"}, 
  {"name": "Uruguay", "code": "UY"}, 
  {"name": "Uzbekistan", "code": "UZ"}, 
  {"name": "Vanuatu", "code": "VU"}, 
  {"name": "Venezuela", "code": "VE"}, 
  {"name": "Viet Nam", "code": "VN"}, 
  {"name": "Virgin Islands, British", "code": "VG"}, 
  {"name": "Virgin Islands, U.S.", "code": "VI"}, 
  {"name": "Wallis and Futuna", "code": "WF"}, 
  {"name": "Western Sahara", "code": "EH"}, 
  {"name": "Yemen", "code": "YE"}, 
  {"name": "Zambia", "code": "ZM"}, 
  {"name": "Zimbabwe", "code": "ZW"} 
  ];

  const firestore_ref = firestore().collection('Users')

  // const restriction=()=>{
  //   if(password !== confirmPassword){
  //     alert("Plz enter same passowrd")
  //     return;
  //   }
  //   if(firstName===''){
  //     alert("Plz enter first name first")
  //     return;
  //   }
  //   if(sureName===''){
  //     alert("Plz enter sureName first")
  //     return;
  //   }
  //   if(password===''){
  //     alert("Plz enter password first")
  //     return;
  //   }
  //   if(confirmPassword===''){
  //     alert("Plz enter confirmPassword first")
  //     return;
  //   }

  //   if(city===''){
  //     alert("Plz enter city first")
  //     return;
  //   }


  //   if(address===''){
  //     alert("Plz enter address first")
  //     return;
  //   }
  // }




  async function RegisterUser() {
    //  restriction()

    if (password !== confirmPassword) {
      alert("Plz enter same passowrd")
      return;
    }
    if (firstName === '') {
      setvalidatefirstname(true)
      return;

    }
    // if (sureName === '') {
    //   setvalidatesurename(true)
    //   return;

    // }

    if (email === '') {
      setvalidateemail(true)
      return;
    }


    if (password === '') {
      setvalidatepassword(true)
      return;
    }
    if (confirmPassword === '') {
      setvalidaeconfirmpassword(true)
      return;
    }

    // if (city === '') {
    //   setvalidatecity(true)
    //   return;
    // }


    // if (address === '') {

    //   setvalidateaddress(true)
    //   return;
    // }



    setloader(true)

  //  var uniq = 'id-' + (new Date()).getTime();
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then((loggeduser) => {
     //    const userdata=firestore_ref.doc(loggeduser.user.uid)
     const userdata=firestore_ref.doc(email)
      //  const userdata = firestore_ref.doc(uniq)
        userdata.set({
          name: firstName,
          sureName: sureName,
          email: email,
          phonenumber: mobile,
          country: country,
          city: city,
          address: address,
          id: email, 
        }).then(() => {
          empty();
          navigation.navigate('Signin')
          setloader(false)

        })
      })
      .catch((error) => {
        setloader(false)
        alert(error)
        console.log("Signup Error---->", error);


      })

  }


  const empty = () => {
    setfirstName('')
    setsureName('')
    setemail('')
    setpassword('')
    setmobile('')
    setcountry('')
    setcity('')
    setaddress('')
    setConfirmPassword('')
  }



  const renderfunction = ({ item }) => {
    console.log(item);
    return (
      <View>
        <TouchableOpacity
          onPress={() => [
            setModalVisible(false),
            setcountry(item.name),
          ]}>
          <View
            style={{
              height: hp(7),
              flexDirection: 'row',

              justifyContent: 'space-between',
              padding: 12,
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: FontSize.font16, color: Colors.black }}>
              {item.name}
            </Text>
            <Entypo name="circle" size={15} style={{ top: 5 }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView>
      <SafeAreaView style={Styles.Container}>
        <View style={{ position: 'absolute', top: hp(5), left: wp(5) }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={Colors.purple}
            />
          </TouchableOpacity>
        </View>


        <View style={{ height: hp(7), top: hp(7) }}>
          <Text style={Styles.createaccountxt}>CREATE ACCOUNT</Text>
        </View>

        <View
          style={{
            height: hp(60),
            width: wp(85),
            alignSelf: 'center',
            top: hp(6),
          }}>



          <TextInput
            style={[
              Styles.textinpt,
              {
                borderBottomColor: Colors.purple,
              },
            ]}
            placeholder="First Name"
            placeholderTextColor={Colors.dark}
            onChangeText={value => { setfirstName(value), setvalidatefirstname(false) }}
            value={firstName}
          />
          {validatefirstname ?
            <Text style={{ fontSize: FontSize.font13, color: Colors.red }}>  First Name Require!
            </Text>
            :
            null
          }
          <TextInput
            style={[
              Styles.textinpt,
              {
                borderBottomColor: Colors.purple,
              },
            ]}
            placeholder="Sure Name"
            placeholderTextColor={Colors.dark}
            onChangeText={value => { setsureName(value), setvalidatesurename(false) }}
            value={sureName}
          />

          {validatesurename ?
            <Text style={{ fontSize: FontSize.font13, color: Colors.red }}>  Sure Name Require!
            </Text>
            :
            null
          }

          <TextInput
            style={Styles.textinpt}
            placeholder="Email"
            keyboardType='email-address'
            autoCapitalize='none'
            // autoCorrect={'false'}
            placeholderTextColor={Colors.dark}
            onChangeText={value => { setemail(value), setvalidateemail(false) }}
            value={email}
          />
          {validateemail ?
            <Text style={{ fontSize: FontSize.font13, color: Colors.red }}>  Email Require!
            </Text>
            :
            null
          }

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#FAFAFA',
              borderBottomWidth: 1,
              height: hp(6.5),
              margin: 3,
            }}>
            <TextInput
              style={{
                width: wp(75),
                fontSize: FontSize.font14,
                color: Colors.dark,
                padding: 10,
                paddingLeft: 14,
                alignItems: 'center',

              }}
              onChangeText={e => { setpassword(e), setvalidatepassword(false) }}
              placeholder="Password"
              placeholderTextColor={Colors.dark}
              secureTextEntry={passwordIcon}
              value={password}
            />

            {passwordIcon ? (
              <TouchableOpacity
                onPress={() => setPasswordIcon(false)}
                style={Styles.passwordentypo}>
                <Entypo name={'eye'} size={20} color={'#AAAAAA'} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={Styles.passwordentypo}
                onPress={() => setPasswordIcon(true)}>
                <Entypo name="eye-with-line" size={20} color={'#AAAAAA'} />
              </TouchableOpacity>
            )}
          </View>
          {validatepassword ?
            <Text style={{ fontSize: FontSize.font13, color: Colors.red }}>  Password Require!
            </Text>
            :
            null
          }
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#FAFAFA',
              borderBottomWidth: 1,
              height: hp(6.5),
              margin: 3,
            }}>
            <TextInput
              style={{
                width: wp(75),
                fontSize: FontSize.font14,
                color: Colors.dark,
                padding: 10,
                paddingLeft: 14,
                alignItems: 'center',
              }}
              placeholder="Confirm Password"
              placeholderTextColor={Colors.dark}
              secureTextEntry={confirmPasswordIcon}
              onChangeText={value => { setConfirmPassword(value), setvalidaeconfirmpassword(false) }}
              value={confirmPassword}
            />

            {confirmPasswordIcon ? (
              <TouchableOpacity
                onPress={() => setConfirmPasswordIcon(false)}
                style={Styles.passwordentypo}>
                <Entypo name={'eye'} size={20} color={'#AAAAAA'} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setConfirmPasswordIcon(true)}
                style={Styles.passwordentypo}>
                <Entypo name="eye-with-line" size={20} color={'#AAAAAA'} />
              </TouchableOpacity>
            )}
          </View>
          {validaeconfirmpassword ?
            <Text style={{ fontSize: FontSize.font13, color: Colors.red }}>  Confirm Password Require!
            </Text>
            :
            null
          }
          <TextInput
            style={Styles.textinpt}
            placeholder="Mobile Number"
            keyboardType="numeric"
            placeholderTextColor={Colors.dark}
            onChangeText={value => { setmobile(value), setvalidatemobile(false) }}
            value={mobile}

          />

          {validatefirstname ?
            <Text style={{ fontSize: FontSize.font13, color: Colors.red }}>  Mobile Number Require!
            </Text>
            :
            null
          }

          <View style={{ flexDirection: 'row' }}>
            <View style={{ paddingTop: 20 }}>
              <Warn height={'16.58px'} width={'16.58px'} />
            </View>
            <Text style={{ padding: 10, color: Colors.black }}>
              create a password that containing alphanumeric and special
              characters
            </Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={Styles.countrtview}>
              <Text style={{ fontSize: FontSize.font14, color: Colors.dark }}>
                {country}
              </Text>

              <MaterialIcons name="arrow-drop-down" size={30} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={Styles.textinpt}
            placeholder="City"
            placeholderTextColor={Colors.dark}
            onChangeText={value => { setcity(value), setvalidatecity(false) }}
            value={city}
          />
          {validatecity ?
            <Text style={{ fontSize: FontSize.font13, color: Colors.red }}>  City  Require!
            </Text>
            :
            null
          }

          <TextInput
            style={Styles.textinpt}
            placeholder="Address"
            placeholderTextColor={Colors.dark}
            onChangeText={value => { setaddress(value), setvalidateaddress(false) }}
            value={address}
          />
          {validateaddress ?
            <Text style={{ fontSize: FontSize.font13, color: Colors.red }}> Address Require!
            </Text>
            :
            null
          }

          <TouchableOpacity
            onPress={() => RegisterUser()}
            style={{
              height: 44,
              width: 177,
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: Colors.purple,
              borderRadius: 10,
              top: hp(5),
            }}>
            {loader ?
              <ActivityIndicator size={'small'} color={Colors.White} style={{ justifyContent: "center", alignSelf: "center", flex: 1, alignContent: "center" }} />
              :


              <Text
                style={{
                  color: Colors.White,
                  textAlign: 'center',
                  fontSize: FontSize.font18,
                }}>
                CONTINUE
              </Text>
            }
          </TouchableOpacity>
        </View>




        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              backgroundColor: Colors.White,
              borderWidth: 0.2,
              width: wp(83),
              alignSelf: 'center',
              top: hp(13),
              height: hp(73),
            }}>
            <FlatList
              data={countryname}
              renderItem={renderfunction}
              keyExtractor={item => item.code}
            />

          </View>
        </Modal>



      </SafeAreaView>



    </ScrollView>
  );
}



// {loader ?
//   <ActivityIndicator size={'large'} color={Colors.purple} style={{ justifyContent: "center",alignSelf: "center", alignContent: "center" }} />
//   :
//   null
// }