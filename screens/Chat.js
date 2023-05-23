import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,Button,TextInput,LogBox} from 'react-native';
import MessageList from './components/MessageList';
import firestore, { firebase } from '@react-native-firebase/firestore';

const Chat=({navigation,route})=>{

    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);
    const var_user='CR';

    useEffect(() => {
        const subscriber = firestore()
          .collection('4')
          .orderBy('time','desc')
          .limit(1)
          .onSnapshot(querySnapshot => {

            querySnapshot.forEach(documentSnapshot=>{
                //console.log("doc_id : ",documentSnapshot.id);
                //console.log(" sort : ",documentSnapshot.data().time);
                //console.log(" message : ",documentSnapshot.data().text);
                //console.log(messages.find(({time}) => time === documentSnapshot.data().time));

                let flag = messages.find(({time}) => time === documentSnapshot.data().time);
                
                if(flag==undefined){
                    setMessages(prev=>[documentSnapshot.data(),...prev]);
                }
            });

          });
    
        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [messages]);

    const handleSend=()=>{
        if(!message){
            return ;
        }

        firestore()
        .collection('4')
        .add({
            text:message,
            time:firebase.firestore.Timestamp.now().seconds,
            user:var_user,
        })
        .then(()=>{
            //console.log('message added..');
        });

        setMessage('');
    }

    const handleTest=()=>{  

        console.log(firebase.firestore.Timestamp.now());
        console.log(route.params);
    }
    
    

    return (
        <View style={styles.container}>
        <Button title='test' onPress={handleTest}/>
        {true?<MessageList items={messages} user={'CR'}/>:null}
        <TextInput style={styles.tin}
            placeholder={'Write your message...'}
            onChangeText={setMessage}
            value={message}
            onSubmitEditing={handleSend}
            placeholderTextColor='white'
        />
        </View> 
    )

    return (
        <View style={styles.container}>
            <Button title='Go back' onPress={handleGoingBack}/>
            <MessageList items={messages} user={"atiq"}/>
            <TextInput style={styles.tin}
                placeholder={'write your message...'}
                onChangeText={setMessage}
                value={message}
                onSubmitEditing={handleSend}
                placeholderTextColor={'white'}
            />
        </View>
    )

}

export default Chat;

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'stretch',
        justifyContent:'space-between',
        padding:0,
        backgroundColor:'black',
    },
    tin:{
        borderColor:'#f4511e',
        borderWidth:2,
        color:'white',
        fontSize:20,
    },
    in:{
        flexDirection:'row',
        justifyContent:'space-around',
    },
});