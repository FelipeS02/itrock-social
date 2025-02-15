import { User } from './user.model';

/**
 * @exp Expiration in seconds (like JWT)
 * @user User info
 */
export type AuthState = {
  exp: number;
  user: User;
};
