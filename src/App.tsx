import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {setupPlayer, addTrack} from '../MusicPlayerService';
import MusicPlayer from './screens/MusicPlayer';

function App(): JSX.Element {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  async function setup() {
    let isSetup = await setupPlayer();
    if (isSetup) {
      await addTrack();
    }
    setIsPlayerReady(isSetup);
  }

  useEffect(() => {setup()}, []);

  //Run when music player is not ready....
  if (!isPlayerReady) {
    return(
      <SafeAreaView>
      <ActivityIndicator/>
    </SafeAreaView>
    )
  }
  //Run when music player is Ready
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'light-content'}/>
       <MusicPlayer/>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
