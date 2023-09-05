import { AuthService } from './AuthService';
import type { Credentials, User, SignUpInput } from '../models';

const signUpInput: SignUpInput = {
  name: 'John Smith',
  email: 'jsmith@example.com',
  password: 'let-me-in',
};

const user: User = {
  id: '',
  name: 'John Smith',
  email: 'jsmith@example.com',
};

const credentials: Credentials = {
  email: 'jsmith@example.com',
  password: 'let-me-in',
};

const signInRedirectPath = '/manage/headlines';

describe('authService', () => {
  it('allows user to sign up, sign out and sign in', async () => {
    const actualUser1 = await AuthService.signUp(signUpInput);
    // returned userId is a random number, stuff it in expected result
    user.id = actualUser1.id;
    expect(actualUser1).toStrictEqual(user);

    const actualUser2 = await AuthService.fetchUser();
    expect(actualUser2).toStrictEqual(user);

    const result = await AuthService.signOut();
    expect(result).toBe(true);

    const actualUser3 = await AuthService.fetchUser();
    expect(actualUser3).toBeUndefined();

    const actualUser4 = await AuthService.signIn(credentials);
    expect(actualUser4).toStrictEqual(user);
  });

  it('allows to manage sign in redirect path', async () => {
    AuthService.setSignInRedirectPath(signInRedirectPath);
    expect(AuthService.getSignInRedirectPath()).toStrictEqual(
      signInRedirectPath
    );

    AuthService.removeSignInRedirectPath();
    expect(AuthService.getSignInRedirectPath()).toBe('/');
  });
});
