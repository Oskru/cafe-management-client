import './dock-button.scss';

interface DockButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isExpanded: boolean;
  text: string;
  icon: string;
}

export function DockButton(props: DockButtonProps) {
  return (
    <button
      className={
        props.isExpanded ? props.className : `${props.className} collapsed`
      }
      {...props}
    >
      <div className={props.icon + ' gg'}></div>

      {props.isExpanded ? (
        <span style={{ marginLeft: '25px' }}>{props.text}</span>
      ) : null}
    </button>
  );
}
