import { App, installedApps } from '../utils/data/installed-apps';

export function useInstalledApps(): App[] {
  return installedApps;
}
