export type UserType = {
  id?: string;
  name?: string;
  email: string;
  password: string;
};

export type GoogleAuthType = {
  profileEmail: string;
  displayName: string;
  providerId: string;
  accessToken: string;
  refreshToken: string;
};
