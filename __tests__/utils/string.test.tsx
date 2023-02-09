import 'react-native';
import {capitalize} from '../../src/utils/string';

describe('Utils/Strings', () => {
  it('capitalize correctly', () => {
    const output = capitalize('hello world');
    expect(output).toMatch('Hello World');
  });
});
