import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import Layout from 'components/Layout';
import Tabs from 'components/Tabs';
import { useSelector as useSelectorTabs, withContextProvider, useDispatch } from 'contexts/TabsContext';
import { useSelector as useSelectorUser } from 'contexts/UserContext';
import { actionCreators } from 'contexts/TabsContext/reducer';
import { CONFIG_TAB_MY_POSTS } from 'constants/tabs';
import userPlaceholder from 'assets/user-placeholder.jpeg';
import { SIZE_ICONS_XS } from 'constants/icons';
import InfiniteScroll from 'components/InfiniteScroll';
import ListItem from 'components/ListItem';

import { LIMIT, TABS } from './constants';
import styles from './styles.module.scss';

function Profile() {
  const { t } = useTranslation(['Profile', 'Article']);
  const dispatch = useDispatch();
  const { tabActive } = useSelectorTabs((state) => state);
  const { user } = useSelectorUser((state) => state);

  const { data: response, fetchNextPage, hasNextPage, isFetching, isLoading } = tabActive.list({
    offset: 0,
    limit: LIMIT,
    user: user?.username,
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
            {t('Profile:editProfile')}
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <Tabs tabs={TABS} />
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
          <div className="custom-alert">{t('Article:empty')}</div>
        )}
      </div>
    </Layout>
  );
}

export default withContextProvider(Profile);
