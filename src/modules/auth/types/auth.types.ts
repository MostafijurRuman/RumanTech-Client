export type UserRole = "ADMIN" | "USER";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  profileImageUrl?: string | null;
  role: UserRole;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  name: string;
};

export type AuthResponse = {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    accessToken: string;
  };
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  token: string;
  newPassword: string;
};

export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};
