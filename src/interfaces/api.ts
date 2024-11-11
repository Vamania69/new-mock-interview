// src/types/api.ts
import { User } from './user';

export interface CreateUserResponse {
    userId: number;
    user: User;
}
