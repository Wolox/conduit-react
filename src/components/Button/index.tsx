/* eslint-disable react/button-has-type */
import { HTMLProps } from 'react';
import cn from 'classnames';
import Loading from 'react-spinkit';

import { WHITE } from 'components/UserForm/constants';

import styles from './styles.module.scss';

type ButtonType = JSX.IntrinsicElements['button']['type'];

interface Props extends HTMLProps<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  text: string;
  type?: ButtonType;
  loading?: boolean;
  onClickAction: () => void;
}

function Button({
  className,
  disabled = false,
  text,
  type = 'button',
  loading = false,
  onClickAction,
  ...rest
}: Props) {
  return (
    <button
      onClick={onClickAction}
      type={type}
      disabled={disabled}
      className={cn('row middle text', className, styles.button, { [styles.disabled]: disabled })}
      {...rest}
    >
      {loading ? <Loading name="circle" color={WHITE} className={styles.loaderBtn} fadeIn="half" /> : text}
    </button>
  );
}

export default Button;
