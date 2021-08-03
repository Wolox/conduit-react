import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

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
            <NavLink to={PATHS.home} activeClassName={styles.active} className={styles.link}>
              <FontAwesomeIcon icon={faHome} size="xs" className={styles.icon} />
              <span className={styles.text}>{t('Header:home')}</span>
            </NavLink>
          </li>
          {items.map(({ text, href, icon }) => (
            <li className={styles.item} key={href}>
              <NavLink to={href} activeClassName={styles.active} className={styles.link}>
                <FontAwesomeIcon icon={icon} size="xs" className={styles.icon} />
                <span className={styles.text}>{t(text)}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Header;
