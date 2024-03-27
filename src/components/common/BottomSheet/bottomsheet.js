import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Modal, PanResponder, View } from 'react-native';
import styles from './bottomsheet.styles';
export default function CustomBottomSheet(props) {
  console.log(props);
  const [visible, setVisible] = useState(props.visible || true);
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });
  const closeAnim = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 500,
    useNativeDriver: true,
  });
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });
  //const handleDismiss = () => closeAnim.start(props.onDismiss);
  const handleDismiss = () => {
    console.log('insidebs');
    closeAnim.start(props.onDismiss);
    setVisible(false);
  };
  useEffect(() => {
    resetPositionAnim.start();
  }, [resetPositionAnim]);
  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: Animated.event([null, { dy: panY }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gs) => {
        if (gs.dy > 0 && gs.vy > 2) {
          return handleDismiss();
        }
        return resetPositionAnim.start();
      },
    }),
  ).current;
  return (
    <Modal
      animated
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={handleDismiss}>
      <View style={styles.overlay}>
        <Animated.View
          style={{
            ...styles.container,
            transform: [{ translateY: translateY }],
          }}
          {...panResponders.panHandlers}>
          <View style={styles.sliderIndicatorRow}>
            <View style={styles.sliderIndicator} />
          </View>
          {props.children}
        </Animated.View>
      </View>
    </Modal>
  );
}
