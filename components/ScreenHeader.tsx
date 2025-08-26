import { StyleProp, Text, TextStyle } from "react-native";

interface ScreenHeaderProps {
    title: string;
    txtStyle?: StyleProp<TextStyle>; 
};

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, txtStyle }) => {
  return (
    <Text
      style={[{
          fontSize: 40,
          fontFamily: 'Slims',
          color: '#201f1f',
          padding: 7,
      }, txtStyle]}
    >
      {title}
    </Text>
  );
};


