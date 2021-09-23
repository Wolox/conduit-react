import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Layout from 'components/Layout';
import Tabs from 'components/Tabs';
import { useSelector as useSelectorUser } from 'contexts/UserContext';
// import List from 'components/List';
import Welcome from 'components/Welcome';
import { useSelector as useSelectorTabs, withContextProvider } from 'contexts/TabsContext';
import InfiniteScroll from 'components/InfiniteScroll';
import ListItem from 'components/ListItem';

import styles from './styles.module.scss';
import { LIMIT, TABS_LOGIN, TABS_LOGOUT } from './constants';

function Home() {
  const { t } = useTranslation('Article');
  const { user } = useSelectorUser((state) => state);
  const { tabActive } = useSelectorTabs((state) => state);

  const { data: response, fetchNextPage, hasNextPage, isFetching, isLoading } = tabActive.list({
    offset: 0,
    limit: LIMIT,
    options: {
      getNextPageParam: (lastPage, pages) => {
        let shown = 0;
        pages.forEach((page) => {
          shown += page.data?.articles.length || 0;
        });
        return shown < (lastPage.data?.articlesCount || 0) ? pages.length : undefined;
      }
    }
  });

  const handleNextPage = useCallback(() => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetching]);

  return (
    <Layout>
      <Welcome />
      <div className={styles.content}>
        <div className={styles.contentList}>
          <Tabs tabs={user ? TABS_LOGIN : TABS_LOGOUT} />
          {isFetching || response?.pages[0].data?.articles.length ? (
            <InfiniteScroll
              onLoadMore={handleNextPage}
              hasMore={hasNextPage || false}
              isLoading={isFetching}
              endMessage={<div className="custom-alert">{t('Article:finishList')}</div>}
            >
              {!isLoading &&
                response?.pages.map(({ data: pageData }, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <React.Fragment key={index}>
                    {pageData?.articles.map((article) => (
                      <ListItem article={article} key={article.slug} />
                    ))}
                  </React.Fragment>
                ))}
            </InfiniteScroll>
          ) : (
            <div className="custom-alert">{t('empty')}</div>
          )}
        </div>
        <div className={styles.contentTags}>Tags</div>
      </div>
    </Layout>
  );
}

export default withContextProvider(Home);
