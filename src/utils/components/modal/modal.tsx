import './modal.scss';

interface ModalProps {
  handleClose: () => void;
  show: boolean;
  children: React.ReactNode;
}

export function Modal({ handleClose, show, children }: ModalProps) {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <button type='button' onClick={handleClose} className='modal-close'>
          <div className='gg-close-r'></div>
          Close
        </button>
      </section>
    </div>
  );
}
