import React, { createContext, useEffect, useState } from 'react';
import AppSettings from '../../services/app-settings';
import { loginVert, sendEmailVerification, updateUser } from './api';
import auth from '../../services/auth';
import Mixpanel from '../../services/Mixpanel';
import PaymentsContext from '../payments';

export interface User {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  pushToken: string;
  pushUserId: string;
  cards: any;
}

interface UserContextInterface {
  setUser: (user: User) => void,
  user: User | null,
  updateState: (field: string, value: any) => void,
  getUserFromStorage: () => void,
  updateUserInfo: (values: {}) => void,
  onVert: (code: string) => Promise<boolean | User>,
}

export const UserContext = createContext<UserContextInterface>({
  setUser: (user: User) => {},
  user: null,
  updateState: (field: string, value: any) => {},
  getUserFromStorage: () => {},
  updateUserInfo: (values: {}) => {},
  onVert: async (code: string) => false,
});

const UserContextProvider = ({ children }: { children: any }) => {
  const usePayments = PaymentsContext.useContainer();
  const [user, setUser] = useState<User | null>(null);

  const updateState = (values: any) => {
    const newUser: User = {
      ...user,
      ...values,
    };
    setUser(newUser);
  };

  const getUserFromStorage = async () => {
    const settings = await AppSettings.getSettings();
    if (settings.userProfile) {
      setUser(settings.userProfile);
    }
  };

  useEffect(() => {
    getUserFromStorage();
  }, []);

  const verifyEmail = async (userId: string) => {
    await sendEmailVerification(userId);
  };

  const updateUserInfo = async (values: any) => {
    updateState(values);
    const newUser = await updateUser(values);
    if (values.email) {
      verifyEmail(newUser.id);
    }
  };

  const getCardInfo = async () => {
    try {
      const methods = await usePayments.getPaymentMethods();
      if (methods.length) {
        return methods;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onVert = async (code: string) => {
    try {
      const vertResponse = await loginVert({
        phoneNumber: user.phoneNumber,
        code,
      });

      if (vertResponse.status !== 'OK' || !vertResponse.refreshToken || !vertResponse.accessToken) {
        console.log('Bad vert with response', vertResponse);
        return false;
      }

      auth.updateTokens(vertResponse.refreshToken, vertResponse.accessToken);
      const userProfile = vertResponse.userProfile || {};
      Mixpanel.setUser(userProfile);
      const cards = await getCardInfo();
      return { ...userProfile, cards };
    } catch (e) {
      console.log('Bad vert with request', e);
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        setUser: u => setUser(u),
        user,
        updateState,
        getUserFromStorage,
        updateUserInfo,
        onVert,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


export default UserContextProvider;
