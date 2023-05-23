import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, Button, StyleSheet, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Mybutton from './components/Mybutton';
import Mytextinput from './components/Mytextinput';


const Login = ({navigation,route}) => {
  
  const [email,setEmail] = useState('');
  const [pass,setPass] = useState('');
  const [errtxtEmail,setErrtxtEmail] = useState('');
  const [errtxtPass,setErrtxtPass] = useState('');
  const [uid,setUid] = useState('');

  const validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
      return (true);
    }
    
    return (false);
  } 

  const handleHasErrorEmail = (txt) => {
    setErrtxtEmail(txt);
  }

  const handleHasErrorPass = (txt) => {
    setErrtxtPass(txt);
  }

  const handleLogin = () => {
    
    if(validateEmail(email)==false){
      handleHasErrorEmail('Invalid Email Address.');
      return ;
    }

    handleHasErrorEmail('');


    firestore()
    .collection('users')
    .get()
    .then(querySnapshot => {
      
      let tempArrayObj = [];

      querySnapshot.forEach(documentSnapshot => {

        tempArrayObj.push(documentSnapshot.data());
        
        //console.log(documentSnapshot.data());

      });

      let tempindex = -1; 

      tempArrayObj.forEach((item,index) => {

        if(item.email==email){
          tempindex = index;
        };

      });
      
      if(tempindex>-1){
        if(tempArrayObj[tempindex].password!=pass){
          handleHasErrorPass('Password is incorrect,If you forgot you can prees Forgot Password');
          return ;
        } else {
          handleHasErrorPass('');
        }
      } else {
        handleHasErrorEmail('Email is not registered,You can press Sign-In to register.');
        return ;
      }

      handleHasErrorEmail('');
      handleHasErrorPass('');

      navigation.navigate('PlayList',
        {user_info:tempArrayObj[tempindex],}
      );

      setEmail('');
      setPass('');

    });

  }

  const handleSignIn = () => {

    navigation.navigate('Signin');
    setEmail('');
    setPass('');

  }

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
    setEmail('');
    setPass('');
  }

  return (
      <KeyboardAvoidingView 
        style={{flexGrow:1}}
        behavior = "height"
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Mytextinput
          label="Email"
          placeholder="Enter email"
          onChangeText={setEmail}
          value={email}
          placeholderTextColor="white"
          color="white"
        />
        <Text style={{color:"red",fontWeight:"bold",marginBottom:0}}>
          {errtxtEmail}
        </Text>
        <Mytextinput
          label="Password"
          placeholder="Enter Password"
          onChangeText={setPass}
          value={pass}
          placeholderTextColor='white'
          color="white"
          secureTextEntry={true}
        />
        <Text style={{color:"red",fontWeight:"bold",marginTop:5}}>
          {errtxtPass}
        </Text>
        <View style={styles.buttonCol}>
          <Mybutton
            title="Login"
            onPress={handleLogin}
          />
          <Mybutton
            title="Sign-in"
            onPress={handleSignIn}
          />
          <Mybutton
            title="Forgot Password"
            onPress={handleForgotPassword}
          />
        </View>
      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container:{
    flexGrow:1,
    backgroundColor:'black',
  },
  buttonCol:{
    flex:1,
    height:40,
    marginTop:28,
  }
})