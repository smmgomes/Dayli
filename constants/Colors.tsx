import { useColorScheme } from 'react-native';

export const Colors = {
  light: {
    name: 'Bloom',
    colors: {
      backgroundColor: '#eeeee8',
      primaryFontColor: '#201f1f',
      secondaryFontColor: '#676767',
      inputBoxColors: '#eeeee8',
      submitButtonColors: '#ee8d83',
      navButtonColors: '#eeeee8',
      switchOffColor: '#dcd6cf',
      switchOnColor: 'eb817a',
    },
  },
  dark: {
    name: 'Twilight',
    colors: {
      backgroundColor: '#2b3544',
      primaryFontColor: '#eeebe8',
      secondaryFontColor: '#d9d9d9',
      inputBoxColors: '#3a4455',
      submitButtonColors: '#ee8d83',
      navButtonColors: '#3a4455',
      switchOffColor: '#44546b',
      switchOnColor: 'eb817a',
    },
  },
};

export const getTheme = () => {
  const colorScheme = useColorScheme() ?? 'light';
  if (colorScheme==='dark') {
    return Colors.dark;
  }
  return Colors.light; 
}
