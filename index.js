/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import {playbackService} from './MusicPlayerService';

AppRegistry.registerComponent(appName, () => App);

// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => playbackService);
