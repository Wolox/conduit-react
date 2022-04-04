import cn from 'classnames';
import React, { useEffect, useRef } from 'react';

import { KEY_ESCAPE, TEST_ID_CONTENT, TEST_ID_SHADOW } from './constants';
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
    <>
      {open && (
        <div
          className={styles.contentModal}
          onClick={handleOnClick}
          ref={contentModal}
          data-testid={TEST_ID_SHADOW}
        >
          <div className={cn(className, styles.modalBody)} data-testid={TEST_ID_CONTENT}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
