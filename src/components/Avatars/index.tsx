import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Modal from 'components/Modal';
import { getAvatar } from 'utils/avatarUtils';

import styles from './styles.module.scss';
import { AVATARS } from './constants';

interface Props {
  avatar?: string;
  changeAvatar: (avatar: string) => void;
}

function Avatars({ avatar, changeAvatar }: Props) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('Avatars');

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpenModal = useCallback(() => setOpen(true), []);
  const handleClickAvatar = useCallback(
    (nameAvatarSelected) => {
      setOpen(false);
      changeAvatar(nameAvatarSelected);
    },
    [changeAvatar]
  );

  const { icon: currentIcon, name: currentName } = getAvatar(avatar || '');

  return (
    <div className={styles.contentImage}>
      <img src={currentIcon} alt={currentName} className={styles.img} onClick={handleOpenModal} />
      <Modal open={open} closeModal={handleCloseModal}>
        <h1 className={styles.title}>{t('title')}</h1>
        <div className={styles.sectionAvatars}>
          {AVATARS.map(({ icon, name }) => (
            <div key={name} onClick={() => handleClickAvatar(name)}>
              <img src={icon} alt={name} className={styles.imgAvatar} />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

export default Avatars;
