import { UserModel, type UserDocument } from "../models/user.model.js";
import { type IUser, OAuthProvider } from "../types/user.types.js";

export class UserRepository {
  async create(data: Partial<IUser>): Promise<UserDocument> {
    return UserModel.create(data);
  }

  async findByEmail(
    email: string,
    withPassword = false
  ): Promise<UserDocument | null> {
    const query = UserModel.findOne({ email: email.toLowerCase() });
    if (withPassword) query.select("+passwordHash");
    return query.exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return UserModel.findById(id).exec();
  }

  async findByProvider(
    provider: OAuthProvider,
    providerId: string
  ): Promise<UserDocument | null> {
    return UserModel.findOne({ provider, providerId }).exec();
  }

  async updateLastLogin(id: string): Promise<void> {
    await UserModel.findByIdAndUpdate(id, { lastLoginAt: new Date() });
  }

  async deactivate(id: string): Promise<void> {
    await UserModel.findByIdAndUpdate(id, { isActive: false });
  }
}

export const userRepository = new UserRepository();
