import { Container } from '../components/container/container.tsx';
import { Dock } from './dock/dock.tsx';
import { Home } from './home/home.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

export function App() {
  return (
    <Container display='flex' flexDirection='row' flexWrap='nowrap'>
      <Dock />
      <RouterProvider router={router} />
    </Container>
  );
}
