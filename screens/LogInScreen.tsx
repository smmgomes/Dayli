import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ParameterList } from '../App';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { TextButtonAnimation } from '../components/TextButtonAnimation';

type LogInScreenProp = NativeStackScreenProps<ParameterList, 'LogIn'>;

const AniSafeView = Animated.createAnimatedComponent(SafeAreaView);

export const LogInScreen: React.FC<LogInScreenProp> = ({ navigation }) => {
  const navigateToMainPage = () => {
    navigation.navigate('MainPage', {name: 'Temporary'});
    //gotta get the stored name and fetch it here!!! 
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp'); 
  };

  const opacitySV = useSharedValue(1);
  const opacityAnimationObject = useAnimatedStyle(() => {
    return {
      opacity: opacitySV.value,
    };
  });

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSecureEntry, setIsSecureEntry] = useState<boolean>(true);

  return (
    <View style={{ flex: 1, backgroundColor: '#eeebe8' }}>
    <AniSafeView style={[opacityAnimationObject, styles.container]}>
      <ScreenHeader title='Log in'/>
      <TextInput
        placeholder="Email"
        style={styles.inputBox}
        label="Email"
        value={email}
        autoComplete="email"
        autoCorrect={false}
        spellCheck={false}
        autoCapitalize="none"
        onChangeText={text => setEmail(text)}
        mode="outlined"
      ></TextInput>
      <TextInput
        secureTextEntry={isSecureEntry}
        right={
          <TextInput.Icon
            icon={isSecureEntry ? 'eye-off' : 'eye'}
            onPress={() => {
              setIsSecureEntry(!isSecureEntry);
            }}
          />
        }
        placeholder="Password"
        style={styles.inputBox}
        label="Password"
        value={password}
        autoComplete="password"
        autoCorrect={false}
        spellCheck={false}
        autoCapitalize="none"
        onChangeText={text => setPassword(text)}
        mode="outlined"
      ></TextInput>
      <TextButtonAnimation
        onPress={() => {
          opacitySV.value = withTiming(0, { duration: 500 }, () => {
            'worklet';
            runOnJS(navigateToSignUp)();
          });
        }}
        title='Sign up instead'
      ></TextButtonAnimation>
      <PrimaryButton
        style={styles.btn}
        onPress={() => {
          opacitySV.value = withTiming(0, { duration: 500 }, () => {
            'worklet';
            runOnJS(navigateToMainPage)();
          });
        }}
      >
        <Text style={styles.btnText}>Done</Text>
      </PrimaryButton>
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
  inputBox: {
    width: 250,
    backgroundColor: '#eeeee8',
  },
  btn: {
    width: 80,
    height: 40,
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  btnText: {
    fontSize: 14,
    fontFamily: 'BiskiTrial-Regular',
    color: '#111111',
  },
  signUpTxt: {
    textDecorationLine: 'underline',
    fontFamily: 'BiskiTrial-Regular',
    marginTop: -8,
  },
});
