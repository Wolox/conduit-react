import { useTranslation } from 'react-i18next';

import { useSelector } from 'contexts/UserContext';
import PATHS from 'components/Routes/paths';

import itemsMenu from './constants';
import styles from './styles.module.scss';

function Header() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);

  const items = itemsMenu.filter(({ isProtected }) => (user && isProtected) || (!user && !isProtected));

  return (
    <div className={styles.contentHeader}>
      <div className={styles.logo}>conduit</div>
      <div>
        <ul className={styles.listItems}>
          <li className={styles.item}>
            <a href={PATHS.home} className={styles.link}>
              {t('Header:home')}
            </a>
          </li>
          {items.map(({ text, href }) => (
            <li className={styles.item} key={href}>
              <a href={href} className={styles.link}>
                {t(text)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Header;
