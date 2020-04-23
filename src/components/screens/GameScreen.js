import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, View, StyleSheet, Alert } from 'react-native';
import FlippableCard from '../common/FlippableCard';

import { startGame, selectItem } from '../../store/game';
import StaticCard from '../common/StaticCard';
import PrimaryButton from '../common/PrimaryButton';
import CounterText from '../common/CounterText';
import ErrorScreen from './ErrorScreen';

const GameScreen = () => {
  const dispatch = useDispatch();
  const { data: items, totalSteps, won, error } = useSelector((state) => state.game);

  useEffect(() => {
    dispatch(startGame());
  }, [dispatch]);

  const handleTouch = (item) => () => dispatch(selectItem(item));

  const renderCard = (item) => {
    if (item.matched) return <StaticCard value={item.value} />;
    return <FlippableCard hiddenValue={item.value} onTouch={handleTouch(item)} remainOpen={item.selected} />;
  };

  const handleResetGame = () => Alert.alert('Reset Game', 'Are you sure? You will lose all your data.', [{ text: 'Yes', onPress: () => dispatch(startGame()) }, { text: 'No' }]);

  const showWonAlert = () => Alert.alert('Congratulations!', `You win this game in ${totalSteps} Steps`, [{ text: 'Try Another Round', onPress: () => dispatch(startGame()) }]);

  if (error) return <ErrorScreen />;

  if (won) showWonAlert();

  return (
    <View style={styles.gameScreen}>
      <View style={styles.headerContainer}>
        <PrimaryButton onPress={handleResetGame} text="Reset Game" />
        <CounterText count={totalSteps} />
      </View>
      <FlatList keyExtractor={(item) => item.id} data={items} renderItem={({ item }) => renderCard(item)} numColumns={3} />
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  gameScreen: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
