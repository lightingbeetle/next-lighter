/**
 * @jest-environment jsdom
 */

import { useCallback, useEffect, useState } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import hookIt from '.';

const mountMock = jest.fn();
const umountMock = jest.fn();

const expectToThrow = (func, message) => {
  // Even though the error is caught, it still gets printed to the console
  // so we mock that out to avoid the wall of red text.
  jest.spyOn(console, 'error');
  console.error.mockImplementation(() => {});

  expect(func).toThrow(message);

  console.error.mockRestore();
};

const useHook = () => {
  useEffect(() => {
    mountMock();

    return () => {
      umountMock();
    };
  }, []);
};

function useCounter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount((x) => x + 1), []);

  return { count, increment };
}

function useInfinityHook() {
  const [, setCount] = useState(0);

  setCount((x) => x + 1);
}

beforeEach(() => {
  mountMock.mockReset();
  umountMock.mockReset();
});

test('hook is executed', () => {
  const { result } = renderHook(() => hookIt(() => useHook()));

  act(() => {
    result.current();
  });

  expect(mountMock).toBeCalledTimes(1);
});

test('hook is interactive', () => {
  const { result } = renderHook(() => hookIt(() => useCounter()));

  act(() => {
    result.current().increment();
  });

  expect(result.current().count).toBe(1);
});

test('hook can be unhooked', () => {
  const { result } = renderHook(() => hookIt(() => useCounter()));

  act(() => {
    result.current().increment();
  });

  act(() => {
    result.current.unhookIt();
  });

  expect(() => result.current().increment()).toThrowError();
});

test('unhooked hook will run unmount effects', () => {
  const { result } = renderHook(() => hookIt(() => useHook()));

  act(() => {
    result.current();
  });

  act(() => {
    result.current.unhookIt();
  });

  expect(mountMock).toBeCalledTimes(1);
  expect(umountMock).toBeCalledTimes(1);
});

test('infinite hook is throwing error', () => {
  const { result } = renderHook(() => hookIt(() => useInfinityHook()));

  expectToThrow(
    () => result.current(),
    "More than 50 calls, likely there's infinite recursion"
  );
});
