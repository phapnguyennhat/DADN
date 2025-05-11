import { User } from "src/database/entity/user.entity";
import { Request } from 'express';

declare global{
    interface RequestWithUser extends Request {
        user: User
    }
}