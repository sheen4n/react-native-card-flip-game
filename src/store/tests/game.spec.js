import configureStore from '../configureStore';
import { selectItem, startGame } from '../game';

describe('gameSlice', () => {
  describe('startGame', () => {
    let store;
    const gameSlice = () => store.getState().game;
    const gameData = () => store.getState().game.data;
    beforeEach(() => {
      //Arrange
      store = configureStore();
    });

    it('should generate N Pairs of Unique Numbers', () => {
      // Act
      store.dispatch(startGame());
      const occurrencePerElementValueArray = gameData().map((item) => gameData().filter((e) => e.value === item.value).length);
      const isEveryValueAppearsTwice = () => occurrencePerElementValueArray.every((count) => count === 2);

      // Assert
      expect(isEveryValueAppearsTwice()).toBe(true);
    });

    it('should reset moveCount to 0', () => {
      store.dispatch(startGame());
      expect(gameSlice().moveCount).toBe(0);
    });

    it('should reset totalSteps to 0', () => {
      store.dispatch(startGame());
      expect(gameSlice().totalSteps).toBe(0);
    });

    it('should reset won to false', () => {
      store.dispatch(startGame());
      expect(gameSlice().won).toBe(false);
    });
  });

  describe('selectItem', () => {
    let store;
    const gameSlice = () => store.getState().game;
    const gameData = () => store.getState().game.data;
    beforeEach(() => {
      //Arrange
      store = configureStore();
      store.dispatch(startGame());
    });

    it('should increase the counter by 1 on first move', () => {
      // Act
      store.dispatch(selectItem(gameData()[0]));

      // Assert
      expect(gameSlice().moveCount).toBe(1);
    });

    it('should reset moveCount to 0 on second move', () => {
      // Act
      store.dispatch(selectItem(gameData()[0]));
      store.dispatch(selectItem(gameData()[1]));

      // Assert
      expect(gameSlice().moveCount).toBe(0);
    });

    it('should reset totalSteps on every move', () => {
      store.dispatch(selectItem(gameData()[0]));
      expect(gameSlice().totalSteps).toBe(1);

      store.dispatch(selectItem(gameData()[1]));
      expect(gameSlice().totalSteps).toBe(2);

      store.dispatch(selectItem(gameData()[2]));
      expect(gameSlice().totalSteps).toBe(3);
    });

    it('should not modify game state if same item is selected twice', () => {
      // Arrange
      store.dispatch(selectItem(gameData()[0]));
      const gameState = gameSlice();

      // Act
      store.dispatch(selectItem(gameData()[0]));

      // Assert
      expect(gameSlice()).toBe(gameState);
    });

    it('should mark item as matched if two items of same value is selected', () => {
      // Arrange
      const sameValueArray = gameData().filter((item) => item.value === gameData()[0].value);

      // Act
      store.dispatch(selectItem(sameValueArray[0]));
      store.dispatch(selectItem(sameValueArray[1]));

      // Assert
      expect(gameData()[0].matched).toBe(true);
    });
  });
});
