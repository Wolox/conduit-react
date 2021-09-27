import cn from 'classnames';
import React, { useEffect, useRef } from 'react';

import { KEY_ESCAPE } from './constants';
import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
  closeModal: () => void;
  open: boolean;
  className?: string;
}

function Modal({ children, closeModal, open, className }: Props) {
  const contentModal = useRef(null);

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === contentModal.current) {
      closeModal();
    }
  };

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === KEY_ESCAPE) {
        closeModal();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [closeModal]);
  return (
    <div
      className={cn(styles.contentModal, { [styles.hidden]: !open })}
      onClick={handleOnClick}
      ref={contentModal}
    >
      <div className={className}>{children}</div>
    </div>
  );
}

export default Modal;
