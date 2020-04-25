import React from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';

const MAX_HEIGHT = Dimensions.get('window').height;
const StaticCard = ({ value }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardText}>{value}</Text>
      </View>
    </View>
  );
};

export default StaticCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: MAX_HEIGHT / 4.7,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    width: '100%',
    height: '100%',
    borderColor: 'white',
    borderWidth: 8,
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 20,
  },

  cardText: {
    fontSize: 40,
    color: '#000',
    fontWeight: '600',
  },
});
