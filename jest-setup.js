jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Fake timers using Jest
beforeEach(() => {
  jest.useFakeTimers();
});
