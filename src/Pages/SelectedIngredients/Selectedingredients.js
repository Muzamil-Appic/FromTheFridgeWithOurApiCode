
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Styles from './Selectedingredients.Styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../Global/Colors';
import FontSize from '../../Global/FontSizes';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { responsiveScreenHeight as rh, responsiveScreenWidth as rw } from 'react-native-responsive-dimensions'
// import { NavigationEvents } from 'react-navigation';



export default function Selectedingredients({ navigation, route }) {
  const [data, setdata] = useState([])
  const [newdata, setnewdata] = useState([])
  const [loader, setloader] = useState(false)
  const [loadertwo, setloadertwo] = useState(true)
  const isFocused = useIsFocused();



  console.log("Holding One", route?.params?.holdingredients);
  console.log("Holding Two", route?.params?.muzamilingredientstwo);

  useEffect(() => {
    //  setloader(true)
    //   getdatafromkitchen();
    //  // getdatafromfullkitchen();
    //   setloader(false)
    getdatafromkitchen()
  }, [])




  const getdatafromkitchen = () => {
    let values = []
    setloader(true)
    route?.params?.muzamilingredientstwo.map((e) => {
      if (e.selected === true) {
        values.push(e);
      }
    })
    route?.params?.holdingredients.map((e) => {
      if (e.selected === true) {
        console.log(e)
        values.push(e);
      }
      else {
        console.log(e);
      }
      console.log("----->", e);
    })
    // data.map((e) => {
    //   newdata.push(e)
    // })

    setnewdata(values)
    setloader(false)
  }


  const empty = () => {
    setdata('')
  }

  // const getdatafromfullkitchen = () => {
  //   route?.params?.FullKitchenData.map((e) => {
  //     if (e.selected === true) {
  //       data.push(e);
  //     }
  //   })
  // }

  // data.map((e) => {
  //   newdata.push(e)
  // })



  // const quickcheckedvalue = ({ item, index }) => {
  //   setloader(true)
  //   let temp = [...newdata]
  //   if (item.selected) {
  //     item.selected = false;
  //   }
  //   else {
  //     item.selected = true;
  //   }
  //   temp[index] = item;
  //   setnewdata(temp)
  //   setloader(false)
  // }


  const renderfunction = ({ item, index }) => {
    // console.log("Selected Ingredinets From Home----->",item);
    return (
      <View onPress={() => { quickcheckedvalue(item, index) }}
        style={{
          paddingVertical: hp(1.5),
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: wp(5),

          borderColor: Colors.purple,
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: FontSize.font19, color: Colors.black }}>
          {item.itemname}
        </Text>

        {item.selected ?
          <AntDesign
            name="checkcircle"
            color={Colors.purple}
            size={15}
            style={{ position: 'absolute', right: 10 }}
          />
          :
          <Entypo
            name="circle"
            size={15}
            style={{ position: 'absolute', right: 10 }}
          />

        }

      </View>
    );
  };



  return (
    <SafeAreaView style={Styles.Container}>
      <View
        style={{
          paddingVertical: hp(1),
          backgroundColor: Colors.purple,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{ position: 'absolute', left: wp(3) }}
          onPress={() => navigation.replace('TabNavigations')}>
          <Ionicons name="chevron-back" size={30} color={Colors.White} />
        </TouchableOpacity>
        <Text
          style={{
            color: Colors.White,
            paddingHorizontal: wp(15),
            fontSize: FontSize.font17,
            fontWeight: '400',
          }}>
          SELECTED INGREDIENTS
        </Text>
      </View>



      <View style={{
        flex: 1,
        marginHorizontal: wp(3),
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderColor: Colors.purple,
        marginTop: hp(1),
      }}>



        {loader ?
          <View style={{ position: "absolute", justifyContent: 'center', alignSelf: "center", }}>
            <ActivityIndicator size={'large'} color={Colors.purple} />
          </View>
          :

          <FlatList
            data={newdata}
            keyExtractor={item => item.itemid}
            renderItem={renderfunction}
          />

        }



        <View style={{ marginHorizontal: wp(3) }}>
          <TouchableOpacity onPress={() => navigation.replace('FindRecipes', newdata,)}
            style={{
              position: 'absolute',
              bottom: hp(5),
              left: wp(10),
              right: wp(10),
              marginHorizontal: wp(10),
              backgroundColor: Colors.purple,
              paddingVertical: hp(2),
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: FontSize.font21,
                color: Colors.White,
                fontWeight: '400',
              }}>
              FIND RECIPES
            </Text>
          </TouchableOpacity>
        </View>

      </View>

    </SafeAreaView>
  );
}
