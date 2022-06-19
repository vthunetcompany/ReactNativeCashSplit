import { useCallback, useState } from 'react';

export const useToggle = (initialState = false) => {
  const [toggleState, setToggle] = useState(initialState);

  // memorize the toggle state
  const toggle = useCallback((para) => {
    if (para === undefined) {
      setToggle((state) => !state, []);
    } else {
      setToggle(() => !!para, []);
    }
  });

  return [toggleState, toggle];
};
