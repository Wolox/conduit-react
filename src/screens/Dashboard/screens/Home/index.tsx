import { useState } from 'react';

import Layout from 'components/Layout';
import Tabs from 'components/Tabs';
import { useSelector as useSelectorUser } from 'contexts/UserContext';
import List from 'components/List';
import Welcome from 'components/Welcome';
import { useSelector as useSelectorTabs, withContextProvider } from 'contexts/TabsContext';

import styles from './styles.module.scss';
import { LIMIT, TABS_LOGIN, TABS_LOGOUT } from './constants';

function Home() {
  const { user } = useSelectorUser((state) => state);
  const { tabActive } = useSelectorTabs((state) => state);
  const [offset] = useState(0);

  const { data } = tabActive.list({
    offset,
    limit: LIMIT
  });

  return (
    <Layout>
      <Welcome />
      <div className={styles.content}>
        <div className={styles.contentList}>
          <Tabs tabs={user ? TABS_LOGIN : TABS_LOGOUT} />
          <List data={data?.data} />
        </div>
        <div className={styles.contentTags}>Tags</div>
      </div>
    </Layout>
  );
}

export default withContextProvider(Home);
