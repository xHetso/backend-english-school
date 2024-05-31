import { CreateCommentDto } from './create-comment-dto';
export declare class CommentsService {
    constructor();
    addComments(dto: CreateCommentDto): Promise<void>;
}
