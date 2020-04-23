import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ErrorScreen = () => {
  return (
    <View>
      <Text style={styles.errorText}>Error Detected.</Text>
    </View>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({
  errorText: {
    fontSize: 28,
    textAlign: 'center',
  },
});
