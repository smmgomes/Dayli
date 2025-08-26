import React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface FadedAnimationButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle>
}

export const FadedAnimationButton: React.FC<FadedAnimationButtonProps> = ({
  style,
  ...props
}) => {
  const opacitySV = useSharedValue(1);
  const opacityAnimationObject = useAnimatedStyle(() => {
    return {
      opacity: opacitySV.value,
    };
  });

  return (
    <AnimatedPressable
      style={[opacityAnimationObject, style]}
      onPressIn={() => {
        opacitySV.value = withTiming(0.4, { duration: 200 });
      }}
      onPressOut={() => {
        opacitySV.value = withTiming(1, { duration: 200 });
      }}
      {...props}
    >
      {props.children}
    </AnimatedPressable>
  );
};

