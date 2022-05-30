import * as React from 'react';
import { View, Text } from 'react-native';
//Navigations
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//pages
import Splash from '../Pages/Splash/Splash';
import Signin from '../Pages/Signin/Signin';
import Signup from '../Pages/Signup/Signup';
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword';
import OtpReceived from '../Pages/OtpReceived/OtpReceived';
import TabBarNavigations from './TabBarNavigations';
import Selectedingredients from '../Pages/SelectedIngredients/Selectedingredients';
import Dataenter from '../Pages/dataenterpage/dataenter';
import FindRecipes from '../Pages/FindRecipes/FindRecipes';
import Filter from '../Pages/Filter/Filter';
import Profile from '../Pages/Profile/Profile';
import Search from '../Search/Search';
import RecipiesDescription from '../Pages/RecipieDescription/RecipiesDescription';
import SeconRecipeDescription from '../Pages/FavouriteRecipeDescription/SeconRecipeDescription'

import Home from '../Pages/Home/Home'
import RecipiesPage from '../Pages/RecipiesPage/RecipiesPage';
import SearchRecipieDescription from '../Search/SearchRecipieDescription';

//Navigationobjects
const Stack = createNativeStackNavigator();




export default function StackNavigations() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
        mode={'modal'}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name='Dataenter' component={Dataenter} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="OtpReceived" component={OtpReceived} />
        <Stack.Screen name='TabNavigations' component={TabBarNavigations} />
        <Stack.Screen name='Selectedingredients' component={Selectedingredients} />
        <Stack.Screen name='FindRecipes' component={FindRecipes} />
        <Stack.Screen name='Filter' component={Filter} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='Search' component={Search} />
        <Stack.Screen name='RecipiesDescription' component={RecipiesDescription} />
        <Stack.Screen name='RecipiesPage' component={RecipiesPage} />
        <Stack.Screen name='SeconRecipeDescription' component={SeconRecipeDescription} />
        <Stack.Screen name='SearchRecipieDescription' component={SearchRecipieDescription} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
