export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

export enum OAuthProvider {
  GOOGLE = "google",
  GITHUB = "github",
  LOCAL = "local",
}

export interface IUser {
  id: string;
  email: string;
  passwordHash?: string;
  role: UserRole;
  provider: OAuthProvider;
  providerId?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRefreshToken {
  id: string;
  userId: string;
  token: string; // hashed in DB
  family: string; // rotation family to detect reuse
  expiresAt: Date;
  revokedAt?: Date;
  createdAt: Date;
}
