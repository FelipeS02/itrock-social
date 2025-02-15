import { useCallback, useEffect } from 'react';

import { useMediaQuery } from 'usehooks-ts';

export default function useSubmitOnKey(
  button: HTMLElement | null,
  keys: [KeyboardEvent['key']] = ['Enter'],
) {
  const isMobile = useMediaQuery('(any-pointer: coarse)');

  const onKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!button) return;

      if (keys.includes(e.key)) {
        e.preventDefault();

        button.click();
      }
    },
    [button, keys],
  );

  useEffect(() => {
    if (isMobile) {
      document.removeEventListener('keypress', onKeyPress);
      return;
    }

    document.addEventListener('keypress', onKeyPress);

    return () => {
      document.removeEventListener('keypress', onKeyPress);
    };
  }, [onKeyPress, isMobile]);
}
