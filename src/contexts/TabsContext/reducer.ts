import { produce } from 'immer';
import { Reducer } from 'react';

export interface Tab {
  isPrivate: boolean;
  text: string;
  endpoint: any;
  visible: boolean;
}

interface TabList {
  tabs: Tab[];
  tag: Tab | null;
  active: string;
}

export const INITIAL_STATE: TabList = {
  tabs: [],
  tag: null,
  active: ''
};

enum ActionTypes {
  ADD_TABS = 'ADD_TABS',
  ACTIVE_TAB = 'ACTIVE_TAB',
  SET_TAG = 'SET_TAG'
}

interface AddTabs {
  type: ActionTypes.ADD_TABS;
  payload: {
    tabs: Tab[];
    active: string;
  };
}

interface ActiveTab {
  type: ActionTypes.ACTIVE_TAB;
  payload: {
    text: string;
  };
}

interface SetTag {
  type: ActionTypes.SET_TAG;
  payload: Tab;
}

export type Action = AddTabs | ActiveTab | SetTag;

export const actionCreators = {
  addTabs: (payload: { tabs: Tab[]; active: string }): AddTabs => ({ type: ActionTypes.ADD_TABS, payload }),
  activeTab: (text: string): ActiveTab => ({ type: ActionTypes.ACTIVE_TAB, payload: { text } }),
  setTag: (tab: Tab): SetTag => ({ type: ActionTypes.SET_TAG, payload: tab })
};

export const reducer: Reducer<TabList, Action> = produce((draft, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TABS: {
      draft.tabs = [...action.payload.tabs];
      draft.active = action.payload.active;
      draft.tag = null;
      break;
    }
    case ActionTypes.ACTIVE_TAB: {
      draft.active = action.payload.text;
      draft.tag = null;
      break;
    }
    case ActionTypes.SET_TAG: {
      draft.tag = action.payload;
      draft.active = action.payload.text;
      break;
    }
    // no default
  }
}, INITIAL_STATE);
