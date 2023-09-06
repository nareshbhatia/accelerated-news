import React from 'react';
import { ViewCenteredContainer } from '../Containers';

export interface ViewCenteredMessageProps {
  children?: React.ReactNode;
}

export function ViewCenteredMessage({ children }: ViewCenteredMessageProps) {
  return (
    <ViewCenteredContainer className="p-3">
      <h1 className="title">{children}</h1>
    </ViewCenteredContainer>
  );
}
