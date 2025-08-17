import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ParameterList } from '../App';
import { PlainAnimatedButton } from '../components/PlainAnimatedButton';

type MainPageProps = NativeStackScreenProps<ParameterList, 'MainPage'>;

const journalIcon = require('../assets/images/pen-round.png');
const moodStatsIcon = require('../assets/images/emoji-smile.png');
const moodAdvisorIcon = require('../assets/images/chat-heart.png');
const settingsIcon = require('../assets/images/settings.png');
const calendarIcon = require('../assets/images/calendar.png');
const character = require('../assets/images/welcomePageCharacterIcon.png');
const heart1 = require('../assets/images/heart1.png');
const heart2 = require('../assets/images/heart2.png');
const heart3 = require('../assets/images/heart3.png');

const AniSafeView = Animated.createAnimatedComponent(SafeAreaView);

export const MainPageScreen: React.FC<MainPageProps> = ({ navigation }) => {
  const opacitySV = useSharedValue(1);
  const opacityAnimationObject = useAnimatedStyle(() => {
    return {
      opacity: opacitySV.value,
    };
  });

  const navigationToSettings = () => {
    navigation.navigate('Settings');
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#eeebe8' }}>
    <AniSafeView style={[styles.container, opacityAnimationObject]}>
      <Text style={styles.title}>Hello Apida!</Text>
      <View style={{ gap: 50 }}>
        <View style={[styles.pairedButtonStyles, { marginTop: 50 }]}>
          <PlainAnimatedButton style={[styles.btn, { width: 100 }]}>
            <View>
              <Image source={journalIcon} style={styles.btnImg} />
              <Text style={styles.font}>Journal</Text>
            </View>
          </PlainAnimatedButton>
          <PlainAnimatedButton style={[styles.btn, { width: 100 }]}>
            <View>
              <Image source={moodStatsIcon} style={styles.btnImg} />
              <Text style={styles.font}>Mood Stats</Text>
            </View>
          </PlainAnimatedButton>
        </View>

        <View style={styles.pairedButtonStyles}>
          <PlainAnimatedButton style={[styles.btn, { width: 100 }]}>
            <View>
              <Image source={moodAdvisorIcon} style={styles.btnImg} />
              <Text style={styles.font}>Mood Advisor</Text>
            </View>
          </PlainAnimatedButton>
          <PlainAnimatedButton
            style={[styles.btn, { width: 100 }]}
            onPress={() => {
              opacitySV.value = withTiming(0, { duration: 500 }, () => {
                'worklet';
                runOnJS(navigationToSettings)();
              });
            }}
          >
            <View>
              <Image source={settingsIcon} style={styles.btnImg} />
              <Text style={styles.font}>Settings</Text>
            </View>
          </PlainAnimatedButton>
        </View>

        <View style={styles.calenderBtnStyle}>
          <PlainAnimatedButton style={[styles.btn, { width: '100%' }]}>
            <View>
              <Image source={calendarIcon} style={styles.btnImg} />
              <Text style={styles.font}>Calendar</Text>
            </View>
          </PlainAnimatedButton>
        </View>
      </View>

      <View style={styles.heartContainer}>
        <Image source={heart1} style={[styles.heartImg]} />
        <Image source={heart3} style={[styles.heartImg]} />
        <Image source={heart2} style={[styles.heartImg]} />
      </View>
    </AniSafeView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    rowGap: 20,
    backgroundColor: '#eeebe8',
  },
  title: {
    fontSize: 40,
    fontFamily: 'Slims',
    color: '#201f1f',
    padding: 7,
  },
  btnImg: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  btn: {
    height: 100,
    borderRadius: 20,
    boxShadow: '0px 2px 3px 2px #d4d3d3',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eeeee8',
  },
  pairedButtonStyles: {
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calenderBtnStyle: {
    width: '65%',
    flexDirection: 'row',
  },
  font: {
    fontFamily: 'BiskiTrial-Regular',
    fontSize: 13,
  }, 
  heartImg: {
    width: 50,
    height: 50,
    opacity: 0.8,
  },
  heartContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 260,
  },
});
