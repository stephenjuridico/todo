jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

export const mockedNavigate = jest.fn();
export const mockedRoute = jest.fn();
export const mockedGoBack = jest.fn();
export const mockedRouteParam = jest.fn().mockReturnValue({
  params: {item: undefined},
});

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
      goBack: mockedGoBack,
    }),
    useRoute: () => mockedRouteParam,
  };
});

beforeEach(() => {
  jest.useFakeTimers();
});
