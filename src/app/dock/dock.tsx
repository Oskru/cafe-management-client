import { motion } from 'framer-motion';
import { useDockState } from '../../hooks/use-dock-state';
import { DockButton } from './dock-button';
import './dock.scss';
import { useInstalledApps } from '../../hooks/use-installed.apps';

export function Dock() {
  const { isExpanded, toggleDock } = useDockState();
  const installedApps = useInstalledApps();

  return (
    <motion.aside
      initial={{
        width: isExpanded ? 200 : 50,
      }}
      animate={{
        width: isExpanded ? 200 : 50,
      }}
      transition={{ duration: 0.5 }}
      className='dock'
    >
      {installedApps.map(app => (
        <DockButton key={app.name} app={app} />
      ))}

      <DockButton
        onClick={toggleDock}
        text='Collapse'
        icon='gg-arrow-right-r'
      />
    </motion.aside>
  );
}
