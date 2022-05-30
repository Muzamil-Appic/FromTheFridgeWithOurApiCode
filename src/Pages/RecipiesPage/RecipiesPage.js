import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Styles from './Recipies.Styles'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../Global/Colors';
import FontSize from '../../Global/FontSizes';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { responsiveScreenHeight as rh, responsiveScreenWidth as rw } from 'react-native-responsive-dimensions';

export default function Recepies({ navigation }) {
  //   const renderfunction = ({item}) => {
  //     console.log(item);
  //     return (

  //     );
  //   };

  const DATA = [
    {
      recepieName: 'Apple Tart',
      category: 'Apple Recepie content',
      cookingtime: '20',
      calories: '99',
      fat: '11.4',
      carbs: '26',
      protien: '0',
      id: 0,
      img:'empty'
    },
    {
      recepieName: 'Apple Tart',
      category: 'Apple Recepie content',
      cookingtime: '20',
      calories: '99',
      fat: '11.4',
      carbs: '26',
      protien: 1,
    },
    {
      recepieName: 'Apple Tart',
      category: 'Apple Recepie content',
      cookingtime: '20',
      calories: '99',
      fat: '11.4',
      carbs: '26',
      protien: 3,
    },
  ];

  const renderfunction = ({ item }) => {
    console.log(item);
    return (
      <View
        style={{
          width: wp(94),
          elevation: 8,
          height: hp(20),
          backgroundColor: Colors.White,
          alignSelf: 'center',
          borderRadius: 10,
          marginBottom: 15,
          flexDirection: 'row',
          
        }}>
        <View style={{ width: wp(70), flexDirection: 'row', backgroundColor: Colors.purple }}>
          <Image
            source={require('../../Assets/Photos/phototwo.png')}
            style={{ height: hp(20), resizeMode: 'stretch' }}
          />
          <View style={{ backgroundColor: Colors.White, width: wp(40), borderWidth: 1, right: wp(6) }}>
            <Text>{item.recepieName}</Text>
          </View>
        </View>




      </View>
    );
  };
  return (
    <View style={Styles.Container}>
      <View style={Styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ left: wp(5), top: hp(2) }}>
          <Ionicons
            name="chevron-back-outline"
            size={25}
            color={Colors.White}
          />
        </TouchableOpacity>
        <View style={Styles.headerinnerview}>
          <View style={Styles.recepiesview}>
            <Text style={Styles.headertext}>RECIPES</Text>
          </View>
          <Text style={Styles.headertext}>FILTER</Text>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <FlatList
          data={DATA}
          renderItem={renderfunction}
          keyExtractor={item => item.id}
          contentContainerStyle={{  paddingBottom:rh(5)}}
        />
      </View>
    </View>
  );
}
