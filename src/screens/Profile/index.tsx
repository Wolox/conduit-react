import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Redirect, useParams } from 'react-router';

import Layout from 'components/Layout';
import Tabs from 'components/Tabs';
import { useSelector as useSelectorTabs, withContextProvider, useDispatch } from 'contexts/TabsContext';
import { actionCreators } from 'contexts/TabsContext/reducer';
import { CONFIG_TAB_MY_POSTS } from 'constants/tabs';
import { SIZE_ICONS_XS } from 'constants/icons';
import InfiniteScroll from 'components/InfiniteScroll';
import ListItem from 'components/ListItem';
import { getAvatar } from 'utils/avatarUtils';
import { UserProfileSlug } from 'types/profile';
import { useGetProfile } from 'hooks/Profile';
import paths from 'components/Routes/paths';

import { LIMIT, TABS } from './constants';
import styles from './styles.module.scss';

function Profile() {
  const { t } = useTranslation(['Profile', 'Article']);
  const dispatch = useDispatch();
  const { tabActive } = useSelectorTabs((state) => state);
  const { username } = useParams<UserProfileSlug>();

  const { data: responseProfile, isLoading: isLoadingProfile } = useGetProfile({
    username
  });
  const { profile } = responseProfile?.data || { profile: null };

  const { data: response, fetchNextPage, hasNextPage, isFetching, isLoading } = tabActive.list({
    offset: 0,
    limit: LIMIT,
    user: profile?.username,
    options: {
      getNextPageParam: (lastPage, pages) => {
        let shown = 0;
        pages.forEach((page) => {
          shown += page.data?.articles.length || 0;
        });
        return shown < (lastPage.data?.articlesCount || 0) ? pages.length : undefined;
      },
      enabled: !!profile?.username
    }
  });

  const handleNextPage = useCallback(() => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetching]);

  const { icon, name } = getAvatar(profile?.image || '');

  useEffect(() => {
    dispatch(actionCreators.activeTab(CONFIG_TAB_MY_POSTS));
  }, [dispatch]);

  return (
    <Layout>
      {!isLoadingProfile && !profile && <Redirect to={paths.home} />}
      <div className={styles.header}>
        <div className={styles.contentUser}>
          {isLoadingProfile ? (
            <div className="spinner" />
          ) : (
            <>
              <img src={icon} className={styles.imageProfile} alt={name} />
              <h2 className={cn('m-top-3', styles.username)}>{profile?.username}</h2>
            </>
          )}
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
