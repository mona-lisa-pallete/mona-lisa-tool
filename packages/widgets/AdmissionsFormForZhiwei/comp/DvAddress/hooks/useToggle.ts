import { useCallback, useMemo, useState } from 'react';

function useToggle<T extends Boolean>(initialState: T) {
  const [state, setState] = useState<T>(initialState);

  const toggleHide = useCallback(() => {
    setState(false);
  }, []);

  const toggleShow = useCallback(() => {
    setState(true);
  }, []);

  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return useMemo(() => {
    return { toggle, toggleShow, toggleHide };
  }, []);
}

export default useToggle;
