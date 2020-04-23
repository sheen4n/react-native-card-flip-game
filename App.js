import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import GameScreen from './src/components/screens/GameScreen';
import { StyleSheet, SafeAreaView } from 'react-native';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <SafeAreaView style={styles.mainContainer}>
      <GameScreen />
    </SafeAreaView>
  </Provider>
);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'rgba(211, 211, 211, 0.9)',
  },
});

export default App;
