import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
export interface CommentsModel extends Base {
}
export declare class CommentsModel extends TimeStamps {
    text: string;
    lessonId: any;
}
