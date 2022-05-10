import { getUserDetails } from '../context/user/api';
import Auth from './auth';

const UserService = {
  getUser: async (navigation) => {
    const userData = await getUserDetails()

    if (!navigation) {
      return userData;
    }

    if (userData === null) {
      Auth.logout(navigation);
    }

    if (userData.active === false) {
      navigation.navigate('Lock');
    }

    return userData;
  },
};

module.exports = UserService;
