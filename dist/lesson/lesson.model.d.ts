import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { AuthorModel } from 'src/author/author.model';
import { IntensiveModel } from 'src/intensive/intensive.model';
export interface LessonModel extends Base {
}
export declare class LessonModel extends TimeStamps {
    title: string;
    slug: string;
    videoUrl: string;
    rating?: number;
    intensives: Ref<IntensiveModel>[];
    authors: Ref<AuthorModel>[];
    exercises: string[];
    isSendTelegram?: boolean;
}
