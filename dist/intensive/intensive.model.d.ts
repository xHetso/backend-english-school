import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface IntensiveModel extends Base {
}
export declare class IntensiveModel extends TimeStamps {
    name: string;
    slug: string;
    description: string;
    poster: string;
}
