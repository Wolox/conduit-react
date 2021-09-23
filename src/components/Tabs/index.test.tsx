import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import { StateContext } from 'contexts/TabsContext';
import { actionCreators, TabContext } from 'contexts/TabsContext/reducer';

import { Tab } from './types';

import Tabs from '.';

export const FACEBOOK_TAB: Tab = {
  text: 'FACEBOOK',
  list: jest.fn()
};

export const INSTAGRAM_TAB: Tab = {
  text: 'INSTAGRAM',
  list: jest.fn()
};

export const TWITTER_TAG: Tab = {
  text: 'TWITTER_TAG',
  list: jest.fn()
};

const INIT_TABS = [FACEBOOK_TAB, INSTAGRAM_TAB];

export const INITIAL_STATE: TabContext = {
  hashtag: TWITTER_TAG,
  tabActive: FACEBOOK_TAB
};

function Wrapped({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  const history = createMemoryHistory();
  return (
    <QueryClientProvider client={queryClient}>
      <StateContext.Provider value={INITIAL_STATE}>
        <Router history={history}>{children}</Router>
      </StateContext.Provider>
    </QueryClientProvider>
  );
}

describe('Component Tabs', () => {
  test('Renders component', () => {
    const { asFragment } = render(
      <Wrapped>
        <Tabs tabs={INIT_TABS} />
      </Wrapped>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Tab active for default', () => {
    render(
      <Wrapped>
        <Tabs tabs={INIT_TABS} />
      </Wrapped>
    );
    const tabActive = screen.getByText(FACEBOOK_TAB.text);
    expect(tabActive).toHaveClass('active');
  });

  test('Add tab tag if is send', () => {
    render(
      <Wrapped>
        <Tabs tabs={INIT_TABS} />
      </Wrapped>
    );

    expect(screen.getByText(TWITTER_TAG.text)).toBeInTheDocument();
  });

  test('Change Tab active when is clicked', () => {
    render(
      <Wrapped>
        <Tabs tabs={INIT_TABS} />
      </Wrapped>
    );

    const fnDispatch = jest.fn();
    actionCreators.activeTab = fnDispatch;

    userEvent.click(screen.getByText(INSTAGRAM_TAB.text));
    expect(fnDispatch).toHaveBeenCalledWith(INSTAGRAM_TAB);
  });
});
