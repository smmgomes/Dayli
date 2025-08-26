import { MenuView } from '@react-native-menu/menu';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Alert,
  Appearance,
  Image,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ParameterList } from '../App';
import { FadedAnimationButton } from '../components/FadedAnimationButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { TextButtonAnimation } from '../components/TextButtonAnimation';
import { captialize } from '../library/helpers';

type SettingsScreenProps = NativeStackScreenProps<ParameterList, 'Settings'>;

const AniSafeView = Animated.createAnimatedComponent(SafeAreaView);

const bellImg = require('../assets/images/notificationBell.png');
const thmClrIcon = require('../assets/images/themeColorIcon.png');
const userImg = require('../assets/images/userIcon.png');
const supportImg = require('../assets/images/supportIcon.png');
const arrowUpDown = require('../assets/images/arrow-up-down.png');
const btnGoBack = require('../assets/images/left-arrow-pink.png');
const greyArrowIcon = require('../assets/images/right-arrow-grey.png');

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  navigation,
}) => {
  // states
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date(2025, 7, 9, 13, 0));
  const [userThemeChoice, setUserThemeChoice] = useState<{
    name: string;
    value: 'light' | 'dark';
  }>({ name: 'system', value: Appearance.getColorScheme() ?? 'light' }); //set up global variable after

  //animation
  const opacitySV = useSharedValue(1);
  const opacityAnimationObject = useAnimatedStyle(() => {
    return {
      opacity: opacitySV.value,
    };
  });

  //navigation
  const navigateBACKtoMainPage = () => {
    navigation.navigate('MainPage', { name: 'temp' });
  };

  const logOut = () => {
    navigation.navigate('Home');
  };

  //notifications
  const toggleSwitchNotification = () =>
    setIsNotificationEnabled(previousState => !previousState);

  //selecting time
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

  //contacting support
  const createSupportAlert = () => {
    Alert.alert('Email exmaple@email.com for support', undefined, [
      { text: 'OK' },
    ]);
  };

  //deleting account
  const createDeleteAccountAlert = () => {
    Alert.alert('Are you sure you want to delete your account?', undefined, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive' },
    ]);
  };

  //logging out
  const createLogOutAlert = () => {
    Alert.alert('Log out?', undefined, [
      { text: 'Cancel', style: 'cancel' },
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
    <View style={{ flex: 1, backgroundColor: '#eeeee8' }}>
      <AniSafeView style={[opacityAnimationObject, styles.container]}>
        {/* BackButton Section */}
        <FadedAnimationButton
          style={styles.goBackBtnStyles}
          onPress={() => {
            opacitySV.value = withTiming(0, { duration: 500 }, () => {
              'worklet';
              runOnJS(navigateBACKtoMainPage)();
            });
          }}
        >
          <Image source={btnGoBack} style={styles.goBackBtnImgStyles} />
        </FadedAnimationButton>

        {/* Title */}
        <ScreenHeader title='Settings'/>

        {/* Theme Selection Section */}
        <View style={[styles.subSectionView, styles.subSectionMargins]}>
          <View style={styles.switchTextIconStyles}>
            <Image source={thmClrIcon} style={styles.iconStyles} />
            <Text style={styles.subSectionFont}>Select Theme</Text>
          </View>
          <MenuView
            title="Select Theme"
            onPressAction={({ nativeEvent }) => {
              if (nativeEvent.event === 'system') {
                setUserThemeChoice({
                  name: 'system',
                  value: Appearance.getColorScheme() ?? 'light',
                });
              } else if (nativeEvent.event === 'light') {
                setUserThemeChoice({ name: 'light', value: 'light' });
              } else {
                setUserThemeChoice({ name: 'dark', value: 'dark' });
              }
            }}
            actions={[
              {
                id: 'system',
                title: 'System',
                // titleColor: image:
              },
              {
                id: 'light',
                title: 'Light',
                // titleColor: image:
              },
              {
                id: 'dark',
                title: 'Dark',
                // titleColor: image:
              },
            ]}
            themeVariant={userThemeChoice.value}
          >
            <FadedAnimationButton
              onPress={() => {}}
              style={styles.pickerPressableStyle}
            >
              <Text style={styles.pickerTextStyle}>
                {captialize(userThemeChoice.name)}
              </Text>
              <Image source={arrowUpDown} style={styles.upDownArrowIcon} />
            </FadedAnimationButton>
          </MenuView>
        </View>

        {/* Notification Toggle + Setting Time Section */}
        <View style={[styles.subSectionView, styles.subSectionMargins]}>
          <View style={styles.switchTextIconStyles}>
            <Image source={bellImg} style={styles.iconStyles} />
            <Text style={styles.subSectionFont}>Notification</Text>
          </View>
          <Switch
            value={isNotificationEnabled}
            onValueChange={toggleSwitchNotification}
            trackColor={{ false: '#dcd6cf', true: '#eb817a' }}
            thumbColor={isNotificationEnabled ? '#EEEBE8' : '#EEEBE8'}
            style={styles.switchSize}
          />
        </View>

        <View style={styles.timePickerViewStyles}>
          <Text style={styles.accountSubHeadingTextStyles}>Time</Text>
          <FadedAnimationButton
            onPress={showTimePicker}
            style={styles.pickerPressableStyle}
          >
            <Text style={styles.pickerTextStyle}>
              {formatTime(selectedTime)}
            </Text>
            <Image source={arrowUpDown} style={styles.upDownArrowIcon} />
          </FadedAnimationButton>

          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            date={selectedTime}
            onConfirm={handleConfirmation}
            onCancel={hideTimePicker}
            display="spinner"
            is24Hour={false}
            accentColor="blue"
            themeVariant={userThemeChoice.value}
          />
        </View>

        {/* Account  Section */}
        <View style={[styles.subSectionView, styles.subSectionMargins]}>
          <View style={styles.switchTextIconStyles}>
            <Image source={userImg} style={styles.iconStyles} />
            <Text style={styles.subSectionFont}>Account</Text>
          </View>
        </View>

        <View style={styles.accountSubHeadingStyles}>
          <Text style={styles.accountSubHeadingTextStyles}>Edit Name</Text>
          <FadedAnimationButton style={styles.accountSubHeadingPressableStyles}>
            <Image source={greyArrowIcon} style={styles.upDownArrowIcon} />
          </FadedAnimationButton>
        </View>

        <View style={styles.accountSubHeadingStyles}>
          <Text style={styles.accountSubHeadingTextStyles}>
            Change Password
          </Text>
          <FadedAnimationButton style={styles.accountSubHeadingPressableStyles}>
            <Image source={greyArrowIcon} style={styles.upDownArrowIcon} />
          </FadedAnimationButton>
        </View>

        <View style={styles.accountSubHeadingStyles}>
          <Text style={styles.accountSubHeadingTextStyles}>Delete Account</Text>
          <FadedAnimationButton
            style={styles.accountSubHeadingPressableStyles}
            onPress={createDeleteAccountAlert}
          >
            <Image source={greyArrowIcon} style={styles.upDownArrowIcon} />
          </FadedAnimationButton>
        </View>

        {/* Contacting Support Section */}
        <View style={[styles.subSectionView, styles.subSectionMargins]}>
          <View style={styles.switchTextIconStyles}>
            <Image source={supportImg} style={styles.iconStyles} />
            <Text style={styles.subSectionFont}>Contact Support</Text>
          </View>
          <FadedAnimationButton
            style={styles.accountSubHeadingPressableStyles}
            onPress={createSupportAlert}
          >
            <Image source={greyArrowIcon} style={styles.upDownArrowIcon} />
          </FadedAnimationButton>
        </View>

        {/* Log Out Section */}
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

        {/* Footer */}
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
  pickerPressableStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  pickerTextStyle: {
    color: '#d4756f',
    fontSize: 13,
    fontFamily: 'BiskiTrial-Regula',
  },
});
