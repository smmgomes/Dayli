import React from 'react';
import { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { FadedAnimationButton } from './FadedAnimationButton';

interface PrimaryButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle> 
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ style, ...props }) => {
  return (
    <FadedAnimationButton
      style={[
        {
          backgroundColor: '#ee8d83',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
          shadowColor: '#997379',
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 1,
          shadowOpacity: 0.6,
        },
        style,
      ]}
      {...props}
    >
      {props.children}
    </FadedAnimationButton>
  );
};
