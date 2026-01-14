// Emotion 11 + React 18 type compatibility fix
// https://github.com/emotion-js/emotion/issues/2928
import '@emotion/react';
import type { ReactElement, ReactNode } from 'react';

declare module '@emotion/react' {
  export interface Theme {}
}

// Fix for JSX element type compatibility with React 18
// This is necessary because React 18's stricter types conflict with some libraries
declare global {
  namespace JSX {
    type ElementType =
      | React.JSXElementConstructor<any>
      | ((props: any) => ReactElement | null)
      | keyof HTMLElementTagNameMap
      | keyof SVGElementTagNameMap;
  }
}

// Augment React module to fix component rendering types
declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactNode;
  }
}

export {};
