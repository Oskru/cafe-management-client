import { Outlet } from 'react-router-dom';
import { Dock } from './dock/dock';

export function Layout() {
  return (
    <>
      <Dock />
      <Outlet />
    </>
  );
}
