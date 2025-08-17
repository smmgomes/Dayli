import React from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable); 

export const CustomButton: React.FC<PressableProps> = ({ style, ...props}) => {

  const opacitySV = useSharedValue(1); 
  const opacityAnimationObject = useAnimatedStyle(()=>{
    return{
      opacity: opacitySV.value, 
    }
  })

  return (
    <AnimatedPressable
      style={[opacityAnimationObject, styles.button, style]}
      onPressIn={() => {
        opacitySV.value = withTiming(0.4, { duration: 100 });
      }}
      onPressOut={() => {
        opacitySV.value = withTiming(1, { duration: 100 });
      }}
      {...props}
    >
      {props.children}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ee8d83',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    shadowColor: '#997379',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    shadowOpacity: 0.6,
  },
});
