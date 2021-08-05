import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from 'contexts/TabsContext';
import { actionCreators } from 'contexts/TabsContext/reducer';

import styles from './styles.module.scss';

function Tabs() {
  const { t } = useTranslation();
  const { tabs, active, tag } = useSelector((state) => state);

  const distpatch = useDispatch();

  const handleChangeTab = (text: string) => {
    if (text !== active) {
      distpatch(actionCreators.activeTab(text));
    }
  };

  const activeClass = (text: string) => (text === active ? styles.active : '');

  return (
    <div>
      <ul className={styles.tabs}>
        {tabs.map((tab) => (
          <li
            key={tab.text}
            onClick={() => handleChangeTab(tab.text)}
            className={`${styles.tab} ${activeClass(tab.text)}`}
          >
            {t(tab.text)}
          </li>
        ))}
        {tag && (
          <li onClick={() => handleChangeTab(tag.text)} className={`${styles.tab} ${styles.active}`}>
            #{t(tag.text)}
          </li>
        )}
      </ul>
    </div>
  );
}

export default Tabs;
