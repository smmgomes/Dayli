import React from 'react';
import { Pressable, PressableProps, StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

interface TextButtonAnimationProps extends PressableProps {
  title: string;
  textStyle?: StyleProp<TextStyle>; 
}

export const TextButtonAnimation: React.FC<TextButtonAnimationProps> = ({
  title,
  textStyle,
  ...props
}) => {
  return (
    <Pressable {...props}>
      {({ pressed }) => (
        <Text
          style={[
            styles.tStyle,
            { color: pressed ? '#f9b0aa' : '#eb817a' },
            textStyle ?? {},
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tStyle: {
    textDecorationLine: 'underline',
    fontFamily: 'BiskiTrial-Regular',
  },
});
