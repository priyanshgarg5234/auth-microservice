import mongoose, { Schema, Document } from "mongoose";
import { type IUser, UserRole, OAuthProvider } from "../types/user.types.js";

export interface UserDocument extends Omit<IUser, "id">, Document {
  id?: string;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, select: false }, // never returned by default
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    provider: {
      type: String,
      enum: Object.values(OAuthProvider),
      default: OAuthProvider.LOCAL,
    },
    providerId: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.passwordHash; // extra safety
        return ret;
      },
    },
  }
);
