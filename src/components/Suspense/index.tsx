import { ReactNode, Suspense as ReactSuspense } from 'react';

import Loader from 'components/Loader';

interface Props {
  fallback?: ReactNode;
  children: ReactNode;
}

function Suspense({ fallback, children }: Props) {
  return <ReactSuspense fallback={fallback || <Loader />}>{children}</ReactSuspense>;
}

export default Suspense;
