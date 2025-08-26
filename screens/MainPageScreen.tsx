import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ParameterList } from '../App';
import {
  FadedAnimationButton,
  FadedAnimationButtonProps,
} from '../components/FadedAnimationButton';
import { ScreenHeader } from '../components/ScreenHeader';

type MainPageProps = NativeStackScreenProps<ParameterList, 'MainPage'>;

const journalIcon = require('../assets/images/pen-round.png');
const moodStatsIcon = require('../assets/images/emoji-smile.png');
const moodAdvisorIcon = require('../assets/images/chat-heart.png');
const settingsIcon = require('../assets/images/settings.png');
const calendarIcon = require('../assets/images/calendar.png');
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

        {/* Title */}
        <ScreenHeader title="Hello Apida!" />

        {/* All the buttons */}
        <View style={{ gap: 50 }}>

          {/* Row 1 */}
          <View style={[styles.pairedButtonStyles, { marginTop: 50 }]}>
            <NavButton
              title="Journal"
              icon={journalIcon}
              btnStyle={{ width: 100 }}
              onPress={() => {}}
            />
            <NavButton
              title="Mood Stats"
              icon={moodStatsIcon}
              btnStyle={{ width: 100 }}
              onPress={() => {}}
            />
          </View>

          {/* Row 2 */}
          <View style={styles.pairedButtonStyles}>
            <NavButton
              title="Mood Advisor"
              icon={moodAdvisorIcon}
              onPress={() => {}}
              btnStyle={{ width: 100 }}
            />

            <NavButton
              title="Settings"
              icon={settingsIcon}
              btnStyle={{ width: 100 }}
              onPress={() => {
                opacitySV.value = withTiming(0, { duration: 500 }, () => {
                  'worklet';
                  runOnJS(navigationToSettings)();
                });
              }}
            />
          </View>

          {/* Row 3 */}
          <View style={styles.calenderBtnStyle}>
            <NavButton
              title="Calendar"
              icon={calendarIcon}
              btnStyle={{ width: '100%' }}
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Hearts */}
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
  pairedButtonStyles: {
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calenderBtnStyle: {
    width: '65%',
    flexDirection: 'row',
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

// MainPageScreen Button Component
interface NavButtonProps extends FadedAnimationButtonProps {
  title: string;
  icon: ImageSourcePropType;
  btnStyle?: StyleProp<ViewStyle>;
  onPress: (event: GestureResponderEvent) => void;
}
const NavButton: React.FC<NavButtonProps> = ({
  title,
  icon,
  btnStyle,
  onPress,
  ...props
}) => {
  return (
    <FadedAnimationButton
      style={[
        btnStyle,
        {
          borderRadius: 20,
          boxShadow: '0px 2px 3px 2px #d4d3d3',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#eeeee8',
          height: 100,
        },
      ]}
      onPress={onPress}
      {...props}
    >
      <View>
        <Image
          source={icon}
          style={{ width: 40, height: 40, alignSelf: 'center' }}
        />
        <Text style={{ fontFamily: 'BiskiTrial-Regular', fontSize: 13 }}>
          {title}
        </Text>
      </View>
    </FadedAnimationButton>
  );
};
