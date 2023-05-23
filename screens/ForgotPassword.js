import React,{useState} from 'react';
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard, TouchableOpacity  } from 'react-native';
import Mytextinput from './components/Mytextinput';
import {sendEmail} from './components/send-email';
import firestore from '@react-native-firebase/firestore';

const ForgotPassword = ({navigation,route}) => {

  const [email,setEmail] = useState('');
  const [errtxt,setErrtxt] = useState(false);
  const [errtxt1,setErrtxt1] = useState(false);

  const validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
      return (true);
    }
    
    return (false);
  }

  const handleSendYourPassword = () => {

    if(validateEmail(email)==false){
      setErrtxt(true);
      return ;
    }

    firestore()
    .collection('users')
    .doc(email)
    .get()
    .then(documentSnapshot=>{

      if(documentSnapshot.exists==false){
        setErrtxt(false);
        setErrtxt1(true);
        return ;
      }

      sendEmail(
        email,
        'Forgotten Password',
        documentSnapshot.data().password,
        {cc:'mh.mushfiq99@gmail.com'}
      ).then(()=>{
        console.log('Your message was successflly sent!');
      });

      setErrtxt(false);
      setErrtxt1(false);

    });

    setErrtxt(false);

    //console.log(email);

    

  }

    return (
        <KeyboardAvoidingView
          style={{
            flex:1,
            backgroundColor:'black'
          }}
        >
          <View>
            <Mytextinput
              label="Email"
              placeholder="Enter email"
              onChangeText={setEmail}
              value={email}
              placeholderTextColor="white"
              color="white"
            />
            {errtxt?<Text style={{color:'red',fontWeight:'bold',}}>Invalid Email Address</Text>:null}
            {errtxt1?<Text style={{color:'red',fontWeight:'bold',}}>This email is not registered.</Text>:null}
            <TouchableOpacity
              onPress={handleSendYourPassword}
            >
              <View
                style={{
                  backgroundColor:'#f4511e',
                  borderRadius:25,
                  justifyContent:'center',
                  alignItems:'center',
                  padding:8,
                  margin:10,
                  marginTop:30,
                }}
              >
                <Text
                  style={{
                    color:'white',
                    fontSize:25,
                    fontWeight:'bold',
                  }}
                >Send Your Password</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView> 
    );
};

export default ForgotPassword;