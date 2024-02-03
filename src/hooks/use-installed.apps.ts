import { installedApps } from '../utils/data/installed-apps';
import { App } from '../interfaces/app';

export function useInstalledApps(): App[] {
  return installedApps;
}
