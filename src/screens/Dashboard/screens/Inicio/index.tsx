// import { useEffect } from 'react';

import Layout from 'components/Layout';
import Tabs from 'components/Tabs';
import { useSelector, withContextProvider } from 'contexts/TabsContext';

function Home() {
  // useEffect(() => {
  //   console.log('dispatch', CONFIG_TAB_GLOBAL);
  //   distpatchTabs(TabsActions.addTabs([CONFIG_TAB_GLOBAL]));
  // });

  const { tabs } = useSelector((state) => state);
  console.log('screen', tabs);

  return (
    <Layout>
      <Tabs />
    </Layout>
  );
}

export default withContextProvider(Home);
