import { StyleSheet, Text, View ,ActivityIndicator} from 'react-native'
import React from 'react'
import Colors from '../Global/Colors'

const ActivityLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator  size={'large'} color={Colors.purple}/>
    </View>
  )
}

export default ActivityLoader

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center'
    }
})