import userPlaceholder from 'assets/user-placeholder.jpeg';
import { AVATARS } from 'components/Avatars/constants';
import { Avatar } from 'types/Avatar';

export const getAvatar = (nameSearch: string): Avatar => {
  const avatarFilter = AVATARS.find(({ name }) => name === nameSearch);
  return avatarFilter
    ? avatarFilter
    : {
        icon: userPlaceholder,
        name: 'Default Image'
      };
};
