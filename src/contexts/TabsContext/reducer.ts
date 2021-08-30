import { produce } from 'immer';
import { Reducer } from 'react';

import { Tab } from 'components/Tabs/types';
import { CONFIG_TAB_GLOBAL } from 'constants/tabs';

interface TabContext {
  hashtag: Tab | null;
  tabActive: Tab;
}

export const INITIAL_STATE: TabContext = {
  hashtag: null,
  tabActive: CONFIG_TAB_GLOBAL
};

enum ActionTypes {
  ACTIVE = 'ACTIVE',
  HASHTAG = 'HASHTAG'
}

interface ActiveTab {
  type: ActionTypes.ACTIVE;
  payload: {
    tab: Tab;
  };
}

interface SetHashtag {
  type: ActionTypes.HASHTAG;
  payload: {
    tab: Tab;
  };
}

export type Action = ActiveTab | SetHashtag;

export const actionCreators = {
  activeTab: (tab: Tab): ActiveTab => ({ type: ActionTypes.ACTIVE, payload: { tab } }),
  setHastag: (tab: Tab): SetHashtag => ({ type: ActionTypes.HASHTAG, payload: { tab } })
};

export const reducer: Reducer<TabContext, Action> = produce((draft, action) => {
  switch (action.type) {
    case ActionTypes.ACTIVE: {
      draft.tabActive = action.payload.tab;
      draft.hashtag = null;
      break;
    }
    case ActionTypes.HASHTAG: {
      draft.hashtag = action.payload.tab;
      draft.tabActive = action.payload.tab;
      break;
    }
    // no default
  }
}, INITIAL_STATE);
