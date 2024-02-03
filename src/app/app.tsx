import { Container } from '../utils/components/container/container.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useInstalledApps } from '../hooks/use-installed.apps.ts';
import { ErrorPage } from './error-page/error-page.tsx';
import { Layout } from './layout.tsx';

const installedApps = useInstalledApps();
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      ...installedApps.map(app => ({
        path: app.path,
        element: app.component,
      })),
    ],
    errorElement: <ErrorPage error={new Error('Page not found. 404')} />,
  },
]);

export function App() {
  return (
    <Container display='flex' flexDirection='row' flexWrap='nowrap'>
      <RouterProvider router={router} />
    </Container>
  );
}
