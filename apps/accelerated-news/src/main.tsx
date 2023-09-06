import { App } from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query/devtools';
import { AuthStateContextProvider } from './components/AuthStateContextProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Loading } from './components/Loading';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './services/AxiosInterceptors';
import './styles/main.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// Start mock service worker in dev environment
async function startMockServiceWorker() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    await worker.start();
    worker.printHandlers();
  }
}

startMockServiceWorker()
  .then(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const root = createRoot(document.getElementById('root')!);
    root.render(
      <React.StrictMode>
        <React.Suspense fallback={<Loading />}>
          <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
              <AuthStateContextProvider>
                <Router>
                  <App />
                </Router>
              </AuthStateContextProvider>
            </QueryClientProvider>
          </ErrorBoundary>
        </React.Suspense>
      </React.StrictMode>
    );
    return true;
  })
  .catch((error) => {
    console.log(error);
  });

/*
 * -----------------------------------------------------------------------------
 * If you don't use Mock Service Worker, simplify the above code as shown below.
 * -----------------------------------------------------------------------------
 * // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
 * const root = createRoot(document.getElementById('root')!);
 * root.render(
 *   <React.StrictMode>
 *     <Router>
 *       <App />
 *     </Router>
 *   </React.StrictMode>
 * );
 */
