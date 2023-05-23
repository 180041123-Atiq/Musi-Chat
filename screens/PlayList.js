import React,{useState,useEffect} from 'react';
import { Button,SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Avatar } from 'react-native-paper';

const PlayList = ({route,navigation}) => {

  const user_name = route.params.user_info.user_name;

  const [DATA,setDATA] = useState([]);
  const [varmap,setVarmap] = useState(new Map());

  useEffect(()=>{

   loadSongList();

  },[]);

  const loadSongList = () => {
    //console.log('DATA length ' + DATA.length);
    if(DATA.length>0)return ;
    console.log(route.params.userInfo);
    firestore()
    .collection('songlist')
    .get()
    .then(querySnapshot => {
      const data = [];
      querySnapshot.forEach(documentSnapshot => {

        //console.log(documentSnapshot.data());
        data.push(documentSnapshot.data());
      });

      setDATA(data);
    });

  }

  const chkRouteParam = () => {
    console.log(route.params.user_info.user_name);
  }

  const handlePressOnFile = (obj) => {

    let txt = obj.title;
    let down_url = obj.down_url;
    let id = obj.id;

    let temp;

    firestore()
    .collection('users')
    .doc(route.params.user_info.email)
    .get()
    .then(documentSnapshot => {
      //console.log(documentSnapshot.data().most_played);
      temp = new Map(Object.entries(documentSnapshot.data().most_played));
      
      setVarmap(temp);

    });

    console.log(temp);

    let temp1 = new Map();
    let flag = 0;

    varmap.forEach((value,key,map)=>{
      if(key==txt){
        temp1.set(key,value+1);
        flag = 1;
      } else {
        temp1.set(key,value);
      }
    });

    if(flag==0){
      temp1.set(txt,1);
    }

    //console.log(temp1);

    firestore()
    .collection('users')
    .doc(route.params.user_info.email)
    .update({
      recently_played : txt,
      most_played : Object.fromEntries(temp1),
    })
    .then(()=>{
      console.log('updating recently played '+txt);

      navigation.navigate('VideoPlayerScreen',{
        title:txt,
        down_url:down_url,
        id:id,
        user_name:user_name,
      })

    });

  }

  const chkMostPlayed = (id) => {

    /*console.log('clicked chkMostPlayed');

    firestore()
    .collection('most')
    .get()
    .then(querySnapshot => {
      //console.log(querySnapshot.size);
      querySnapshot.forEach(documentSnapshot=>{

        let temp = new Map(Object.entries(documentSnapshot.data().arr));
        let flag = 0;

        temp.forEach((value,key,map)=>{
          if(key==id){
            temp.set(key,value+1);
            flag = 1;
          }
        });

        if(flag==0){
          temp.set(id,1);
        }

        console.log(temp);

        temp = Object.fromEntries(temp);

        firestore()
        .collection('most')
        .doc(route.params.user_info.email)
        .update({
          arr:temp
        })
        .then(()=>{
          console.log('updating song ');
        });

      })
    })*/

  }

  const renderItem = ({ item }) => { 
    
    //console.log(item.type);
    let icon = '';

    if(item.type=='video'){
      icon='https://firebasestorage.googleapis.com/v0/b/onemoretime-bfcd9.appspot.com/o/firebase-video-icon.png?alt=media&token=08198792-6d6d-44a7-ac17-7531af2803ba';
    } else if(item.type=='music'){
      icon='https://firebasestorage.googleapis.com/v0/b/onemoretime-bfcd9.appspot.com/o/firebase-music-icon.jpg?alt=media&token=b0b3a6ec-b04c-49da-81bd-761ac65f7263';
    }

    return (
      <View 
        style={{
          flex:1,
          flexDirection:'row',
          justifyContent:'space-between',
          marginTop:10,
        }}
      >
        <View 
          style={{
            borderWidth:1,
            borderColor:"#f4511e",
            padding:10,
            marginBottom:10,
            marginLeft:2.5,
            marginRight:2.5,
            flexDirection:'row',
            width:'80%',
          }}
        >
          <Text 
            style={{
              color:'white',
              fontSize:20,
          }}
          >
            {item.title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={()=>handlePressOnFile({
            title:item.title,
            down_url:item.down_url,
            id:item.id,
          })}
        >
          <Avatar.Image
            size={50}
            source={{
              uri:icon
            }}
          />
        </TouchableOpacity>
      </View>
    )
  };

  //main return

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection:'row',
          margin:10,
          backgroundColor:"#f4511e",
          borderRadius:25,
        }}
      >
        <TouchableOpacity
         onPress={()=>navigation.navigate('Profile',{
           user_info:route.params.user_info,
         })}
        >
          <Avatar.Image
            size={50}
            source={{
              uri: route.params.user_info.avatar
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
          }}
        >
          <Text
            style={{
              color:'white',
              fontSize:20,
            }}
          >Welcome {user_name}.</Text>
        </View>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default PlayList;