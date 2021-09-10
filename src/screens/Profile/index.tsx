import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import Layout from 'components/Layout';
import List from 'components/List';
import Tabs from 'components/Tabs';
import { useSelector as useSelectorTabs, withContextProvider, useDispatch } from 'contexts/TabsContext';
import { useSelector as useSelectorUser } from 'contexts/UserContext';
import { actionCreators } from 'contexts/TabsContext/reducer';
import { CONFIG_TAB_MY_POSTS } from 'constants/tabs';
import userPlaceholder from 'assets/user-placeholder.jpeg';
import { SIZE_ICONS_XS } from 'constants/icons';

import { LIMIT, TABS } from './constants';
import styles from './styles.module.scss';

function Profile() {
  const dispatch = useDispatch();
  const { tabActive } = useSelectorTabs((state) => state);
  const { user } = useSelectorUser((state) => state);
  const [offset] = useState(0);
  const { t } = useTranslation('Profile');

  const { data } = tabActive.list({
    offset,
    limit: LIMIT,
    user: user?.username
  });

  useEffect(() => {
    dispatch(actionCreators.activeTab(CONFIG_TAB_MY_POSTS));
  }, [dispatch]);

  return (
    <Layout>
      <div className={styles.header}>
        <div className={styles.contentUser}>
          <img src={user?.image || userPlaceholder} className={styles.imageProfile} />
          <h2 className={cn('m-top-3', styles.username)}>{user?.username}</h2>
        </div>
        <div className={styles.contentButton}>
          <button type="button" className={cn('m-top-2', styles.button)}>
            <FontAwesomeIcon icon={faCog} size={SIZE_ICONS_XS} className={styles.icon} />
            {t('editProfile')}
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <Tabs tabs={TABS} />
        <List data={data?.data} />
      </div>
    </Layout>
  );
}

export default withContextProvider(Profile);
