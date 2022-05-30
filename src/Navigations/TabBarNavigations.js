import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
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
import Fontisto from 'react-native-vector-icons/Fontisto'


import Colors from '../Global/Colors';
import FontSize from '../Global/FontSizes';
//pages
import Home from '../Pages/Home/Home';
import Search from '../Search/Search'
import Profile from '../Pages/Profile/Profile';

//svg
import HomeGraySvg from '../Assets/Icons/HomeGraySvg.svg'
import HomeWhitesvg from '../Assets/Icons/HomeWhitesvg.svg'
import ProfileGraySvg from '../Assets/Icons/ProfileGraySvg.svg'
import ProfileWhiteSvg from '../Assets/Icons/ProfileWhiteSvg.svg'
import SearchGraySvg from '../Assets/Icons/SearchGraySvg.svg'
import SearchWhiteSvg from '../Assets/Icons/SearchWhiteSvg.svg'
import Favourite from '../Pages/Favourite/Favourite';


import styles from './TabBar.Styles';





export default function TabBarNavigations() {
  //states
  const [homeeabled, sethomeeabled] = useState(true);
  const [searchenabled, setsearchenabled] = useState(false);

  const Tab = createBottomTabNavigator();
  const isFocused = useIsFocused()

  return (

    <Tab.Navigator screenOptions={{
      headerShown: false, tabBarStyle: {
        position: 'absolute',
        elevation: 0,
        height: rh(10),
        backgroundColor: Colors.White,
       
      
        // borderTopColor: '#E7E7E7',
      },

    }}

      tabBarOptions={{
        // inactiveBackgroundColor:'red',

        // activeTintColor: Colors.black,
        activeTintColor: Colors.purple,
        inactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
        //  tabBarIcon: { focused: false, color: '#F7A34E' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '',

          tabBarIcon: tintcolor => {
            return (
              <View
                style={{
                  marginTop: rh(3),
                  left: rw(5),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {tintcolor.focused ? (
                  <View style={styles.vwwithfocued}>
                    <HomeWhitesvg height={'23px'} width={'24px'} />
                    <Text style={styles.txtwithfocued}>Home</Text>
                  </View>
                ) : (
                  <View style={styles.vwwithoutfocused}>
                    <View style={{ alignSelf: "center" }}>
                      <HomeGraySvg height={'23px'} width={'24px'} />
                    </View>
                    <Text style={styles.txtwithoutfocused}>Home</Text>
                  </View>
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          tabBarLabel: '',

          tabBarIcon: tintcolor => {
            return (
              <View
                style={{
                  marginTop: rh(3),
                  justifyContent: 'center',
                  alignItems: 'center',
                  left: rw(2),
                 
                }}>
                {tintcolor.focused ? (
                  <View style={styles.vwwithfocued}>
                    <Fontisto name='favorite' size={20} color={Colors.White} />
                    <Text style={styles.txtwithfocued}>Favourite</Text>
                  </View>
                ) : (
                  <View style={styles.vwwithoutfocused}>

                    <View style={{ alignSelf: "center" }}>
                      <Fontisto name='favorite' size={20} color={Colors.dark} />

                    </View>
                    <Text style={styles.txtwithoutfocused}>Favourite</Text>
                  </View>
                )}
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: '',

          tabBarIcon: tintcolor => {
            return (
              <View
                style={{
                  marginTop: rh(3),
                  
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {tintcolor.focused ? (
                  <View style={styles.vwwithfocued}>
                    <Feather name='search' size={20} color={Colors.White} />
                    <Text style={styles.txtwithfocued}>Search</Text>
                  </View>
                ) : (
                  <View style={styles.vwwithoutfocused}>
                    <View style={{ alignSelf: "center" }}>
                      <Feather name='search' size={20} color={Colors.dark} />

                    </View>
                    <Text style={styles.txtwithoutfocused}>Search</Text>
                  </View>
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: '',

          tabBarIcon: tintcolor => {
            return (
              <View
                style={{
                  marginTop: rh(3),
                  right: rw(2),
                
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {tintcolor.focused ? (
                  <View style={styles.vwwithfocued}>
                    <ProfileWhiteSvg height={'23px'} width={'24px'} />
                    <Text style={styles.txtwithfocued}>Profile</Text>
                  </View>
                ) : (
                  <View style={styles.vwwithoutfocused}>
                    <View style={{ alignSelf: "center" }}>
                      <ProfileGraySvg height={'23px'} width={'24px'} />
                    </View>
                    <Text style={styles.txtwithoutfocused}>Profile</Text>
                  </View>
                )}
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}



