import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import StackNavigations from './src/Navigations/StackNavigations'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function App({navigation}) {

  return (
    <SafeAreaProvider>
      <StackNavigations />
    </SafeAreaProvider>
  )
}