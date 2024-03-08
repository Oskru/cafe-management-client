import { useEffect, useState } from 'react';
import { useInstalledApps } from './use-installed.apps';
import { App } from '../interfaces/app';

export function useCurrentApp() {
  const installedApps = useInstalledApps();
  const [currentApp, setCurrentApp] = useState<App | undefined>(undefined);

  useEffect(() => {
    const urlArray = window.location.pathname.split('/');
    const current = installedApps.find(app => {
      return app.path.slice(1) === urlArray[1];
    });
    setCurrentApp(current);
  }, [window.location.pathname]);

  return currentApp;
}
