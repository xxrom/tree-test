import '../matchMedia';
import {act, renderHook} from '@testing-library/react-hooks';
import {cleanup} from '@testing-library/react';
import {useStore} from './useStore';

describe('useStore', () => {
  afterEach(() => {
    // You can chose to set the store's state to a default value here.
    jest.resetAllMocks();
    cleanup();
  });

  it('check addBear function', () => {
    const {result} = renderHook(() => useStore(state => state));

    act(() => {
      result.current.addBear();
    });

    expect(result.current.bears).toEqual(1);
  });
});
