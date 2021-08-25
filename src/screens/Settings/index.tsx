import cn from 'classnames';

import FormInput from 'components/FormInput';
import Layout from 'components/Layout';
import Button from 'components/Button';

import styles from './styles.module.scss';

function Settings() {
  return (
    <Layout>
      <div className={cn('full-width column center', styles.container)}>
        <h1 className={cn('m-bottom-2', styles.title)}>Your Settings</h1>
        <div className="half-width">
          <form className="column">
            <FormInput
              inputType="text"
              className="full-width"
              inputClassName={cn('full-width', styles.formInput)}
              name="image"
              placeholder="URL of profile picture"
            />
            <FormInput
              inputType="text"
              className="full-width"
              inputClassName={cn('full-width', styles.formInput)}
              name="username"
              placeholder="Username"
            />
            <FormInput
              inputType="test"
              className="full-width"
              inputClassName={cn('full-width', styles.formInput, styles.bio)}
              name="bio"
              placeholder="Short bio about you"
              isTextarea
            />
            <FormInput
              inputType="text"
              className="full-width"
              inputClassName={cn('full-width', styles.formInput)}
              name="email"
              placeholder="Email"
            />
            <FormInput
              inputType="password"
              className="full-width"
              inputClassName={cn('full-width', styles.formInput)}
              name="password"
              placeholder="New Password"
            />
            <Button text="Update Settings" onClickAction={() => console.log('CLICK-ACTION')} />
          </form>
          <hr className={styles.divisor} />
          <Button
            text="Or click here to logout."
            onClickAction={() => console.log('LOGOUT-ACTION')}
            className={styles.logoutBtn}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
