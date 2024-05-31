import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface UserModel extends Base {
}
export declare class UserModel extends TimeStamps {
    name: string;
    surname: string;
    email: string;
    password: string;
    isAdmin: boolean;
    roles: string;
    avatar: string;
    country: string;
    city: string;
    instagram: string;
    telegram: string;
    youtube: string;
    information: string;
}
