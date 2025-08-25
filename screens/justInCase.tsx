import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
  useColorScheme
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ParameterList } from '../App';
import { PlainAnimatedButton } from '../components/PlainAnimatedButton';
import { TextButtonAnimation } from '../components/TextButtonAnimation';
import { Colors } from '../constants/Colors';

type SettingsScreenProps = NativeStackScreenProps<ParameterList, 'Settings'>;

const AniSafeView = Animated.createAnimatedComponent(SafeAreaView);

const bellImg = require('../assets/images/notificationBell.png');
const darkmodeImg = require('../assets/images/darkMode.png');
const userImg = require('../assets/images/userIcon.png');
const supportImg = require('../assets/images/supportIcon.png');
const arrowUpDown = require('../assets/images/arrow-up-down.png');
const btnGoBack = require('../assets/images/left-arrow-pink.png');
const greyArrowIcon = require('../assets/images/right-arrow-grey.png');

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  navigation,
}) => {

  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme] ?? Colors.light; 

  const opacitySV = useSharedValue(1);
  const opacityAnimationObject = useAnimatedStyle(() => {
    return {
      opacity: opacitySV.value,
    };
  });

  const navigateBACKtoMainPage = () => {
    navigation.navigate('MainPage', { name: 'temp' });
  };

  const logOut = () => {
    navigation.navigate('Home');
  };

  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleSwitchDarkMode = () =>
    setIsDarkMode(previousState => !previousState);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const toggleSwitchNotification = () =>
    setIsNotificationEnabled(previousState => !previousState);

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date(2025, 7, 9, 13, 0));
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleConfirmation = (time: Date) => {
    setSelectedTime(time);
    hideTimePicker();
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  const createSupportAlert = () => {
    Alert.alert('Email exmaple@email.com for support', undefined, [
      { text: 'OK' },
    ]);
  };

  const createDeleteAccountAlert = () => {
    Alert.alert('Are you sure you want to delete your account?', undefined, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive' },
    ]);
  };

  const createLogOutAlert = () => {
    Alert.alert('Log out?', undefined, [
      { text: 'Cancel', style: 'cancel'},
      {
        text: 'Yes',
        onPress: () =>
          (opacitySV.value = withTiming(0, { duration: 500 }, () => {
            'worklet';
            runOnJS(logOut)();
          })),
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#eeebe8' }}>
      <AniSafeView style={[opacityAnimationObject, styles.container]}>
        <PlainAnimatedButton
          style={styles.goBackBtnStyles}
          onPress={() => {
            opacitySV.value = withTiming(0, { duration: 500 }, () => {
              'worklet';
              runOnJS(navigateBACKtoMainPage)();
            });
          }}
        >
          <Image source={btnGoBack} style={styles.goBackBtnImgStyles} />
        </PlainAnimatedButton>

        <Text style={styles.title}>Settings</Text>
        <View style={[styles.subSectionView, styles.subSectionMargins]}>
          <View style={styles.switchTextIconStyles}>
            <Image source={darkmodeImg} style={styles.iconStyles} />
            <Text style={styles.subSectionFont}>Dark mode</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleSwitchDarkMode}
            trackColor={{ false: '#dcd6cf', true: '#eb817a' }}
            thumbColor={isDarkMode ? '#EEEBE8' : '#EEEBE8'}
            style={styles.switchSize}
          />
        </View>

        <View style={[styles.subSectionView, styles.subSectionMargins]}>
          <View style={styles.switchTextIconStyles}>
            <Image source={bellImg} style={styles.iconStyles} />
            <Text style={styles.subSectionFont}>Notification</Text>
          </View>
          <Switch
            value={isNotificationEnabled}
            onValueChange={toggleSwitchNotification}
            trackColor={{ false: '#dcd6cf', true: '#eb817a' }}
            thumbColor={isDarkMode ? '#EEEBE8' : '#EEEBE8'}
            style={styles.switchSize}
          />
        </View>

        <View style={styles.timePickerViewStyles}>
          <Text style={styles.accountSubHeadingTextStyles}>Time</Text>
          <PlainAnimatedButton
            onPress={showTimePicker}
            style={styles.timePickerPressableStyle}
          >
            <Text style={styles.timePickerTextStyle}>
              {formatTime(selectedTime)}
            </Text>
            <Image source={arrowUpDown} style={styles.upDownArrowIcon} />
          </PlainAnimatedButton>

          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            date={selectedTime}
            onConfirm={handleConfirmation}
            onCancel={hideTimePicker}
            display="spinner"
            is24Hour={false}
          />
        </View>

        <View style={[styles.subSectionView, styles.subSectionMargins]}>
          <View style={styles.switchTextIconStyles}>
            <Image source={userImg} style={styles.iconStyles} />
            <Text style={styles.subSectionFont}>Account</Text>
          </View>
        </View>

        <View style={styles.accountSubHeadingStyles}>
          <Text style={styles.accountSubHeadingTextStyles}>Edit Name</Text>
          <PlainAnimatedButton style={styles.accountSubHeadingPressableStyles}>
            <Image source={greyArrowIcon} style={styles.upDownArrowIcon} />
          </PlainAnimatedButton>
        </View>

        <View style={styles.accountSubHeadingStyles}>
          <Text style={styles.accountSubHeadingTextStyles}>
            Change Password
          </Text>
          <PlainAnimatedButton style={styles.accountSubHeadingPressableStyles}>
            <Image source={greyArrowIcon} style={styles.upDownArrowIcon} />
          </PlainAnimatedButton>
        </View>

        <View style={styles.accountSubHeadingStyles}>
          <Text style={styles.accountSubHeadingTextStyles}>Delete Account</Text>
          <PlainAnimatedButton
            style={styles.accountSubHeadingPressableStyles}
            onPress={createDeleteAccountAlert}
          >
            <Image source={greyArrowIcon} style={styles.upDownArrowIcon} />
          </PlainAnimatedButton>
        </View>

        <View style={[styles.subSectionView, styles.subSectionMargins]}>
          <View style={styles.switchTextIconStyles}>
            <Image source={supportImg} style={styles.iconStyles} />
            <Text style={styles.subSectionFont}>Contact Support</Text>
          </View>
          <PlainAnimatedButton
            style={styles.accountSubHeadingPressableStyles}
            onPress={createSupportAlert}
          >
            <Image source={greyArrowIcon} style={styles.upDownArrowIcon} />
          </PlainAnimatedButton>
        </View>

        <View style={[styles.subSectionMargins, { width: '73%' }]}>
          <TextButtonAnimation
            style={{
              alignSelf: 'flex-start',
              paddingHorizontal: 26.5,
            }}
            onPress={createLogOutAlert}
            title="Log out"
            textStyle={{ fontSize: 14.4 }}
          ></TextButtonAnimation>
        </View>

        <Text
          style={{
            bottom: 0,
            position: 'absolute',
            padding: 20,
            color: 'grey',
            fontSize: 11,
            fontFamily: 'BiskiTrial-Regular',
            fontStyle: 'italic',
          }}
        >
          Where preferences and personality collide
        </Text>
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
    fontFamily: 'BiskiTrial-Regular',
  },
  title: {
    fontSize: 40,
    fontFamily: 'Slims',
    color: '#201f1f',
    padding: 7,
    marginTop: -20,
  },
  iconStyles: {
    width: 17.5,
    height: 17.5,
  },
  subSectionView: {
    flexDirection: 'row',
    width: '73%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchTextIconStyles: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'BiskiTrial-Regular',
  },
  switchSize: {
    transform: [{ scaleX: 0.55 }, { scaleY: 0.55 }],
    margin: -11.5, //this automatically have a margin so i tried doing margin:0 but does not work. negative does the trick
  },
  upDownArrowIcon: {
    width: 12,
    height: 12,
  },
  font: {
    fontFamily: 'BiskiTrial-Regular',
    fontSize: 13,
  },
  subSectionFont: {
    fontFamily: 'BiskiTrial-Regular',
    fontSize: 14.4,
  },
  subSectionMargins: {
    marginTop: 40,
  },
  accountSubHeadingStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '73%',
    marginTop: -15,
  },
  accountSubHeadingTextStyles: {
    paddingLeft: 26.5 /* 17.5 from icon size + 8 from the gap bw icon and text */,
    color: '#676767',
    fontSize: 13,
    fontFamily: 'BiskiTrial-Regular',
  },
  accountSubHeadingPressableStyles: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goBackBtnStyles: {
    position: 'absolute',
    left: 50,
    top: 100,
  },
  goBackBtnImgStyles: {
    width: 29,
    height: 29,
  },
  timePickerViewStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '73%',
    marginTop: -15,
  },
  timePickerPressableStyle: {
    flexDirection: 'row',
    width: '23%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timePickerTextStyle: {
    color: '#d4756f',
    fontSize: 13,
    fontFamily: 'BiskiTrial-Regula',
  },
});
