import React,{useState,useEffect} from 'react';
import { View,Text,Button,TouchableOpacity, ScrollView } from 'react-native';
import { Avatar } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const Profile = ({navigation,route}) => {

    const user_name = route.params.user_info.user_name;
    const [most_played,setMost_played] = useState('');
    const [recently_played,setRecently_played] = useState('');
    const fav_col = route.params.user_info.fav_col;
    const email = route.params.user_info.email;
    const password = route.params.user_info.password;

    useEffect(()=>{
        loadRecentMost();
    },[])

    const loadRecentMost = () => {

        firestore()
        .collection('users')
        .doc(route.params.user_info.email)
        .get()
        .then(documentSnapshot => {
            setRecently_played(documentSnapshot.data().recently_played);
            
            let tempmap = new Map(Object.entries(documentSnapshot.data().most_played));
            let mx = 0;
            let tempmax = '';

            tempmap.forEach((value,key,map)=>{
                if(value>mx){
                    tempmax = key;
                    mx = value;
                }
            });

            setMost_played(tempmax);
            
        });

    }

    let cnt = 1;

    const [pass,setPass] = useState('');

    const chkRouteParam = () => {
        console.log(route.params.user_info);
    }

    const handlePassTxt = () => {

        if(cnt%2==0)setPass(password);
        else setPass('');
        
        cnt++;
    }

    return (
        <View
         style={{
            flex:1,
            backgroundColor:'black',
         }}
        >
            <View
                style={{
                flexDirection:'row',
                margin:10,
                backgroundColor:"#f4511e",
                borderRadius:25,
                }}
            >
                <TouchableOpacity>
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
                >Welcome to your profile {user_name}.</Text>
                </View>
            </View>
            <View
                style={{
                    justifyContent:'center',
                    alignItems:'center',
                    marginBottom:10,
                }}
            >
                <Avatar.Image
                    size={200}
                    source={{
                        uri:route.params.user_info.avatar
                    }}
                />
            </View>
            <ScrollView>
                <View
                    style={{
                        borderWidth:1,
                        borderColor:"#f4511e",
                        padding:10,
                        marginBottom:10,
                        marginLeft:2.5,
                        marginRight:2.5,
                        flexDirection:'row',
                    }}
                >
                    <Text
                    style={{
                        color:'white',
                        fontSize:20,
                    }}
                    >User Name : {user_name}</Text>
                </View>
                <View
                    style={{
                        borderWidth:1,
                        borderColor:"#f4511e",
                        padding:10,
                        marginBottom:10,
                        marginLeft:2.5,
                        marginRight:2.5,
                        flexDirection:'row',
                    }}
                >
                    <Text
                    style={{
                        color:'white',
                        fontSize:20,
                    }}
                    >User Email : {email}</Text>
                </View>
                <View
                    style={{
                        borderWidth:1,
                        borderColor:"#f4511e",
                        padding:10,
                        marginBottom:10,
                        marginLeft:2.5,
                        marginRight:2.5,
                        flexDirection:'row',
                    }}
                >
                    <Text
                    style={{
                        color:'white',
                        fontSize:20,
                    }}
                    >Favourite Color : </Text>
                    <View style={{backgroundColor:fav_col,width:50,height:25}}></View>
                </View>
                <View
                    style={{
                        borderWidth:1,
                        borderColor:"#f4511e",
                        padding:10,
                        marginBottom:10,
                        marginLeft:2.5,
                        marginRight:2.5,
                        flexDirection:'row',
                    }}
                >
                    <Text
                    style={{
                        color:'white',
                        fontSize:20,
                    }}
                    >Most Played : {most_played}</Text>
                </View>
                <View
                    style={{
                        borderWidth:1,
                        borderColor:"#f4511e",
                        padding:10,
                        marginBottom:10,
                        marginLeft:2.5,
                        marginRight:2.5,
                        flexDirection:'row',
                    }}
                >
                    <Text
                    style={{
                        color:'white',
                        fontSize:20,
                    }}
                    >Recently Played : {recently_played}</Text>
                </View>
                <TouchableOpacity onPress={handlePassTxt}>
                    <View
                        style={{
                            borderWidth:1,
                            borderColor:"#f4511e",
                            padding:10,
                            marginBottom:10,
                            marginLeft:2.5,
                            marginRight:2.5,
                            flexDirection:'row',
                        }}
                    >
                        <Text
                        style={{
                            color:'white',
                            fontSize:20,
                        }}
                        >Click to See Password : {pass}</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default Profile;