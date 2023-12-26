import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TrackPlayer, {
  Track,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {playlistData} from '../constants';
import SongInfo from '../components/SongInfo';
import SongSlider from '../components/SongSlider';
import ControlCenter from '../components/ControlCenter';

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackTrackChanged:
        const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
        setTrack(playingTrack);
        break;
    }
  });

  const renderArtwork = () => {
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          {track?.artwork && (
            <Image
              style={styles.albumArtImage}
              source={{uri: track?.artwork?.toString()}}
            />
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={playlistData}
        renderItem={renderArtwork}
        keyExtractor={song => song.id.toString()}
      />
      <SongInfo track={track} />
      <SongSlider />
      <ControlCenter />
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001d23',
  },
  listArtWrapper: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImage: {
    height: '100%',
    borderRadius: 4,
  },
});
