import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import { useDispatch, useSelector } from 'contexts/TabsContext';
import { actionCreators } from 'contexts/TabsContext/reducer';

import styles from './styles.module.scss';
import { Tab } from './types';

interface Props {
  tabs: Tab[];
}

function Tabs({ tabs }: Props) {
  const { t } = useTranslation();
  const { hashtag, tabActive } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleChangeTab = (tab: Tab) => {
    dispatch(actionCreators.activeTab(tab));
  };

  return (
    <div>
      <ul className={styles.tabs}>
        {tabs.map((actualTab) => (
          <li
            key={actualTab.text}
            onClick={() => handleChangeTab(actualTab)}
            className={`${styles.tab} ${tabActive.text === actualTab.text && styles.active}`}
          >
            {t(actualTab.text)}
          </li>
        ))}
        {hashtag && (
          <li key={hashtag.text} className={`${styles.tab} ${styles.active}`}>
            {t(hashtag.text)}
          </li>
        )}
      </ul>
    </div>
  );
}

export default memo(Tabs);
