import { User } from './user.model';

/**
 * @exp Expiration in miliseconds (like JWT)
 * @user User info
 */
export type UserState = {
  exp: number;
  info: User;
};
