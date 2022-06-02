import { TextInput,Dimensions,View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useIsFocused } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { firebase } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign'



import Colors from '../Global/Colors';
import FontSize from '../Global/FontSizes';
import MarkSvg from '../Assets/Icons/MarkSvg.svg'
import ForwardSvg from '../Assets/Icons/ForwardSvg.svg'
import ActivityLoader from '../Components/ActivityLoader'
import Styles from './Search.Styles';





export default function Search({ navigation }) {

  const isFocused = useIsFocused();
  const loginpersonid = firebase.auth().currentUser.email
  const firebaseobect = firestore().collection('Favourite')
  const siz = Dimensions.get('window').height;
  const [recoed, setrecoed] = useState([])
  const [pushrecord, setpushrecord] = useState([])
  const [loader, setloader] = useState(false)
  const [muzamil, setmuzamil] = useState([])
  const [favoriteList, setFavoriteList] = useState([]);
  const [favouritedata, setfavouritedata] = useState([])
  const [txtinputalue, settxtinputalue] = useState('')



  useEffect(() => {
      getfavourite()
      
  }, [isFocused]);



 

  const renderfunction = ({ item }) => {
    //  console.log("___________________", item);
    return (
        <View>
            <View style={Styles.renderfunctionmainview}>
                <View >
                    <Image source={{ uri: item.image }} style={Styles.renderimage} />
                </View>
                <View style={{ height: rh(17), width: rw(54), left: rw(2) }}>
                    <View style={{ height: rh(17), justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                        <Text numberOfLines={1} style={{ fontSize: FontSize.font16, color: Colors.black, fontWeight: '700', width: rw(50) }}>{item.title}</Text>
                    </View>
                </View>

                <View style={{ right: rw(0), height: rh(11), justifyContent: "space-around" }}>
                    <TouchableOpacity style={{ marginTop: rh(1) }}
                        onPress={() => (ifExists(item) ? onRemoveFavorite(item) : onFavorite(item))}
                    >
                        {ifExists(item) ?

                            <Fontisto size={22} color={Colors.purple} name={'favorite'} />

                            :
                            <Fontisto size={22} color={Colors.dark} name={'favorite'} />
                        }


                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: rh(2) }} onPress={() => navigation.navigate('SearchRecipieDescription', item)}>
                        <ForwardSvg height={'25px'} width={'25px'} />
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}


const onFavorite = restaurant => {
  setFavoriteList([...favoriteList, restaurant]);
  const emails = firebase.auth().currentUser.email
  const uniq = emails + restaurant.ID;
  console.log("-------------->", uniq);
  const userfavourites = firebaseobect.doc(uniq)
 {restaurant?.ingredients==""?
    userfavourites.set({
      firbaseid: uniq,
      image: restaurant?.image,
      title: restaurant?.title,
      id: restaurant?.ID,
      loginpersonid: loginpersonid,
      cookingtime: "N/A",
      servingsize: "N/A",
      directions: "N/A",
    }).then(() => {
      console.log("Favourite");
      })
      .catch((error) => {
          alert(error)
          console.log("Error---->", error);
      })
  :
  
  userfavourites.set({
      firbaseid: uniq,
      image: restaurant?.image,
      title: restaurant?.title,
      id: restaurant?.ID,
      loginpersonid: loginpersonid,
      cookingtime: restaurant?.ingredients[0]?.readyInMinutes,
      servingsize: restaurant?.ingredients[0]?.servings,
      directions: restaurant?.ingredients[0]?.instructions,
  }).then(() => {
      console.log("Favourite");
      })
      .catch((error) => {
          alert(error)
          console.log("Error---->", error);
      })
    }
};
    const onRemoveFavorite = restaurant => {
        const filteredList = favoriteList.filter(
            item => item.ID !== restaurant.ID
        );
        const emails = firebase.auth().currentUser.email
        const uniq = emails + restaurant.ID;
        firestore().collection('Favourite').doc(uniq).delete()
        setFavoriteList(filteredList);
    };
    // function to check if an item exists in the favorite list or not
    const ifExists = restaurant => {
        if (favoriteList.filter(item => item.ID === restaurant.ID).length > 0) {
            return true;
        }
        return false;
    };

    const getfavourite = async () => {
     
      const id = firebase.auth().currentUser.email
      console.log("Login Person ID------->", id);
      firestore()
          .collection('Favourite').where('loginpersonid', '==', id)
          .onSnapshot(querySnapshot => {
              const favouritedata = [];
              querySnapshot.forEach(documentSnapshot => {
                  console.log("Favourites Record---->", documentSnapshot.data());
                  favouritedata.push({
                      ...documentSnapshot.data(),
                      key: documentSnapshot.id,
                  });
              });
              (favouritedata);
              setfavouritedata(false)

          });
  }





  


  const ApiResponse = async () => {
    let firbaseList = []
    let islistf = []
    setloader(true)
    await firebaseobect.where('loginpersonid', '==', loginpersonid).get()
        .then(querySnapshot => {
            console.log('Total users: ', querySnapshot.size);
            querySnapshot.forEach(documentSnapshot => {
                // console.log('====================================');
                // console.log("Document Data---->",documentSnapshot.data());
                // console.log('====================================');
                firbaseList.push(documentSnapshot.data())
            });
        });

        await fetch(`http://waqarulhaq.com/fromTheFridge/search-recipes.php?search=${txtinputalue}`)
        .then(response => response.json())
        .then(response => {
              console.log("yh response aa rha hay api sy ingredients ka", response);

            for (let index = 0; index < firbaseList.length; index++) {
                for (let j = 0; j < response?.data?.length; j++) {
                    if (firbaseList[index].id === response?.data[j].ID)
                        islistf.push(response?.data[j])
                }
            }
            console.log('111', islistf);
            setFavoriteList(islistf)
            setpushrecord(response.data)
        })

        // .catch(err => console.error(err));
       .catch(err => 
        alert(err));
        recoed.push(pushrecord)
         setloader(false)
   
}








  return (
    <SafeAreaView style={Styles.Container}>
      <View style={Styles.searchview}>
        <Text style={Styles.searchtext}>SEARCH</Text>
      </View>
      <View style={{ marginTop: rh(1), marginHorizontal: rw(2), borderWidth: 1, borderColor: '#606060CC', borderRadius: 5, flexDirection: "row", justifyContent: "space-between" }}>

        <TextInput
          value={txtinputalue}
          placeholder="Search"
          style={{ width: rw(87), paddingLeft: rw(5), color: Colors.black, fontSize: siz * 0.025, paddingHorizontal: rh(1) }}
          placeholderTextColor={'#AEACAC'}
          onChangeText={value => { settxtinputalue(value), console.log(value); }}
        />
        <TouchableOpacity onPress={() => ApiResponse()} style={{ height: rh(6.5), alignSelf: "center", justifyContent: 'center', right: rw(3) }}>
          <AntDesign name='search1' size={siz * 0.03} color={Colors.purple} />
        </TouchableOpacity>
      </View>


      <View style={{ flex: 1, marginBottom: rh(10) }}>

      {loader ?
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ActivityIndicator size={'large'} color={Colors.purple} />
                </View>
                :

                <FlatList
                    data={pushrecord}
                    keyExtractor={item => item.ID}
                    renderItem={renderfunction}
                // ListFooterComponentStyle={{height:200}}
                />


            }
      </View>

    </SafeAreaView>
  );
}

