export type UserType = {
  id?: string;
  name?: string;
  email: string;
  password: string;
  role?: "USER" | "ADMIN";
};

export type GoogleAuthType = {
  profileEmail: string;
  displayName: string;
  providerId: string;
  accessToken: string;
  refreshToken: string;
};

export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  colors: string[];
  sizes: string[];
  stockQuantity: number;
};
