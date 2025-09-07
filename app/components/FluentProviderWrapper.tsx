'use client'

import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { ReactNode } from 'react';

interface FluentProviderWrapperProps {
  children: ReactNode;
}

export default function FluentProviderWrapper({ children }: FluentProviderWrapperProps) {
  return (
    <FluentProvider theme={webLightTheme}>
      {children}
    </FluentProvider>
  );
}
