import React, { useState, useRef } from 'react';
import { StyleSheet,Text, View, Platform, Button, TouchableOpacity  } from 'react-native';
import Video from 'react-native-video';
import { PLAYER_STATES } from 'react-native-media-controls';
import Slider from '@react-native-community/slider';

const VideoPlayerScreen = ({navigation,route}) => {

  const [var_value,setVar_value] = useState([0.2,0.5]);
    
    const videoPlayer = useRef(null);
    const [duration, setDuration] = useState(0);
    const [paused, setPaused] = useState(true);

    const [currentTime, setCurrentTime] = useState(0);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
    const [isLoading, setIsLoading] = useState(true);

    const handleChkRoute = () => {
      console.log(route.params);
    }

    const onSeek = (seek) => {
        videoPlayer?.current.seek(seek);
    };

    const onSeeking = (currentVideoTime) => setCurrentTime(currentVideoTime);

    const onPaused = (newState) => {
        setPaused(!paused);
        setPlayerState(newState);
    };

    const onReplay = () => {
        videoPlayer?.current.seek(0);
        setCurrentTime(0);
        if (Platform.OS === 'android') {
            setPlayerState(PLAYER_STATES.PAUSED);
            setPaused(true);
        } else {
            setPlayerState(PLAYER_STATES.PLAYING);
            setPaused(false);
        }
    };

    const onProgress = (data) => {

      console.log(data);

        if (!isLoading) {
            setCurrentTime(data.currentTime);
            setDuration(data.playableDuration);
        }
    };

    const onLoad = (data) => {
        console.log('inside onLoad '+ Math.round(data.duration));
        setDuration(Math.round(data.duration));
        setIsLoading(false);
    };

    const onLoadStart = () => setIsLoading(true);

    const onEnd = () => {
        setPlayerState(PLAYER_STATES.ENDED);
        setCurrentTime(duration);
    };

    const seeValuesInConsole = () => {
      console.log(duration);
      console.log(currentTime);
    }

  return (
    <View style={styles.container}>
      <Button
        title="chk route"
        onPress={handleChkRoute}
      />
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        posterResizeMode={'cover'}
        onProgress={onProgress}
        paused={paused}
        ref={(ref) => (videoPlayer.current = ref)}
        resizeMode={'cover'}
        source={{uri:route.params.down_url}}
        style={styles.videocon}
      />
      <View style={styles.button_row}>
        <Button
          title="<<"
          onPress={()=>{videoPlayer.current.seek(currentTime-5)}}
        />
        <Button
          title="play"
          onPress={()=>setPaused(false)}
        />
        <Button
          title="pause"
          onPress={()=>setPaused(true)}
        />
        <Button
          title=">>"
          onPress={()=>{videoPlayer.current.seek(currentTime+5)}}
        />
      </View>
      <Slider
        value={currentTime}
        maximumValue={240}
        thumbTintColor="#f4511e"
        maximumTrackTintColor="#f4511e"
        minimumTrackTintColor="#f4511e"
      />
      <Button
       title="see values in Console"
       onPress={seeValuesInConsole}
      />
      <TouchableOpacity
        onPress={()=>{
            navigation.navigate('Chat',{
              id:route.params.id,
              user_name:route.params.user_name,
            });
          }
        }
      >
        <View
         style={{
          backgroundColor:'#f4511e',
          borderRadius:25,
          alignItems:'center',
          margin:10,
          padding:10,
         }}
        >
          <Text
          style={{
            color:'white',
            fontSize:25,
            fontWeight:'bold',
          }}
          >Chat</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default VideoPlayerScreen;

const styles = StyleSheet.create({
  container : {
    flexGrow:1,
    justifyContent:'center',
    backgroundColor:'black',
  },
  videocon : {
    height:250,
    width:'100%',
  },
  button_row : {
    flexDirection:'row',
    justifyContent:'space-around',
  }
});