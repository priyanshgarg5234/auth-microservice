import {
  RefreshTokenModel,
  type RefreshTokenDocument,
} from "../models/refreshToken.model.js";

export class RefreshTokenRepository {
  async create(
    data: Partial<RefreshTokenDocument>
  ): Promise<RefreshTokenDocument> {
    return RefreshTokenModel.create(data);
  }

  async findByToken(hashedToken: string): Promise<RefreshTokenDocument | null> {
    return RefreshTokenModel.findOne({
      token: hashedToken,
      revokedAt: { $exists: false },
    }).exec();
  }

  async revokeById(id: string): Promise<void> {
    await RefreshTokenModel.findByIdAndUpdate(id, { revokedAt: new Date() });
  }

  async revokeFamily(family: string): Promise<void> {
    await RefreshTokenModel.updateMany({ family }, { revokedAt: new Date() });
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    await RefreshTokenModel.updateMany(
      { userId, revokedAt: { $exists: false } },
      { revokedAt: new Date() }
    );
  }
}

export const refreshTokenRepository = new RefreshTokenRepository();
