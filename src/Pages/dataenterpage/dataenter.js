import { View, Text, TextInput, TouchableOpacity, ScrollView, } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../Global/Colors'
import FontSize from '../../Global/FontSizes'
import { responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions'
import firestore from '@react-native-firebase/firestore';


export default function Dataenter() {
    const [category, setcategory] = useState('Meats')
    const [itemname, setitemname] = useState('')
    const [itemspecification, setitemspecification] = useState('fullkitchen')
    const usersCollection = firestore().collection('FridgeIngredients');
    const categorycollection = firestore().collection('Category');


    const empty=()=>{
        setitemname('')
    }

    const emptycategory=()=>{
        setcategory('')
    }

const DataWrite=async()=>{
    console.log("--->1");
    if(itemname===''){
        alert("First Enter itemname")
        return;
    }
    console.log("--->2");
    var uniq = 'id-' + (new Date()).getTime();
   
    const userdata = usersCollection.doc(uniq)
    userdata.set({
      itemid: uniq,
      itemname:itemname,
      category:category,
      itemspecification:itemspecification,
    }).then(() => {
      empty();
      console.log("--->3");
  })
  .catch((error) => {
   alert(error)
    console.log("Error---->", error);


  })

}


const categorywrite=async()=>{
    console.log("--->1");
    if(category===''){
        alert("First Enter itemname")
        return;
    }
    console.log("--->2");
    var uniq = 'id-' + (new Date()).getTime();
   
    const userdata = categorycollection.doc(uniq)
    userdata.set({
      itemid: uniq,
      category:category,
    }).then(() => {
        emptycategory()
      console.log("--->3");
  })
  .catch((error) => {
   alert(error)
    console.log("Error---->", error);


  })

}


    return (
        <ScrollView>
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: "center" }}>
            <View style={{ height: rh(40), justifyContent: 'space-around' }}>
                <View style={{ height: rh(8), width: rw(90), borderWidth: 1, borderRadius: 1 }}>
                    <TextInput placeholder='Category' value={category}
                        onChangeText={value =>setcategory(value)}
                        style={{ fontSize: FontSize.font17 }} />
                </View>
               
                <View style={{ height: rh(8), width: rw(90), borderWidth: 1, borderRadius: 1 }}>
                    <TextInput
                        onChangeText={value => setitemspecification(value)}
                        value={itemspecification}
                        placeholder='Item Specification' style={{ fontSize: FontSize.font17 }} />
                </View>
                <View style={{ height: rh(8), width: rw(90), borderWidth: 1, borderRadius: 1 }}>
                    <TextInput
                        onChangeText={value =>setitemname(value)}
                        value={itemname}

                        placeholder='Item Name' style={{ fontSize: FontSize.font17 }} />
                </View>

            </View>
            <TouchableOpacity 
            onPress={()=>DataWrite()}
            style={{ justifyContent: 'center', alignSelf: "center", backgroundColor: Colors.purple, height: rh(8), width: rw(50),marginTop:rh(2) }}>
                <Text style={{ fontSize: FontSize.font20, color: Colors.White, textAlign: 'center' }}>Add Items</Text>
            </TouchableOpacity>



           

        </View>
        </ScrollView>
    )
}















// ///FOr Adding category




// import { View, Text, TextInput, TouchableOpacity, } from 'react-native'
// import React, { useState } from 'react'
// import Colors from '../../Global/Colors'
// import FontSize from '../../Global/FontSizes'
// import { responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions'
// import firestore from '@react-native-firebase/firestore';


// export default function Dataenter() {
//     const [category, setcategory] = useState('')
//     const [itemname, setitemname] = useState('')
//     const [itemspecification, setitemspecification] = useState('fullkitchen')
//     const usersCollection = firestore().collection('FridgeIngredients');
//     const categorycollection = firestore().collection('Category');


//     const empty=()=>{
//         setitemname('')
//     }

//     const emptycategory=()=>{
//         setcategory('')
//     }

// const DataWrite=async()=>{
//     console.log("--->1");
//     if(itemname===''){
//         alert("First Enter itemname")
//         return;
//     }
//     console.log("--->2");
//     var uniq = 'id-' + (new Date()).getTime();
   
//     const userdata = usersCollection.doc(uniq)
//     userdata.set({
//       itemid: uniq,
//       itemname:itemname,
//       category:category,
//       itemspecification:itemspecification,
//     }).then(() => {
//       empty();
//       console.log("--->3");
//   })
//   .catch((error) => {
//    // alert(error)
//     console.log("Error---->", error);


//   })

// }


// const categorywrite=async()=>{
//     console.log("--->1");
//     if(category===''){
//         alert("First Enter itemname")
//         return;
//     }
//     console.log("--->2");
//     var uniq = 'id-' + (new Date()).getTime();
   
//     const userdata = categorycollection.doc(uniq)
//     userdata.set({
//       itemid: uniq,
//       category:category,
//     }).then(() => {
//         emptycategory()
//       console.log("--->3");
//   })
//   .catch((error) => {
//    // alert(error)
//     console.log("Error---->", error);


//   })

// }


//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignSelf: "center" }}>
//             <View style={{ height: rh(40), justifyContent: 'space-around' }}>
//                 <View style={{ height: rh(8), width: rw(90), borderWidth: 1, borderRadius: 1 }}>
//                     <TextInput placeholder='Category' value={category}
//                         onChangeText={value =>setcategory(value)}
//                         style={{ fontSize: FontSize.font17 }} />
//                 </View>
               
//                 {/* <View style={{ height: rh(8), width: rw(90), borderWidth: 1, borderRadius: 1 }}>
//                     <TextInput
//                         onChangeText={value => setitemspecification(value)}
//                         value={itemspecification}
//                         placeholder='Item Specification' style={{ fontSize: FontSize.font17 }} />
//                 </View>
//                 <View style={{ height: rh(8), width: rw(90), borderWidth: 1, borderRadius: 1 }}>
//                     <TextInput
//                         onChangeText={value =>setitemname(value)}
//                         value={itemname}

//                         placeholder='Item Name' style={{ fontSize: FontSize.font17 }} />
//                 </View> */}

//             </View>
//             {/* <TouchableOpacity 
            
//             onPress={()=>DataWrite()}
//             style={{ justifyContent: 'center', alignSelf: "center", backgroundColor: Colors.purple, height: rh(8), width: rw(50),marginTop:rh(2) }}>
//                 <Text style={{ fontSize: FontSize.font20, color: Colors.White, textAlign: 'center' }}>Add</Text>
//             </TouchableOpacity> */}



//             <TouchableOpacity 
            
//             onPress={()=>categorywrite()}
//             style={{ justifyContent: 'center', alignSelf: "center", backgroundColor: Colors.purple, height: rh(8), width: rw(50),marginTop:rh(2) }}>
//                 <Text style={{ fontSize: FontSize.font20, color: Colors.White, textAlign: 'center' }}>Add Category</Text>
//             </TouchableOpacity>

//         </View>
//     )
// }




















