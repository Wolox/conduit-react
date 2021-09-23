import { Tab } from 'components/Tabs/types';
import { useArticles, useArticlesByAuthor, useArticlesFavorites, useFeed } from 'hooks/List';

export const CONFIG_TAB_FEED: Tab = {
  text: 'Tabs:yourFeed',
  list: useFeed
};

export const CONFIG_TAB_GLOBAL: Tab = {
  text: 'Tabs:globalFeed',
  list: useArticles
};

export const CONFIG_TAB_MY_POSTS: Tab = {
  text: 'Tabs:post',
  list: useArticlesByAuthor
};

export const CONFIG_TAB_FAVORITES: Tab = {
  text: 'Tabs:favorites',
  list: useArticlesFavorites
};
