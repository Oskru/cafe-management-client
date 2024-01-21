import { Container } from '../../components/container/container';
import { useDockState } from '../../hooks/use-dock-state';
import { DockButton } from '../../components/dock-button/dock-button';
import './dock.scss';

export function Dock() {
  const { isExpanded, toggleDock } = useDockState();

  return (
    <Container
      className={isExpanded ? 'dock expantded' : 'dock collapsed'}
      as='aside'
      display='flex'
      flexDirection='column'
    >
      <DockButton
        isExpanded={isExpanded}
        text='Dashboard'
        icon='gg-clapper-board'
      />
      <DockButton
        isExpanded={isExpanded}
        onClick={toggleDock}
        text={isExpanded ? 'Collapse' : 'Expand'}
        icon='gg-arrow-right-r'
      />
    </Container>
  );
}
