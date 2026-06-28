import mongoose, { Schema, Document } from "mongoose";

import { type IRefreshToken } from "../types/user.types.js";

export interface RefreshTokenDocument
  extends Omit<IRefreshToken, "id">,
    Document {}

const RefreshTokenSchema = new Schema<RefreshTokenDocument>(
  {
    userId: { type: String, required: true, index: true },
    token: { type: String, required: true, unique: true }, // stored hashed
    family: { type: String, required: true, index: true },
    expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } }, // TTL index
    revokedAt: { type: Date },
  },
  { timestamps: true }
);

export const RefreshTokenModel = mongoose.model<RefreshTokenDocument>(
  "RefreshToken",
  RefreshTokenSchema
);
