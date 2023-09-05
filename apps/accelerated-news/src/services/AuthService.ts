import type { Credentials, User, SignUpInput } from '../models';
import { Storage, formatHttpError } from '@/utils';
import axios from 'axios';

const TOKEN_KEY = 'accessToken';
const SIGN_IN_REDIRECT_KEY = 'signInRedirect';

const getAccessToken = () => Storage.get(TOKEN_KEY);

const setAccessToken = (accessToken: string) => {
  Storage.set(TOKEN_KEY, accessToken);
};

const removeAccessToken = () => {
  Storage.remove(TOKEN_KEY);
};

const getSignInRedirectPath = () => Storage.get(SIGN_IN_REDIRECT_KEY, '/');

const setSignInRedirectPath = (path: string) => {
  Storage.set(SIGN_IN_REDIRECT_KEY, path);
};

const removeSignInRedirectPath = () => {
  Storage.remove(SIGN_IN_REDIRECT_KEY);
};

const fetchUser = async (): Promise<User | undefined> => {
  const token = Storage.get(TOKEN_KEY);
  if (!token) return;

  try {
    const resp = await axios.get('/auth/me');
    return resp.data as User;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

const signIn = async (credentials: Credentials): Promise<User> => {
  try {
    const resp = await axios.post('/auth/signin', credentials);
    const { accessToken, user } = resp.data as {
      accessToken: string;
      user: User;
    };
    setAccessToken(accessToken);
    return user;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

const signOut = async (): Promise<boolean> => {
  try {
    const resp = await axios.post('/auth/signout');
    removeAccessToken();
    return resp.data as boolean;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

const signUp = async (signUpInput: SignUpInput): Promise<User> => {
  try {
    const resp = await axios.post('/auth/signup', signUpInput);
    const { accessToken, user } = resp.data as {
      accessToken: string;
      user: User;
    };
    setAccessToken(accessToken);
    return user;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

export const AuthService = {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getSignInRedirectPath,
  setSignInRedirectPath,
  removeSignInRedirectPath,
  fetchUser,
  signIn,
  signOut,
  signUp,
};
