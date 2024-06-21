import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { notificationStyles } from './notificationStyles'

const Notification = ({ message, type, duration = 1000, onDismiss }) => {
  const [slideAnimation] = useState(new Animated.Value(-100));
  const [progressAnimation] = useState(new Animated.Value(100));

  useEffect(() => {
    showNotification();
    startProgressBar();
    const timer = setTimeout(hideNotification, duration);
    return () => {
      clearTimeout(timer);
      resetProgressBar();
    };
  }, []);

  const showNotification = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideNotification = () => {
    Animated.timing(slideAnimation, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onDismiss) {
        onDismiss();
      }
    });
  };

  const startProgressBar = () => {
    Animated.timing(progressAnimation, {
      toValue: 0,
      duration: duration,
      useNativeDriver: false,
    }).start();
  };

  const resetProgressBar = () => {
    progressAnimation.setValue(100);
  };

  let backgroundColor;

  switch (type) {
    case 'success':
      backgroundColor = '#28a745';
      break;
    case 'error':
      backgroundColor = '#dc3545';
      break;
    case 'warning':
      backgroundColor = '#ffc107';
      break;
    default:
      backgroundColor = '#343a40';
  }

  return (
    <Animated.View style={[notificationStyles.container, { backgroundColor, transform: [{ translateY: slideAnimation }] }]}>
      <View style={notificationStyles.viewCenter}>
        <Text style={notificationStyles.message}>{message}</Text>
      </View>
      <View style={notificationStyles.progressBar}>
        <Animated.View
          style={[notificationStyles.progress, {
            width: progressAnimation.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            })
          }]}
        />
      </View>
    </Animated.View>
  );
};

export default Notification;
