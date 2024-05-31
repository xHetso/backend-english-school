import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface AuthorModel extends Base {
}
export declare class AuthorModel extends TimeStamps {
    name: string;
    slug: string;
    photo: string;
}
