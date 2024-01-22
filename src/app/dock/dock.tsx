import { motion } from 'framer-motion';
import { useDockState } from '../../hooks/use-dock-state';
import { DockButton } from '../../components/dock-button/dock-button';
import './dock.scss';

export function Dock() {
  const { isExpanded, toggleDock } = useDockState();

  return (
    <motion.aside
      initial={{ width: isExpanded ? 200 : 50 }}
      animate={{ width: isExpanded ? 200 : 50 }}
      transition={{ duration: 0.5 }}
      className={isExpanded ? 'dock expanded' : 'dock collapsed'}
    >
      <DockButton
        isExpanded={isExpanded}
        text='Dashboard'
        icon='gg-clapper-board'
      />
      <DockButton
        isExpanded={isExpanded}
        onClick={toggleDock}
        text='Collapse'
        icon='gg-arrow-right-r'
      />
    </motion.aside>
  );
}
