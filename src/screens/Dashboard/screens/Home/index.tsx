import React, { useEffect } from 'react';

import Layout from 'components/Layout';
import Tabs from 'components/Tabs';
import { useDispatch, withContextProvider, useSelector } from 'contexts/TabsContext';
import { actionCreators } from 'contexts/TabsContext/reducer';
import { CONFIG_TAB_GLOBAL, CONFIG_TAB_MY_POSTS } from 'components/Tabs/constants';

function Home() {
  const distpatch = useDispatch();
  const { tabs } = useSelector((state) => state);

  useEffect(() => {
    if (tabs.length === 0) {
      distpatch(
        actionCreators.addTabs({
          tabs: [CONFIG_TAB_GLOBAL, CONFIG_TAB_MY_POSTS],
          active: CONFIG_TAB_GLOBAL.text
        })
      );
    }
  }, [distpatch, tabs.length]);

  return (
    <Layout>
      <Tabs />
    </Layout>
  );
}

export default withContextProvider(Home);
