import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ParameterList } from '../App';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';

type HomeScreenProps = NativeStackScreenProps<ParameterList, 'Home'>;
// This tells TypeScript what props the Home screen gets from React Navigation

const AniSafeView = Animated.createAnimatedComponent(SafeAreaView);
// This lets you animate SafeAreaView with Reanimated
const logoImg = require('../assets/images/get-started-pg-logo.png');
const arrowImg = require('../assets/images/next.png');

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const opacitySV = useSharedValue(1);
  const opacityAnimationObject = useAnimatedStyle(() => {
    return {
      opacity: opacitySV.value,
    };
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#eeebe8' }}>
      <AniSafeView style={[opacityAnimationObject, styles.container]}>
        <ScreenHeader title='Welcome to Dayli'/>
        <Image source={logoImg} style={styles.logoImg} />
        <PrimaryButton
          onPress={() => {
            opacitySV.value = withTiming(0, { duration: 500 }, () => {
              'worklet';
              runOnJS(navigateToSignUp)();
            });
          }}
          style={styles.btn}
        >
          <View style={styles.btnContent}>
            <Text style={styles.getStartedText}>Get Started</Text>
            <View>
              <Image source={arrowImg} style={styles.arrowImg} />
            </View>
          </View>
        </PrimaryButton>
      </AniSafeView>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    gap: 20,
    backgroundColor: '#eeebe8',
  },
  welcomeText: {
    fontSize: 40,
    fontFamily: 'Slims',
    color: '#201f1f',
    padding: 7,
  },
  logoImg: {
    width: 200,
    height: 200,
  },
  arrowImg: {
    width: 15,
    height: 15,
  },
  btn: {
    width: 130,
    height: 40,
    borderRadius: 30,
  },
  btnContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  getStartedText: {
    paddingLeft: 7,
    fontFamily: 'BiskiTrial-Regular',
    color: '#111111',
  },
});

/*
Features to add:
- Pulse animation for the bunny
- Button to have a slower opacity change
- All components to have a fade in and fade out effect when changing routes

You installed react-native-pulse but haven't used it yet.
*/
