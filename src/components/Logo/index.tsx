import cn from 'classnames';
import { useHistory } from 'react-router';

import PATHS from 'components/Routes/paths';

import styles from './styles.module.scss';

interface Props {
  isBig?: boolean;
}

function Logo({ isBig = false }: Props) {
  const history = useHistory();
  const handleRedirectToHome = () => {
    history.push(PATHS.home);
  };

  return (
    <div className={cn(styles.logo, { [styles.bigLogo]: isBig })} onClick={() => handleRedirectToHome()}>
      conduit
    </div>
  );
}

export default Logo;
