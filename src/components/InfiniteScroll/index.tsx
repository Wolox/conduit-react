import React, { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { THRESHOLD } from './constants';
import styles from './styles.module.scss';

type ElementType = JSX.Element | string;

interface Props {
  children: React.ReactNode;
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  loader?: ElementType;
  endMessage?: ElementType;
  className?: string;
}

const getAlertMessage = (defaultText: string, element?: ElementType, loading?: boolean) => {
  if (!element) {
    return (
      <div className={styles.alert} data-testid="default-message">
        {loading && <div className={styles.spinner} data-testid="spinner" />} {defaultText}
      </div>
    );
  }

  if (typeof element === 'string') {
    return (
      <div className={styles.alert}>
        {loading && <div className={styles.spinner} data-testid="spinner" />} {element}
      </div>
    );
  }

  return element;
};

function InfiniteScroll({ children, onLoadMore, isLoading, hasMore, loader, endMessage, className }: Props) {
  const { t } = useTranslation('InfiniteScroll');
  const contentListRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNextPage = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [element] = entries;
      if (element.isIntersecting && contentListRef.current && hasMore && !isLoading) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleNextPage, {
      threshold: THRESHOLD
    });

    if (contentListRef.current) {
      observer.observe(contentListRef.current);
    }

    return () => observer.disconnect();
  }, [handleNextPage]);

  return (
    <>
      <div className={className} ref={containerRef}>
        {children}
      </div>
      {isLoading && getAlertMessage(t('loading'), loader, true)}
      {!hasMore && !isLoading && getAlertMessage(t('end'), endMessage)}
      <div ref={contentListRef} />
    </>
  );
}

export default InfiniteScroll;
