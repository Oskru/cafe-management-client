import './dock-button.scss';
import { App } from '../../interfaces/app';
import { useCurrentApp } from '../../hooks/use-current-app';
import { useChangeApp } from '../../hooks/use-change-app';
import { useEffect, useState } from 'react';

interface DockButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  app?: App;
  icon?: string;
  text?: string;
}

/**
 * Important! If using this component as an app button, make sure
 * to pass the `app` props. Otherwise, pass the `icon` and `text`
 * props.
 */
export function DockButton(props: DockButtonProps) {
  const app = useCurrentApp();
  const changeApp = useChangeApp();
  const [isActiveApp, setIsActiveApp] = useState(false);

  useEffect(() => {
    setIsActiveApp(app === props.app && props.app !== undefined);
  }, [app, props.app]);

  const sanitizedProps = { ...props };
  delete sanitizedProps.app;
  delete sanitizedProps.icon;
  delete sanitizedProps.text;

  return (
    <button
      className={
        isActiveApp
          ? `${props.className ? props.className + ' ' : ''}active-app`
          : props.className
      }
      {...sanitizedProps}
      onClick={event => {
        if (props.onClick === undefined) {
          changeApp(props.app);
        } else {
          props.onClick(event);
        }
      }}
    >
      <div
        className={
          props.app?.icon ? props.app?.icon + ' gg' : props.icon + ' gg'
        }
      ></div>

      <span style={{ marginLeft: '30px' }}>
        {props.app?.name ?? props.text}
      </span>
    </button>
  );
}
