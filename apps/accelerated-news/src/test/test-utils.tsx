import '@testing-library/jest-dom';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthStateContextProvider } from '@/components/AuthStateContextProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Loading } from '@/components/Loading';

/*
 * This file re-exports everything from React Testing Library and then overrides
 * its render method. In tests that require global context providers, import
 * this file instead of React Testing Library.
 *
 * For further details, see:
 * https://testing-library.com/docs/react-testing-library/setup/#custom-render
 */

interface AllProvidersProps {
  children?: React.ReactNode;
}

function AllProviders({ children }: AllProvidersProps) {
  /*
  Create a new QueryClient for each test. QueryClient holds its own
  instance of QueryCache. This way, tests are completely isolated
  from each other.
  
  Another approach might be to clear the QueryCache after each test,
  but that could be a little risky in case some state is inadvertently
  shared, e.g., if the tests are run in parallel.
  */
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // force queries to fail fast during tests, otherwise jest and
        // React Testing Library will hit their timeouts
        retry: false,
      },
    },
  });

  return (
    <React.Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AuthStateContextProvider>
            <Router>{children}</Router>
          </AuthStateContextProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
}

/**
 * Custom render method that includes global context providers
 */
interface CustomRenderOptions {
  initialRoute?: string;
  renderOptions?: Omit<RenderOptions, 'wrapper'>;
}

function customRender(ui: React.ReactElement, options?: CustomRenderOptions) {
  const opts = options ?? {};
  const { initialRoute, renderOptions } = opts;

  if (initialRoute !== undefined) {
    window.history.pushState({}, 'Initial Route', initialRoute);
  }

  return render(ui, { wrapper: AllProviders, ...renderOptions });
}

export * from '@testing-library/react'; // eslint-disable-line import/export
export { customRender as render, userEvent }; // eslint-disable-line import/export
