import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
// import { Image } from 'react-native-reanimated/lib/typescript/Animated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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

type SignupScreenProps = NativeStackScreenProps<ParameterList, 'SignUp'>;

const AniSafeView = Animated.createAnimatedComponent(SafeAreaView);

export const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  console.log('signup page');

  const opacitySV = useSharedValue(1);
  const opacityAnimationObject = useAnimatedStyle(() => {
    return {
      opacity: opacitySV.value,
    };
  });

  const navigateToLogIn = () => {
    navigation.navigate('LogIn');
  };
  const navigateToMainPage = () => {
    navigation.navigate('MainPage', { name });
  };

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSecureEntry, setIsSecureEntry] = useState<boolean>(true);

  // const handleName = (name: string) => {
  //   if (name.includes(' ') && name.length > 0) {
  //     Alert.alert('Please Enter a Name', undefined, [{ text: 'OK' }]);
  //   }
  //   setName(name)
  // }

  return (
    <View style={{ flex: 1, backgroundColor: '#eeebe8' }}>
      <AniSafeView style={[opacityAnimationObject, styles.container]}>
        <ScreenHeader title='Sign Up'/>
        <View style={styles.form}>
          <TextInput
            placeholder="Name"
            style={styles.inputBox}
            label="Name"
            value={name}
            autoComplete="off"
            autoCorrect={false}
            spellCheck={false}
            onChangeText={text => setName(text)}
            mode="outlined"
          ></TextInput>
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
                runOnJS(navigateToLogIn)();
              });
            }}
            title="Log in instead"
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
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: 300,
    width: 250,
    gap: 20,
  },
  inputBox: {
    width: 250,
    backgroundColor: '#eeeee8',
  },
  title: {
    fontSize: 40,
    fontFamily: 'Slims',
    padding: 7,
    color: '#201f1f',
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
  logInTxt: {
    textDecorationLine: 'underline',
    fontFamily: 'BiskiTrial-Regular',
    marginTop: -8,
  },
});
