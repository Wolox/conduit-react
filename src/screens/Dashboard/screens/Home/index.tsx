import React, { useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import cn from 'classnames';

import { useArticles } from 'hooks/List';
import Layout from 'components/Layout';
import Tabs from 'components/Tabs';
import { useSelector as useSelectorUser } from 'contexts/UserContext';
import Welcome from 'components/Welcome';
import { useSelector as useSelectorTabs, withContextProvider, useDispatch } from 'contexts/TabsContext';
import { actionCreators } from 'contexts/TabsContext/reducer';
import InfiniteScroll from 'components/InfiniteScroll';
import ListItem from 'components/ListItem';
import { tags } from 'services/tags';

import styles from './styles.module.scss';
import { LIMIT, TABS_LOGIN, TABS_LOGOUT } from './constants';

function Home() {
  const { t } = useTranslation('Article');
  const { user } = useSelectorUser((state) => state);
  const dispatch = useDispatch();
  const { tabActive } = useSelectorTabs((state) => state);
  const [currentTabs, setCurrentTabs] = useState(() => (user ? TABS_LOGIN : TABS_LOGOUT));
  const [currentTag, setCurrentTag] = useState('');

  const { data: response, fetchNextPage, hasNextPage, isFetching, isLoading } = tabActive.list({
    offset: 0,
    limit: LIMIT,
    ...(currentTag ? { tag: currentTag } : {}),
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

  const { data: queryTags } = useQuery(['tags'], () => tags());
  const tagsL = queryTags?.data?.tags || [];

  const handleNextPage = useCallback(() => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetching]);

  const handleTagClick = (tagName: string) => {
    const tabTag = {
      text: tagName,
      list: useArticles
    };
    const baseTabs = user ? TABS_LOGIN : TABS_LOGOUT;
    const newTabs = [...baseTabs, tabTag];
    setCurrentTabs(newTabs);
    setCurrentTag(tagName);
    dispatch(actionCreators.activeTab(tabTag));
  };

  const handleResetTag = () => setCurrentTag('');

  useEffect(() => {
    if (!currentTag) {
      const baseTabs = user ? TABS_LOGIN : TABS_LOGOUT;
      setCurrentTabs(baseTabs);
    }
  }, [currentTag, user]);

  return (
    <Layout>
      <Welcome />
      <div className={styles.content}>
        <div className={styles.contentList}>
          <Tabs tabs={currentTabs} onResetTag={handleResetTag} />
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
        <div className={styles.tagsContainer}>
          <div>Tags</div>
          {tagsL?.length > 0 && (
            <div className={styles.contentTags}>
              {tagsL?.map((tag: string) => (
                <div
                  className={cn(styles.tag, { [styles.active]: tabActive.text === tag })}
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default withContextProvider(Home);
