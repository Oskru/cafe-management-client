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

      <span style={{ marginLeft: '30px' }}>{props.text}</span>
    </button>
  );
}
