import cn from 'classnames';

import styles from './styles.module.scss';

interface Props {
  isBig?: boolean;
}

function Logo({ isBig = false }: Props) {
  return <div className={cn(styles.logo, { [styles.bigLogo]: isBig })}>conduit</div>;
}

export default Logo;
