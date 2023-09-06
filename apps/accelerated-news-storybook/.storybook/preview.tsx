import { AuthStateContextProvider } from '@accelerated-news/accelerated-news/src/components/AuthStateContextProvider';
import { ErrorBoundary } from '@accelerated-news/accelerated-news/src/components/ErrorBoundary';
import { Loading } from '@accelerated-news/accelerated-news/src/components/Loading';
import type { Preview, StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import '@accelerated-news/accelerated-news/src/styles/main.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Adding <QueryClientProvider> still does not make the MasterDetailStory work
 * because MSW is not setup for Storybook
 */
function storyDecorator(Story: StoryFn) {
  return (
    <React.Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AuthStateContextProvider>
            <Router>
              <Story />
            </Router>
          </AuthStateContextProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
}

const preview: Preview = {
  decorators: [storyDecorator],

  parameters: {
    // Show calls to "on*" arguments (based on user actions) in the Actions panel
    actions: { argTypesRegex: '^on[A-Z].*' },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
