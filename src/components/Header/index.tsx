import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

import { useSelector } from 'contexts/UserContext';
import PATHS from 'components/Routes/paths';

import itemsMenu, { SIZE_ICONS } from './constants';
import styles from './styles.module.scss';

const classLink = (actualPath: string, path: string) =>
  actualPath === path ? `${styles.link} ${styles.active}` : styles.link;

function Header() {
  const { t } = useTranslation('Header');
  const user = useSelector((state) => state.user);

  const items = itemsMenu.filter(({ isProtected }) => (user && isProtected) || (!user && !isProtected));
  const { pathname } = useLocation();

  return (
    <div className={styles.contentHeader}>
      <div className={styles.logo}>conduit</div>
      <div>
        <ul className={styles.listItems}>
          <li className={styles.item}>
            <Link to={PATHS.home} className={classLink(pathname, PATHS.home)}>
              <FontAwesomeIcon icon={faHome} size="xs" className={styles.icon} />
              <span className={styles.text}>{t('home')}</span>
            </Link>
          </li>
          {items.map(({ text, href, icon }) => (
            <li className={styles.item} key={href}>
              <Link to={href} className={classLink(pathname, href)}>
                <FontAwesomeIcon icon={icon} size={SIZE_ICONS} className={styles.icon} />
                <span className={styles.text}>{t(text)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Header;
