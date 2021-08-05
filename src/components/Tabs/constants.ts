export const CONFIG_TAB_FEED = {
  isPrivate: true,
  text: 'Tabs:yourFeed',
  endpoint: () => {
    console.log('endpoint Tabs:yourFeed');
  },
  visible: false
};

export const CONFIG_TAB_GLOBAL = {
  isPrivate: true,
  text: 'Tabs:globalFeed',
  endpoint: () => {
    console.log('endpoint Tabs:globalFeed');
  },
  visible: true
};

export const CONFIG_TAB_MY_POSTS = {
  isPrivate: true,
  text: 'Tabs:post',
  endpoint: () => {
    console.log('endpoint Tabs:post');
  },
  visible: false
};

export const CONFIG_TAB_FAVORITES = {
  isPrivate: true,
  text: 'Tabs:favorites',
  endpoint: () => {
    console.log('endpoint Tabs:favorites');
  },
  visible: false
};
