import React from 'react';
import { CenteredContainer } from '../Containers';

export interface CenteredMessageProps {
  children?: React.ReactNode;
}

export function CenteredMessage({ children }: CenteredMessageProps) {
  return (
    <CenteredContainer className="p-3">
      <h1 className="title">{children}</h1>
    </CenteredContainer>
  );
}
