import { useNavigate } from 'react-router-dom';
import { App } from '../interfaces/app';

export function useChangeApp() {
  const navigate = useNavigate();

  function toggleApp(app: App | undefined) {
    console.log('redirecting to ' + app?.path + '...');
    navigate(app?.path || '/');
  }

  return toggleApp;
}
