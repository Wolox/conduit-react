import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cn from 'classnames';

import { useDispatch, useSelector } from 'contexts/TabsContext';
import { actionCreators } from 'contexts/TabsContext/reducer';

import styles from './styles.module.scss';
import { Tab } from './types';

interface Props {
  tabs: Tab[];
}

function Tabs({ tabs }: Props) {
  const { t } = useTranslation('Tabs');
  const { hashtag, tabActive } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleChangeTab = (tab: Tab) => {
    dispatch(actionCreators.activeTab(tab));
  };

  return (
    <div>
      <ul className={cn('row', 'middle', 'start', styles.tabs)}>
        {tabs.map((actualTab) => (
          <li
            key={actualTab.text}
            onClick={() => handleChangeTab(actualTab)}
            className={cn(styles.tab, { [styles.active]: tabActive.text === actualTab.text })}
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
