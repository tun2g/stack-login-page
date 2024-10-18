import { IBaseUser, IUser } from "./user";

export interface IAuthContext {
  isLoading?: boolean;
  isAuthenticated?: boolean;
  user?: IUser;
  reset: () => void;
}

export interface IUserLoginPayload {
  email: string;
  password: string;
}

export interface IGoogleLoginPayload {
  token: string;
}

export interface IUserRegisterPayload extends IBaseUser {
  username: string;
}

export interface IResetPasswordPayload {
  email: string;
}

export interface IConfirmResetPasswordPayload {
  newPassword: string;
  resetToken: string;
}
