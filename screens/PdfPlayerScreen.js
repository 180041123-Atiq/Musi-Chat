import React from 'react';
import { View,Text,StyleSheet,Dimensions, ScrollView, TouchableOpacity, Button } from 'react-native';
import Pdf from 'react-native-pdf';

const PdfPlayerScreen = () => {

    const source = {uri:'https://firebasestorage.googleapis.com/v0/b/onemoretime-bfcd9.appspot.com/o/pdf.pdf?alt=media&token=ce0d97e3-ec2a-4d7b-a940-603507dd02a7'};

    const handleChat = () => {
        console.log('Chat handled');
    }

    return (
        <View
            style={{
                flex:1,
                backgroundColor:'black',
            }}
        >
            <TouchableOpacity
                onPress={handleChat}
            >
                <View 
                    style={{
                        flexGrow:1,
                        borderRadius:25,
                        backgroundColor:'#f4511e',
                        alignItems:'center',
                        margin:10,
                        marginBottom:0,
                        marginTop:25,
                        padding:5,
                    }}
                >
                    <Text
                        style={{
                            fontSize:30,
                            fontWeight:'bold',
                            color:'white',
                        }}
                    >Chat</Text>
                </View>
            </TouchableOpacity>  
            <View style={styles.container}>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    onPressLink={(uri)=>{
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={styles.pdf}
                />
            </View>
        </View>
    );
};

export default PdfPlayerScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});