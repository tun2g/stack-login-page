export interface IUser extends IBaseUser {
  id: string;
  username: string;
}

export interface IBaseUser {
  email: string;
  password: string;
}
