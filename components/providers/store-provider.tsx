'use client';

import { FC, ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';

import { AppStore, makeStore } from '@rock/store/store';

const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const storeRef = useRef<AppStore>();

  // SSR-friendly store hydration
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
