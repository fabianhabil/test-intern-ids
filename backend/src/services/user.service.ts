import { Service } from 'typedi';
import { User } from '../database/entities/user.entity';
import { Errors } from '../utils/api.util';

@Service()
export class UserService {
    async getProfile(userId: number): Promise<User | null> {
        const user = User.findOne({
            where: { userId },
            select: { password: false }
        });

        if (!user) {
            throw Errors.USER_NOT_FOUND;
        }

        return user;
    }

    async isAdmin(userId: number): Promise<boolean> {
        const admin = await this.getProfile(userId);

        if (admin?.role !== 1) {
            return false;
        } else {
            return true;
        }
    }
}
