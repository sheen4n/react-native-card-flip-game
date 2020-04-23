import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CounterText = ({ count }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.counterLabel}>Steps : </Text>
      <Text style={styles.counterNumber}>{count}</Text>
    </View>
  );
};

export default CounterText;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterLabel: {
    fontSize: 24,
  },
  counterNumber: {
    fontSize: 24,
    color: '#0080FF',
  },
});
