import { Action } from '../../interfaces/action';
import { Container } from '../../utils/components/container/container';
import { Separator } from '../../utils/components/separator/separator';
import './app-template.scss';

export function AppTemplate(props: {
  appName: string;
  children: React.ReactNode;
  className?: string;
  actions?: Action[];
}) {
  return (
    <Container
      as='main'
      display='flex'
      flexDirection='column'
      flexWrap='nowrap'
      style={{ height: '100%', flex: 1, padding: '0px 10px 0px 10px' }}
    >
      <Container
        display='flex'
        flexDirection='row'
        flexWrap='nowrap'
        justifyContent='flex-end'
        alignItems='center'
      >
        <h2 style={{ display: 'inline', marginRight: 'auto' }}>
          {props.appName}
        </h2>

        {props.actions &&
          props.actions.map((action: Action) => (
            <button
              key={action.title}
              className='app-template__action-button'
              onClick={action.onClick}
              style={{ margin: '0' }}
            >
              {action.icon && (
                <div
                  className={action.icon + ' gg'}
                  style={{ marginRight: '10px' }}
                ></div>
              )}
              {action.title}
            </button>
          ))}
      </Container>
      <Separator />
      <article className={props.className}>{props.children}</article>
    </Container>
  );
}
